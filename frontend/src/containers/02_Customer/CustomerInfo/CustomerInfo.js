import React from "react";
import "./CustomerInfo.css";

import ProductList from "../../../components/productList/ProductList";
import AddProductPopup from "../../../components/addProductPopup/AddProductPopup";
import UpdateCustomerPopup from "../../../components/updateCustomerPopup/UpdateCustomerPopup";
import UpdateProductPopup from "../../../components/updateProductPopup/UpdateProductPopup";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getCustomer, updateCustomer } from "../../../store/actions/customer";
import {
  createProduct,
  createExistingProduct,
  getProducts,
  updateProduct
} from "../../../store/actions/product";

class CustomerInfo extends React.Component {
  state = {
    customerId: this.props.match.params.id,

    addProductModal: {
      display: "none",
      name: "",
      disabled: true
    },

    updateCustomerModal: {
      display: "none"
    },

    updateProductModal: {
      display: "none",
      productId: "",
      name: ""
    }
  };

  componentDidMount() {
    let data = {
      customerId: this.props.match.params.id,
      productIdRemove: 0
    };

    this.props.getCustomer(data);
    this.props.getProducts(data);
  }

  changeValue = event => {
    const { target } = event;
    const { addProductModal } = this.state;

    let newValue = addProductModal.name === "" ? true : false;

    this.setState({
      addProductModal: {
        ...addProductModal,
        [target.name]: target.value,
        disabled: newValue
      }
    });
  };

  changeValue2 = event => {
    const { updateProductModal } = this.state;

    this.setState({
      updateProductModal: {
        ...updateProductModal,
        name: event.target.value
      }
    });
  };

  changeDisplay = (section, productId, tekst) => {
    const {
      addProductModal,
      updateCustomerModal,
      updateProductModal
    } = this.state;

    switch (section) {
      case "addProduct":
        this.setState({
          addProductModal: {
            ...addProductModal,
            display: addProductModal.display === "none" ? "flex" : "none"
          }
        });
        break;

      case "updateCustomer":
        this.setState({
          updateCustomerModal: {
            display: updateCustomerModal.display === "none" ? "flex" : "none"
          }
        });
        break;

      case "updateProduct":
        this.setState({
          updateProductModal: {
            display: updateProductModal.display === "none" ? "flex" : "none",
            productId: productId,
            name: tekst
          }
        });
        break;

      default:
        console.log("Something is wrong");
    }
  };

  addProduct = event => {
    event.preventDefault();

    const { addProductModal, customerId } = this.state;

    let data = {
      customerId: customerId,
      name: addProductModal.name
    };

    this.props.createProduct(data);

    this.setState({
      addProductModal: {
        display: "none",
        name: "",
        disabled: true
      }
    });
  };

  addExistingProduct = (event, productId) => {
    event.preventDefault();

    const { customerId } = this.state;

    let data = {
      customerId: customerId,
      productId: productId,
      productIdRemove: productId
    };

    this.props.createExistingProduct(data);
    this.props.getProducts(data);

    this.setState({
      addProductModal: {
        display: "none",
        name: "",
        disabled: true
      }
    });
  };

  updateCustomer = (companyName, name, email, phoneNumber, event) => {
    event.preventDefault();
    const { customerId } = this.state;

    let data = {
      customerId: customerId,
      companyName: companyName,
      name: name,
      email: email,
      phoneNumber: phoneNumber
    };

    this.props.updateCustomer(data);

    this.setState({
      updateCustomerModal: {
        display: "none"
      }
    });
  };

  updateProduct = event => {
    event.preventDefault();
    const { updateProductModal } = this.state;

    let data = {
      customerId: this.state.customerId,
      productId: updateProductModal.productId,
      name: updateProductModal.name
    };

    this.props.updateProduct(data);

    this.setState({
      updateProductModal: {
        display: "none",
        productId: "",
        name: ""
      }
    });
  };

  render() {
    const { customer } = this.props;

    // Dit is nodig als er een login is
    // if (!this.props.authantication) {
    //   return <Redirect to={"/"} />;
    // }

    if (!Array.isArray(customer)) {
      const { name, contact, products } = this.props.customer;

      return (
        <div className="Wrapped_containers">
          <AddProductPopup
            modal={this.state.addProductModal}
            changeDisplay={this.changeDisplay.bind(
              this,
              "addProduct",
              null,
              null
            )}
            changeValue={this.changeValue}
            addProduct={this.addProduct}
            addExistingProduct={this.addExistingProduct}
            products={this.props.products}
          />
          <UpdateCustomerPopup
            modal={this.state.updateCustomerModal}
            changeDisplay={this.changeDisplay.bind(
              this,
              "updateCustomer",
              null,
              null
            )}
            changeValue={this.changeValue}
            updateCustomer={this.updateCustomer}
            customer={this.props.customer}
          />
          <UpdateProductPopup
            modal={this.state.updateProductModal}
            changeDisplay={this.changeDisplay.bind(this, "updateProduct")}
            changeValue={this.changeValue2}
            updateProduct={this.updateProduct}
          />
          <h1 className="clientName">{name}</h1>

          <div className="contained">
            <div className="containment_contacts">
              <div className="contained_contacts">
                <h2 className="h2">Contact</h2>
                <h3>Name Owner:</h3>
                <h3>{contact.name}</h3>
                <h3>Email:</h3>
                <h3> {contact.email}</h3>
                <h3>Phone Number:</h3>
                <h3> {contact.phone}</h3>
              </div>
            </div>

            <div className="containment_products">
              <div className="contained_products">
                <ProductList
                  products={products}
                  changeDisplay={this.changeDisplay.bind(this, "updateProduct")}
                />
              </div>
            </div>
            <div>
              <button
                onClick={this.changeDisplay.bind(this, "addProduct")}
                className="product_button buttons"
              >
                Add Product
              </button>
            </div>
            <div className="buttons-div">
              <button
                className="update_button buttons"
                onClick={this.changeDisplay.bind(this, "updateCustomer")}
              >
                Update customer
              </button>
              <button className="archive_button buttons">Archive</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

const mapStateProps = (state, ownProps) => ({
  authantication: state.user.authantication,
  customer: state.customer.customer,
  products: state.product.products
});

const mapDispatchToProps = {
  getCustomer,
  updateCustomer,
  createProduct,
  getProducts,
  createExistingProduct,
  updateProduct
};

export default connect(mapStateProps, mapDispatchToProps)(CustomerInfo);
