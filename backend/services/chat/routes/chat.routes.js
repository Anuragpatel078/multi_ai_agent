import express from "express"
import { createConversation, getConversation, getMessages, saveMessage, updateConversation } from "../controllers/chat.controller"

const router=express.Router()

router.get("/create-conversation",createConversation)
router.get("/get-conversations",getConversation)
router.post("save-message",saveMessage)
router.post("/update-conversation",updateConversation)
router.post("get-message/:conversationId",getMessages)
export default router