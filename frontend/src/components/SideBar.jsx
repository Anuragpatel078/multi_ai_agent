import { useEffect, useState } from 'react'
import { MessageSquare, PanelLeftIcon, PenSquare, Plus } from "lucide-react"
import {useDispatch, useSelector} from 'react-redux'
import { addConversation, setSelectedConversation, setConversations } from '../redux/conversationSlice'
import {getConversations} from '../features/getConversation'
import { createConversation } from '../features/createConversation'



const SideBar = () => {
  const dispatch=useDispatch()
  const { userData } = useSelector(state => state.user)
  const { conversations,selectedConversation } = useSelector(state => state.conversation)
  const [error, setError] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(()=>{
    if (!userData) {
      dispatch(setConversations([]))
      dispatch(setSelectedConversation(null))
      return
    }

    const getConv=async()=>{
      try {
        const data = await getConversations()
        dispatch(setConversations(data))
        setError('')
      } catch (error) {
        console.error('Unable to load conversations', error)
        setError('Unable to load conversations.')
      }
    }
    getConv()
  },[dispatch, userData])

  const handleCreateConversation = async () => {
    try {
      const conversation = await createConversation()
      dispatch(addConversation(conversation))
      setError('')
    } catch (error) {
      console.error('Unable to create conversation', error)
      setError('Unable to create a new chat.')
    }
  }

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-50
    ${isCollapsed ? 'w-14' : 'w-[270px]'} h-screen shrink-0 bg-[#0d0f14] border-r
     border-white/[0.06]`}>
      <div className='flex flex-col h-full'>
        <div className='flex items-center gap-2.5 
            px-4 py-4 border-b border-white/[0.06]'>
          <button type='button' onClick={() => setIsCollapsed(!isCollapsed)} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} className='hidden lg:flex items-center justify-center w-7
            h-7 rounded-lg text-slate-500 hover:text-slate-200
             hover:bg-white/[0.05] transition-colors duration-150
               bg-transparent border-none cursor-pointer'>
            <PanelLeftIcon></PanelLeftIcon>
          </button>
          {!isCollapsed && <>
            <span className='text-[16px] font-semibold text-slate-100 tracking-tight flex-1'>
              AgentAI
            </span>
            <span className='text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide'>free</span>
            <button type='button' className='hidden lg:flex items-center justify-center w-7
            h-7 rounded-lg text-slate-500 hover:text-slate-200
             hover:bg-white/[0.05] transition-colors duration-150
              bg-transparent border-none cursor-pointer' onClick={handleCreateConversation} aria-label='Create new chat'>
              <PenSquare size={14}></PenSquare>
            </button>
          </>}




        </div>
      
          <div className='px-4 pt-4 pb-1'>
            <button type='button' onClick={handleCreateConversation} className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'>
              <Plus size={15}></Plus>
              New Chat
            </button>
          </div>


          {conversations.length==0?
          <div className='px-5 pt-5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
            No Recent Conversations
          </div>
          :
          (
            <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-windset text-slate-600'>
              Recents
            </div>
          )}


          <div className='flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {conversations.map((conv,i)=>{
              const isActive =selectedConversation?._id==conv?._id
              return (
                <div  onClick={()=>dispatch(setSelectedConversation(conv))}className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5
                rounded-[10px] border transition-colors duration-150
                ${isActive ?"bg-indigo-500/10 border-indigo-500/[0.18]"
                  :   "bg-transparent border-transparent"
                }`}> 
               <div className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg
                transition-colors duration-150
                ${isActive? "bg-indigo-500/15 text-indigo-400":"bg-white/[0.05] text-slate-500"}`}>
                <MessageSquare size={13}></MessageSquare>
                </div>
                <span className={`text-[13px] font-medium truncate ${isActive?"text-slate-100":"text-slate-300"}`}>{conv?.title|| "New Chat"}</span>
                </div>
              )

            })}

          </div>
          <div className='mx-2.5 h-px bg-white/[0.06]'>
          <div className=''>
            {userData ?(
             <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5
             hover:bg-white/[0.05] transition-colors duration-150'>

             </div>)
            :
            <button>
              Login
            </button>
            }
          </div>
          </div>

      </div>
    </div>
  )
}

export default SideBar