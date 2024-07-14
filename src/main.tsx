import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { EmailSender } from './pages/EmailSender'
import { Login } from './pages/login/index.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/email-sender' element={<EmailSender />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
