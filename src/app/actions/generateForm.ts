"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache";


export const generateForm=async(prevState:{message:string},formData:FormData)=>{
    const formInputSchema=z.object({
        desc:z.string().min(1)
    })

    const parse=formInputSchema.safeParse({
        desc:formData.get("desc")
    })
    if(!parse.success){
        return {
            message:"Failed to parse data / incorrect input type."
        }
    }

    if(!process.env.CLOUDFLARE_AI_KEY){
        return {
            message:"There is something wrong with our AI model!"
        }
    }
    
    const data=parse.data.desc

    const promptExplanation = "Based on the description, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []";
    try{
        const response = await fetch(process.env.AI_FETCH_URL || "",
            {
              headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_AI_KEY}` },
              method: "POST",
              body: JSON.stringify({
                messages: [
                  {
                    role: "user",
                    content: `${data} ${promptExplanation}`,
                  },
                ],
              }),
            }
          );
          
          const result = await response.json();
        //   console.log(result)
    revalidatePath("/")
    return{
        message:"success",
        data:result
    }
    }catch(error:any){
        return{
            message:"Failed to send a request."
        }
    }

}