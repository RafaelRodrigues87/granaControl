import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
