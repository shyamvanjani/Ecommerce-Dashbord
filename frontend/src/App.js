import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Componenets/Nav";
import Footer from "./Componenets/Footer";
import SignUp from "./Componenets/SignUp";
import Private from "./Componenets/Private";
import Login from "./Componenets/Login";
import AddProduct from "./Componenets/AddProduct";
import ProductList from "./Componenets/ProductList";
import UpdateProduct from "./Componenets/UpdateProduct";



function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Nav/>
     <Routes>

     <Route element={<Private/>}>
      <Route path="/" element={<ProductList/>}></Route>
      <Route path="/add" element={<AddProduct/>}></Route>
      <Route path="/update/:id" element={<UpdateProduct/>}></Route>
      <Route path="/logout" element={<h1>Logout Products</h1>}></Route>
      <Route path="/profile" element={<h1>Profile</h1>}></Route>
      </Route>

      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="login" element={<Login/>}></Route>
     </Routes>
  </BrowserRouter>
     <Footer/>

    </div>
  );
}

export default App;
