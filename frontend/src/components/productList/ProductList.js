import React from "react";

import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div className="productsList">
      <h2 className="productsList__title">Product list</h2>
      <table className="productsList__table">
        <thead>
          <tr className="productsList__table--rowHead">
            <th className="productsList__table--itemHead">Id</th>
            <th className="productsList__table--itemHead">Name</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="productsList__table--row">
              <td className="productsList__table--item">{product.id}</td>
              <td className="productsList__table--item">{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
