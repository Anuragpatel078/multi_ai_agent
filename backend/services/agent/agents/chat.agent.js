import { getModel } from "../config/llmModel"
export const chatAgent=async (state)=>{
    const llm=await getModel("chat")
    const systemprompt="you are agentVerse,an intelligent ai assistant."
    const response =(await llm).invoke([
        {
            "role":"system",
            "content":systemprompt
        },
        {
            "role":"human",
            "content":state.prompt
        }
    ])
    return {
        ...state,
        aiResponse:response.content
    }
}