import { createBrowserRouter } from "react-router-dom"
import { AllPedidos } from "../components/pages_route/AllPedidos/AllPedidos"
import { Clear } from "../components/pages_route/Concluidos/Clear"
import { Andamento } from "../components/pages_route/Em_andamento/Andamento"
import { Nao_concluido } from "../components/pages_route/Não_Concluido/Nao_concluido"
import { Agua } from "../pages/Agua"
import { Energia } from "../pages/Energia"
import { Home } from "../pages/Home/Home"
import { Limpeza } from "../pages/Limpeza"
import { Login } from "../pages/Login"
import { P404 } from "../pages/P404"
import  Private  from "./Private"


const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/Home',
    element:<Private><Home/></Private>
  },

  //ROUTES FROM WATER
  {
    path:'/Agua',
    element:<Private><Agua/></Private>
  },
  {
    path:'/Agua/emandamento',
    element:<Private> <Andamento/> </Private>
  },
  ,
  {
    path:'/Agua/Todos-os-pedidos',
    element:<Private><AllPedidos/></Private>
  },
  {
    path:'/Agua/pedidos-concluido',
    element:<Private><Clear/></Private>
  },
  {
    path:'/Agua/NaoConcluidos',
    element:<Private><Nao_concluido/></Private>
  },

  //ROUTES FROM LIGHT
  {
    path:'/Energia',
    element:<Private><Energia/></Private>
  },

  //ROUTES FROM CLEAN
  {
    path:'/Limpeza',
    element:<Private><Limpeza/></Private>
  },
  {
    path:'*',
    element:<P404/>
  },
])

export {router}
