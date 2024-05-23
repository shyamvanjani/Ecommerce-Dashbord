import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization:`berer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    setProducts(result);
  };
  console.warn("products", products);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization:`berer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    if (result) {
      alert("record delted successfully");
      getProducts();
    }
  };

  const searchHandler = async (event) => {
    const key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers: {
            authorization:`berer ${JSON.parse(localStorage.getItem('token'))}`
          },
      });
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  return (
    <div className="productlist">
      <h1> ProductList </h1>
      <input
        type="text"
        placeholder="Search Product"
        className="search"
        onChange={searchHandler}
      ></input>
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>delete</button>
              <Link to={"/update/" + item._id}>update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
}

export default ProductList;
