import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import PrivateRoute from './privateRoute/PrivateRoute'
import Receita from './pages/receitas/Receitas'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro/>}></Route>

        <Route path="/"  
        element={
          <PrivateRoute><Home /></PrivateRoute>}
        ></Route>
        <Route path="/receita" element={ <PrivateRoute><Receita /></PrivateRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
