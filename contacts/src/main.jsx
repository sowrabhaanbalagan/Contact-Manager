import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddContact from './components/AddContact.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}> </Route>
    <Route path='/add' element={<AddContact/>}/>
  </Routes>
  </BrowserRouter>
  <ToastContainer/>
  </React.StrictMode>,
)
