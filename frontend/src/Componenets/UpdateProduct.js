import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const UpdateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };

  useEffect(() => {
    getProductDetail();
  },[]);

  const getProductDetail = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputbox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      ></input>

      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputbox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      ></input>

      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputbox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      ></input>

      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputbox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      ></input>

      <button onClick={UpdateProduct} className="btn">
        UpdateProduct
      </button>
    </div>
  );
}

export default UpdateProduct;
