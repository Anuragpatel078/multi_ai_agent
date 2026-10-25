import { getModel } from "../config/llmModel.js"

export const router=async(state)=>{
    const llm= await getModel("router")
    const prompt=`you are an agent router.
    Available agenets:
    -chat
    -search
    -coding
    -pdf
    -ppt
    image

    Rules:
    chat:
    General converstaion,
    explanations,
    learning,
    questions.

    search:
    Current event,
    latest information,
    news,
    recent development,
    internet lookup.

    coding:
    generate code,
    debug code,
    build projects,
    architecture,
    api design.

    ppt:
    Questions about generate ppts or ppt context.

    pdf:
    Questions about generate Pdfs or document context.

    image:
    Generate image,
    create image

    return only one word:
    chat
    search
    coding
    pdf
    image
    ppt

    User query:
    ${state.prompt}
    `

const response=await llm.invoke(prompt)
return {
    ...state,
    agent:response.content
    .trim()
    .toLowerCase()
}

}