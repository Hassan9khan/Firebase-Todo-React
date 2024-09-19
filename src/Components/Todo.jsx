import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db } from "../config/config";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const todoValue = useRef();
  let navigate = useNavigate();
  let newDate = new Date();

  const addTodo = (event) => {
    event.preventDefault();

    async function addToStore() {
      const todoText = todoValue.current.value;
      todo.push(todoText);
      setTodo([...todo]);
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          first: todoText,
          createdAt: newDate.toLocaleString(),
        });
        console.log("Document written with ID: ", docRef.id);
        todo.push({ text: todoText, id: docRef.id });
      } catch (error) {
        console.log(error);
      }

      todoValue.current.value = "";
    }

    addToStore();
  };

  // Delete Todo Function

  function deleteTodo(index) {
    console.log("delete todo", index);
    todo.splice(index, 1);
    setTodo([...todo]);
  }

  // async function deleteTodo(id, index) {
  //   try {
  //     console.log("Document ID to delete:", id);
  //     const docRef = doc(db, "todos", id);
  //     todo.splice(index, 1);
  //     setTodo([...todo]);
  //     await deleteDoc(docRef);
  //     console.log("Document successfully deleted!");
  //   } catch (e) {
  //     console.log("Error deleting document: ", e);
  //   }
  // }

  // async function deleteTodo(id , index) {
  //   try {
  //     console.log("Document ID to delete:", id);
  //     const docRef = doc(db, "todos", id);
  //     todo.splice(index , 1);
  //     console.log("Updated todo list after deletion:", todo);
  //     setTodo([...todo]);
  //     await deleteDoc(docRef);
  //     console.log("Document successfully deleted!");
  //   } catch (e) {
  //     console.log("Error deleting document: ", e);
  //   }
  // }

  function editTodo(index) {
    console.log("edit todo", index);
    const editValue = prompt("Enter New Value");
    todo.splice(index, 1, editValue);
    setTodo([...todo]);
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      console.log("user is sign out");
      navigate("/signin");
    }
  });

  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const getData = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "todos")); // Reference the
  //     const todos = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log("Todos:", todos);
  //   } catch (error) {
  //     console.error("Error fetching documents: ", error);
  //   }
  // };
  // getData();

  const [arr , setArr ] = useState([])

  async function getData() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    arr.push(doc.data())
    setArr([...arr]);
  });
  console.log(arr);
  arr.map((item) => {
    return (
      <div key={item.id}>
        <h1>{item.first}</h1>
      </div>
    )
  })
  
  }
  // getData()

  return (
    <>
      <div className="min-h-screen	 flex justify-center text-center text-1xl bg-gradient-to-r from-[#2670d2] to-[#7bc0d3]">
        <div className="sm:w-[35rem] w-[90%] h-max m-3 pb-5 mb-9  text-center rounded-lg bg-white shadow-2xl shadow-black ">
          <div className="flex justify-end ml-24 m-2">
            <button
              onClick={logOut}
              className="btn btn-outline bg-white text-[#2670d2] mr-2 hover:text-white btn-primary"
            >
              LOGOUT
            </button>
            <button
              onClick={getData}
              className="btn btn-outline bg-white text-[#2670d2]  hover:text-white btn-primary"
            >
              GET DATA
            </button>
          </div>

          <h1 className="text-[#0d54b1] text-4xl font-bold pt-3 mb-9 m-4">
            Todo App
          </h1>
          <form
            onSubmit={addTodo}
            className="flex justify-center gap-5 items-center"
          >
            <div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-secondary sm:w-[28rem] w-[90%] max-w-xs"
                ref={todoValue}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="sm:btn sm:btn-outline sm:text-4xl sm:pb-5 sm:bg-white sm:text-[#2670d2] hover:bg-[#2670d2] hover:text-white btn-sm btn-primary text-4xl pb-5 "
              >
                +
              </button>
            </div>
          </form>

          <div className="flex justify-center  mt-7">
            <ul className="flex justify-center flex-col-reverse">
              {todo.map((item, index) => {
                return (
                  <div key={index}>
                    <li className="sm:w-[29rem] w-[20rem] h-22 mt-2 flex items-center justify-between text-lg font-bold p-3 py-7 bg-[#e8ecf1]">
                      {item}

                      <div>
                        <button
                          onClick={() => deleteTodo(todo.id, index)}
                          className="text-2xl mx-2 text-[#8B0000]"
                        >
                          <MdDelete />
                        </button>
                        <button
                          onClick={() => editTodo(index)}
                          className="text-2xl text-[#2670d2] "
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </li>
                    {/* <li><button>delete</button></li>
              <li><button>dedit</button></li> */}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
