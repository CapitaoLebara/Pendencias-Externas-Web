import React from 'react'
import { useState } from 'react'


//PERSONALIT ALERT
import { toast } from 'react-toastify'

//NAVIGATE
import { Link } from 'react-router-dom'

//COMPONENTS
import { Pedido } from '../components/Pedido'
import { HeadGlob } from '../components/HeadGlob'


//DATA BASE
import { db } from '../../server/firebase'
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { LogOut } from '../components/LogOut'

export const Agua = () => {

  //<script>
  //LOT
  const [lot, setLot] = useState({
    key: '',
    empreendimento: '',
    quadra: '',
    numero: '',
    status: 'Solicitado',
    pedido: 'Água'
  })

  const handleInformations = (e, key) => {
    setLot({ ...lot, [key]: e.target.value })
  }



  //REGISTER LOT
  async function handleRegister(e) {
    e.preventDefault()
    if (lot.empreendimento == "" || lot.quadra == "" || lot.numero == "") {
      toast.error("Preencha todos os campos obrigatorios")
      return
    }
    else {
      addDoc(collection(db, "Agua"), {
        empreendimento: lot.empreendimento,
        quadra: lot.quadra,
        numero: lot.numero,
        status: lot.status,
        pedido: lot.pedido,
        created: new Date(),
        cor:"blue",
      }).then(() => {
        setLot({ ...lot, empreendimento: "", quadra: "", numero: "" })
        toast.success("Pedido Enviado")
      })
        .catch((err) => {
          toast.error("[ERROR] Não foi Possivel Registrar")
        })
    }
  }
  //</script>
  
  
  return (
    <>
      <div className='flex flex-col items-center'>

        <HeadGlob>

          <ul className='flex justify-center items-center gap-10'>
            <li ><Link to="Todos-os-pedidos" className=' text-[1.2rem] hover:text-[#FFF607]'>Todas as Solicitações</Link></li>
            <li ><Link to="pedidos-concluido" className=' text-[1.2rem] hover:text-[#FFF607]'>Concluidos</Link></li>
            <li ><Link to="NaoConcluidos" className=' text-[1.2rem] hover:text-[#FFF607]'>Não Concluidos</Link></li>
            <li ><Link to="emandamento" className=' text-[1.2rem] hover:text-[#FFF607]'>Em Andamento</Link></li>
            <LogOut/>
          </ul>
        </HeadGlob>



        <form className='w-[400px]' onSubmit={handleRegister}>
          <h1 className='text-white text-[1.4rem] text-center bg-black rounded p-2 mt-8'> Solicitanção de Agua</h1>
          <div className='flex text-white'>
            <h1 className='border w-full border-black px-4 py-2 text-[1.1rem]'>Empreendimento</h1>
            <select className=' uppercase outline-none text-black w-full font-medium text-center border-black border-t-[2px]'
              value={lot.empreendimento}
              onChange={(e) => handleInformations(e, 'empreendimento')}>
              <option value=""></option>
              <option value="Jurema">Jurema</option>
            </select>
          </div>

          <div className='flex text-white'>
            <h1 className='border w-full border-black px-4 py-2 text-[1.1rem]'>Quadra</h1>
            <input className=' uppercase outline-none text-black w-full font-medium text-center border-black border-t-[2px]'
              type="text" value={lot.quadra}
              onChange={(e) => handleInformations(e, 'quadra')} />
          </div>

          <div className='flex text-white'>
            <h1 className='border w-full border-black px-4 py-2 text-[1.1rem]'>Lote</h1>
            <input className=' outline-none text-black w-full font-medium text-center border-black border-y-[2px]'
              type="number" value={lot.numero}
              onChange={(e) => handleInformations(e, 'numero')} />
          </div>

          <button className='bg-[#27272A] text-white border border-black w-full py-2 text-[1.1rem] font-bold' >Enviar</button>
        </form>
      </div>

      {lot.empreendimento !== "" ? (
        <Pedido empreendimento={lot.empreendimento} quadra={lot.quadra} numero={lot.numero} status={lot.status} pedido={lot.pedido} />
      ) :
        (<div></div>)
      }
    </>

  )
}
