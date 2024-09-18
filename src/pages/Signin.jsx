import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        navigate("/todo");
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
      <div className="min-h-screen flex justify-center text-center text-1xl bg-gradient-to-r from-[#2670d2] to-[#7bc0d3]">
        <div className="sm:w-[35rem] w-[90%] h-max m-3 pb-5 text-center rounded-lg bg-white shadow-2xl shadow-black mt-[8%]">
          <h1 className="text-[#0d54b1] text-4xl font-bold pt-3 mb-9 m-4">
            Login
          </h1>
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
            <br />
            <button
              type="submit"
              className="btn btn-sm text-xl pb-1 px-[23%] bg-whitetext-[#2670d2] hover:bg-[#2670d2] hover:text-white btn-primary "
            >
              Submit
            </button>
          </form>
          <div className="flex justify-start  ml-[20%] m-4">
            <Link to="register" className="text-sm text-blue-700 underline">
              Not a User
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
