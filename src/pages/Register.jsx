import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../config/config";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // const [data, setData] = useState("");
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  let navigate = useNavigate();

  const getValue = (event) => {
    event.preventDefault();
    // console.log(email.current.value);
    // console.log(password.current.value);

    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        updateProfile(user, {
          displayName: `${firstName.current.value} ${lastName.current.value}`,
        })
        .then(() => {
          console.log(user);
          navigate("/signin");       
        })
        .catch((error) => {
          console.log('Error updating profile: ' , error);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <>
      <div className="min-h-screen flex justify-center text-center text-1xl bg-gradient-to-r from-[#2670d2] to-[#7bc0d3]">
        <div className="sm:w-[35rem] w-[90%] h-max m-3 pb-5 text-center rounded-lg bg-white shadow-2xl shadow-black mt-[5%]">
          <h1 className="text-[#0d54b1] text-4xl font-bold pt-3 mb-9 m-4">
            Register User
          </h1>
          <form onSubmit={getValue}>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered input-secondary w-full max-w-xs m-3"
              ref={firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered input-secondary w-full max-w-xs m-3"
              ref={lastName}
            />
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered input-secondary w-full max-w-xs m-3"
              ref={email}
            />
            <input
              type="password"
              placeholder="New Password"
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
          <div className="flex justify-start  ml-[22%] m-4">
            <Link to="signin" className="text-sm text-blue-700 underline">
              Already a User ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
