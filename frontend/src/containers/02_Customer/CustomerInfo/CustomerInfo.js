import React from "react";
import "./CustomerInfo.css";

class CustomerInfo extends React.Component {
  state = {
    id: 1,
    name: "MMC-ITSolutions",
    contact: {
      name: "Marco",
      email: "marco@yes.yes",
      phone: "60130105012"
    },
    products: [
      { id: 1, name: "fnwafn" },
      { id: 2, name: "Coca-Cola" },
      { id: 3, name: "cranberry-sprite" },
      { id: 4, name: "cranberry-soda" }
    ]
  };

  render() {
    const { id, name, contact, products } = this.state;
    return (
      <div className="Wrapped_containers">
        <h1 className="clientName">{name}</h1>

        <div className="contained">
          <div className="containment_contacts">
            <div className="contained_contacts">
              <h2 className="h2">Contact</h2>
              <h3>{contact.name}</h3>
              <h3>{contact.email}</h3>
              <h3>{contact.phone}</h3>
            </div>
          </div>

          <div className="containment_products">
            <div className="contained_products">
              <h2 className="h2">Products ({[products.length]})</h2>
              {products.map(product => {
                return (
                  <div key={product.id}>
                    <h3>{product.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <button className="product_button buttons">Add Products</button>
          </div>
          <div className="archive_button-div ">
            <button className="archive_button buttons">Archive</button>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomerInfo;
