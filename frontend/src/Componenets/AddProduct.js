import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addproduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization:`berer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputbox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      ></input>
      {error && !name && <span className="invalid-ip">Enter valid name</span>}
      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputbox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      ></input>
      {error && !price && <span className="invalid-ip">Enter valid price</span>}
      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputbox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      ></input>
      {error && !category && (
        <span className="invalid-ip">Enter valid category</span>
      )}
      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputbox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      ></input>
      {error && !company && (
        <span className="invalid-ip">Enter valid company</span>
      )}
      <button onClick={addproduct} className="btn">
        AddProduct
      </button>
    </div>
  );
}

export default AddProduct;
