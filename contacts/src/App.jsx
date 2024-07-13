import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import AllContacts from './components/AllContacts'
import { Outlet } from 'react-router-dom'
import AddContact from './components/AddContact'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
     <AllContacts/>
     <ToastContainer/>
    </>
  )
}

export default App
