import React from "react";
import axios from "axios";

import "./ProductList.css";

class ProductList extends React.Component {
  state = {
    products: [
      {
        id: 1,
        name: "hello"
      },
      {
        id: 2,
        name: "admin"
      },
      {
        id: 3,
        name: "world"
      },
      {
        id: 4,
        name: "Joep"
      }
    ]
  };

  render() {
    const { products } = this.state;

    return (
      <div className="productsList">
        <h2 className="productsList__title">Product list</h2>
        <table className="productsList__table">
          <tr className="productsList__table--rowHead">
            <th className="productsList__table--itemHead">Id</th>
            <th className="productsList__table--itemHead">Name</th>
          </tr>
          {products.map(product => (
            <tr className="productsList__table--row">
              <td className="productsList__table--item">{product.id}</td>
              <td className="productsList__table--item">{product.name}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default ProductList;
