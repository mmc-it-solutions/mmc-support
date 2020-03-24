import React from "react";

import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div className="productsList">
      <h2 className="productsList__title">Product list</h2>
      <table className="productsList__table">
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="productsList__table--row">
              <td className="productsList__table--item">{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
