import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Signin from './pages/Signin.jsx'
import Register from './pages/Register.jsx'
import Todo from './Components/Todo.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Signin/>,
      },
      {
        path: 'register',
        element: <Register/>,
      },
      {
        path: 'todo',
        element: <Todo />
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
