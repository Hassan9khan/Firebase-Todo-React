import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../config/config";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // const [data, setData] = useState("");
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate();

  const getValue = (event) => {
    event.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        navigate("/signin");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1>Register</h1>
          <form onSubmit={getValue}>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered input-secondary w-full max-w-xs m-3"
              ref={email}
            />
            <input
              type="password"
              placeholder="password"
              className="input input-bordered input-secondary w-full max-w-xs m-3"
              ref={password}
            />
            <button type="submit">Submit</button>
          </form>
          <Link to="signin"><button className="btn btn-primary">Already a User</button></Link>
        </div>
      </div>
    </>
  );
};

export default Register;
