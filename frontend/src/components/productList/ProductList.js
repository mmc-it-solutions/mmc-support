import React from "react";

import "./ProductList.css";

const ProductList = ({ products }) => {
  // dit is de code die je nodig hebt in de class om deze component te laten werken

  // state = {
  //   //dit is test data dit wordt later aangepast
  //   products: [
  //     {
  //       id: 1,
  //       name: "hello"
  //     },
  //     {
  //       id: 2,
  //       name: "admin"
  //     },
  //     {
  //       id: 3,
  //       name: "world"
  //     },
  //     {
  //       id: 4,
  //       name: "Joep"
  //     }
  //   ]
  // };

  // <ProductList products={products} />

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
};

export default ProductList;
