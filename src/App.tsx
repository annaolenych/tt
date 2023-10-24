import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import LoginPage from './pages/LoginPage/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import { redirect } from "react-router-dom";
import { RouterProvider } from 'react-router';
import { TablePage } from './pages/TablePage/TablePage';

const router = createBrowserRouter([{ path: "login", Component: LoginPage },{path:"table", Component: TablePage}, {path:"/",loader(){throw redirect("/login")}}])
function App() {
  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}








export default App;
