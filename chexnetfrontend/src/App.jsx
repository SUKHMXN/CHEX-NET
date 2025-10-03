import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Sidebar from "./components/sidebar.jsx"
import {useLocation} from "react-router-dom"


function App() {

  return (
      <>
       <Header />
        <Outlet />
       </>
  )
}

export default App;
