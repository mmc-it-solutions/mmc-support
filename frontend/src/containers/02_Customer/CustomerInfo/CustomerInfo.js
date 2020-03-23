import React from "react";
import "./CustomerInfo.css";

import ProductList from "../../../components/productList/ProductList";
import AddProductPopup from "../../../components/addProductPopup/AddProductPopup";
import UpdateCustomerPopup from "../../../components/updateCustomerPopup/UpdateCustomerPopup";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getCustomer } from "../../../store/actions/customer";
import { createProduct } from "../../../store/actions/product";

class CustomerInfo extends React.Component {
  state = {
    customerId: this.props.match.params.id,

    addProductModal: {
      display: "none",
      name: "",
      disabled: true
    },

    updateModal: {
      display: "none"
    }
  };

  componentDidMount() {
    let data = {
      customerId: this.props.match.params.id
    };

    this.props.getCustomer(data);
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

  changeDisplay = section => {
    const { addProductModal, updateModal } = this.state;

    switch (section) {
      case "addProduct":
        this.setState({
          addProductModal: {
            ...addProductModal,
            display: addProductModal.display === "none" ? "flex" : "none"
          }
        });
        break;

      case "update":
        this.setState({
          updateModal: {
            ...updateModal,
            display: updateModal.display === "none" ? "flex" : "none"
          }
        });
        break;
    }
  };

  addProduct = event => {
    event.preventDefault();

    const { modal, customerId } = this.state;

    let data = {
      customerId: customerId,
      name: modal.name
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
      companyName: companyName,
      name: name,
      email: email,
      phoneNumber: phoneNumber
    };

    this.props.updateCustomer(data);

    this.setState({
      updateModal: {
        display: "none"
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
            changeDisplay={this.changeDisplay.bind(this, "addProduct")}
            changeValue={this.changeValue}
            addProduct={this.addProduct}
          />
          <UpdateCustomerPopup
            modal={this.state.updateModal}
            changeDisplay={this.changeDisplay.bind(this, "update")}
            changeValue={this.changeValue}
            updateCustomer={this.updateCustomer}
            customer={this.props.customer}
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
                <ProductList products={products} />
              </div>
            </div>
            <div>
              <button
                onClick={this.changeDisplay.bind(this, "addProduct")}
                className="product_button buttons"
              >
                Add Products
              </button>
            </div>
            <div className="buttons-div">
              <button
                className="update_button buttons"
                onClick={this.changeDisplay.bind(this, "update")}
              >
                Update
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
  customer: state.customer.customer
});

const mapDispatchToProps = { getCustomer, createProduct };

export default connect(mapStateProps, mapDispatchToProps)(CustomerInfo);
