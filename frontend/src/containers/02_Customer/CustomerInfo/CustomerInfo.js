import React from "react";
import "./CustomerInfo.css";

import ProductList from "../../../components/productList/ProductList";
import AddProductPopup from "../../../components/addProductPopup/AddProductPopup";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getCustomer } from "../../../store/actions/customer";
import { createProduct } from "../../../store/actions/product";

class CustomerInfo extends React.Component {
  state = {
    customerId: this.props.match.params.id,

    modal: {
      display: "none",
      name: "",
      disabled: true
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
    const { modal } = this.state;

    let newValue = modal.name === "" ? true : false;

    this.setState({
      modal: {
        ...modal,
        [target.name]: target.value,
        disabled: newValue
      }
    });
  };

  changeDisplay = () => {
    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
        display: modal.display === "none" ? "flex" : "none"
      }
    });
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
      modal: {
        display: "none",
        name: "",
        disabled: true
      }
    });
  };

  render() {
    const { customer } = this.props;

    if (!this.props.authantication) {
      return <Redirect to={"/"} />;
    }

    if (!Array.isArray(customer)) {
      const { name, contact, products } = this.props.customer;
      return (
        <div className="Wrapped_containers">
          <AddProductPopup
            modal={this.state.modal}
            changeDisplay={this.changeDisplay}
            changeValue={this.changeValue}
            addProduct={this.addProduct}
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
                onClick={this.changeDisplay}
                className="product_button buttons"
              >
                Add Products
              </button>
            </div>
            <div className="archive_button-div ">
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
