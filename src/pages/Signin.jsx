import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate();

  const getValue = (event) => {
    event.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);

    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/todo')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    email.current.value = "";
    password.current.value = "";
  };

  return (
    <>
      <div className="text-center">
        <div>
          <h1 className="p-8">Login </h1>
          <form onSubmit={getValue}>
            <input type="email" placeholder="Enter your Email" ref={email} />
            <input
              type="password"
              placeholder="Enter your Password"
              ref={password}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
