import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import PrivateRoute from './privateRoute/PrivateRoute'
import Receita from './pages/receitas/Receitas'
import Conta from './pages/conta/Conta'
import Despesas from './pages/Despesas/Despesas'
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro/>}></Route>

        
       <Route path="/conta" element={<PrivateRoute><Conta /></PrivateRoute>}></Route>
        <Route path="/despesas" element={<PrivateRoute><Despesas /></PrivateRoute>}></Route>

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
