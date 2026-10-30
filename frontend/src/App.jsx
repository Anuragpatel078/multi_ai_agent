
import Home from './pages/Home'
import { useEffect } from 'react'
import getCurrentUser from './features/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice'
 const App = () => {
  const dispatch=useDispatch() 
  useEffect(()=>{
    const getUser=async()=>{
      try {
        const data=await getCurrentUser()
        dispatch(setUserdata(data))
      } catch (error) {
        console.error('Unable to load the current user', error)
      }
 }
    getUser()
  }, [dispatch])
  return (
    <>
      <Home />
    </>
  )
}

export default App
