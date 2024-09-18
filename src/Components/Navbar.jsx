import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="">Signin</Link>
      <Link to="Register">Register</Link>
      <Link to="Todo">Todo</Link>
    </>
  );
};

export default Navbar;
