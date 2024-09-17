import React from "react";

const Signin = () => {
  return (
    <>
      <h1>Login</h1>
      <h1>Login</h1>
      <form id="form">
        <input type="email" id="email" placeholder="Enter Your Email" />
        <input
          type="password"
          id="password"
          placeholder="Enter Your Password"
        />
        <button type="submit">Login In</button>
      </form>
      <a href="./register.html">Not a User</a>
    </>
  );
};

export default Signin;
