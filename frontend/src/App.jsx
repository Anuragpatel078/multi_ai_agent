
import { signInWithPopup } from 'firebase/auth'
import api from '../utils/axios'
import {auth,googleProvider} from '../utils/firebase'

const App = () => {
  const handleLogin=async(token)=>{
    try{
      const {data}=await api.post("/auth/login",{token}  )
      console.log(data)
    }
    catch(error){
      console.log(error)
    }
  }

  const googleLogin=async()=>{
    const data=await signInWithPopup(auth,googleProvider)
    const token=await data.user.getIdToken()
    console.log(token)
    await handleLogin(token)
    console.log(data);
  }
  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
      <button className='w-50 h-24 bg-amber-400 ' onClick={googleLogin}>continue with google</button>
    </div>
  )
}

export default App
