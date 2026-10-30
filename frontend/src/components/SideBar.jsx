
import { useEffect, useState } from 'react'
import {
  Coins,
  LogOut,
  MessageSquare,
  PanelLeftIcon,
  PanelRight,
  PenSquare,
  Plus,
  User
} from "lucide-react"

import { useDispatch, useSelector } from 'react-redux'

import {
  addConversation,
  setSelectedConversation,
  setConversations
} from '../redux/conversationSlice'

import { getConversations } from '../features/getConversation'
import { createConversation } from '../features/createConversation'
import logout from '../features/logout'
import { setUserdata } from '../redux/userSlice'

const SideBar = () => {
  const dispatch = useDispatch()

  const { userData } = useSelector(state => state.user)

  const { conversations, selectedConversation } = useSelector(
    state => state.conversation
  )

  const [error, setError] = useState('')
  const [imageError, setImageError] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Fetch conversations
  useEffect(() => {
    let ignore = false

    if (!userData) {
      dispatch(setConversations([]))
      dispatch(setSelectedConversation(null))
      setError('')
      return
    }

    const getConv = async () => {
      try {
        const data = await getConversations()

        if (!ignore) {
          dispatch(setConversations(data))
          setError('')
        }
      } catch (error) {
        if (!ignore) {
          console.error('Unable to load conversations', error)
          setError('Unable to load conversations.')
        }
      }
    }

    getConv()

    return () => {
      ignore = true
    }
  }, [dispatch, userData])

  // Create conversation
  const handleCreateConversation = async () => {
    try {
      const conversation = await createConversation()

      dispatch(addConversation(conversation))
      dispatch(setSelectedConversation(conversation))

      setError('')
    } catch (error) {
      console.error('Unable to create conversation', error)
      setError('Unable to create a new chat.')
    }
  }

  // Logout
  const handleLogout = async () => {
    try {
      await logout()
      dispatch(setUserdata(null))
      dispatch(setConversations([]))
      dispatch(setSelectedConversation(null))
      setError('')
    } catch (error) {
      console.error('Unable to logout', error)
      setError('Unable to logout. Please try again.')
    }
  }

  // User avatar
  const UserAvatar = ({ size = 'w-9 h-9' }) => {
    return (
      <div className={`relative shrink-0 ${size}`}>
        {userData?.avatar && !imageError ? (
          <img
            className={`w-full h-full rounded-[10px] object-cover border-2 border-indigo-500/25`}
            src={userData.avatar}
            alt="User profile"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full rounded-[10px] bg-white/[0.06] flex items-center justify-center">
            <User size={15} className="text-slate-400" />
          </div>
        )}
      </div>
    )
  }

  // Collapsed sidebar
  if (isCollapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0">

        <button
          type="button"
          aria-label="Expand sidebar"
          onClick={() => setIsCollapsed(false)}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
        >
          <PanelRight size={18} />
        </button>

        <button
          type="button"
          aria-label="Create new chat"
          onClick={handleCreateConversation}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
        >
          <Plus size={18} />
        </button>

        {/* Collapsed conversation list */}
        <div className="flex-1 w-full overflow-y-auto px-2 pt-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {conversations.map(conv => {
            const isActive =
              selectedConversation?._id === conv._id

            return (
              <button
                type="button"
                key={conv._id}
                title={conv.title || 'New Chat'}
                aria-label={conv.title || 'New Chat'}
                aria-pressed={isActive}
                onClick={() => dispatch(setSelectedConversation(conv))}
                className={`flex items-center justify-center w-full h-9 mb-1 rounded-lg border transition-colors duration-150 ${isActive
                  ? 'bg-indigo-500/10 border-indigo-500/[0.18] text-indigo-400'
                  : 'bg-transparent border-transparent text-slate-500 hover:bg-white/[0.05] hover:text-slate-200'
                  }`}
              >
                <MessageSquare size={15} />
              </button>
            )
          })}
        </div>

        {/* Collapsed user profile */}
        {userData && (
          <div className="mt-auto">
            <UserAvatar size="w-9 h-9" />
          </div>
        )}

      </div>
    )
  }

  // Expanded sidebar
  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">

      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">

          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setIsCollapsed(true)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
          >
            <PanelLeftIcon size={18} />
          </button>

          <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
            AgentAI
          </span>

          <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
            free
          </span>

          <button
            type="button"
            aria-label="Create new chat"
            onClick={handleCreateConversation}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
          >
            <PenSquare size={14} />
          </button>

        </div>

        {/* New Chat */}
        <div className="px-4 pt-4 pb-1">
          <button
            type="button"
            onClick={handleCreateConversation}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
          >
            <Plus size={15} />
            New Chat
          </button>
        </div>

        {/* Error */}
        {error && (
          <p role="alert" className="px-4 pt-2 text-xs text-red-400">
            {error}
          </p>
        )}

        {/* Recent conversations heading */}
        {conversations.length === 0 ? (
          <div className="px-5 pt-5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            No Recent Conversations
          </div>
        ) : (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            Recents
          </div>
        )}

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {conversations.map(conv => {
            const isActive =
              selectedConversation?._id === conv._id

            return (
              <button
                type="button"
                key={conv._id}
                onClick={() => dispatch(setSelectedConversation(conv))}
                aria-pressed={isActive}
                className={`w-full flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 text-left ${isActive
                  ? 'bg-indigo-500/10 border-indigo-500/[0.18]'
                  : 'bg-transparent border-transparent hover:bg-white/[0.05]'
                  }`}
              >

                <div
                  className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150 ${isActive
                    ? 'bg-indigo-500/15 text-indigo-400'
                    : 'bg-white/[0.05] text-slate-500'
                    }`}
                >
                  <MessageSquare size={13} />
                </div>

                <span
                  className={`text-[13px] font-medium truncate ${isActive ? 'text-slate-100' : 'text-slate-300'
                    }`}
                >
                  {conv.title || 'New Chat'}
                </span>

              </button>
            )
          })}

        </div>

        {/* Footer */}
        <div className="mx-2.5 h-px bg-white/[0.06]" />

        <div className="px-3.5 py-3.5">

          {userData ? (
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">

              <UserAvatar />

              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                  {userData?.name || 'User'}
                </p>

                <p className="text-[11px] text-slate-600 mt-px">
                  Free Plan
                </p>
              </div>

              <div className="flex gap-1 shrink-0">

                <button
                  type="button"
                  aria-label="Credits"
                  className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                >
                  <Coins size={16} />
                </button>

                <button
                  type="button"
                  aria-label="Logout"
                  onClick={handleLogout}
                  className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                >
                  <LogOut size={16} />
                </button>

              </div>

            </div>
          ) : (
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/[0.05] border border-white/[0.08] rounded-xl py-[11px] cursor-pointer hover:bg-white/[0.08] transition-colors duration-150"
            >
              Login
            </button>
          )}

        </div>

      </div>
    </div>
  )
}

export default SideBar
