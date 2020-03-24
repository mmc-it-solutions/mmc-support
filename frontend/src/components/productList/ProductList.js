import React from "react";

import "./ProductList.css";

const ProductList = ({ products, changeDisplay }) => {
  return (
    <div className="productsList">
      <h2 className="productsList__title">Product list</h2>
      <table className="productsList__table">
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="productsList__table--row">
              <td className="productsList__table--item">
                <p className="productsList__table--text">{product.name}</p>
                <button
                  className="productsList__table--update"
                  onClick={changeDisplay.bind(this, product.id, product.name)}
                >
                  Update product
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
