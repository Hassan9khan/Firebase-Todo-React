import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import React, { useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { auth } from "../config/config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState("");
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate()

  const getValue = (event) => {
    event.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        navigate('todo')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        
      });
  };

  return (
    <>
      <h1>Login</h1>

      <div className="flex justify-center">
        <div>
          <form onSubmit={getValue}>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered input-secondary w-full max-w-xs m-3"
              ref={email}
            />
            <input
              type="text"
              placeholder="password"
              className="input input-bordered input-secondary w-full max-w-xs m-3"
              ref={password}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
