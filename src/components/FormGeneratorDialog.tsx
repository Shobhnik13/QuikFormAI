'use client'

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { generateForm } from "@/app/actions/generateForm"
import { useFormStatus } from "react-dom"
import { useFormState } from "react-dom"
import { signIn, useSession } from "next-auth/react"

export const SubmitButton=()=>{
     const { pending }= useFormStatus()
    return(
        <Button type="submit" disabled={pending}>
            {pending?"Generating...":"Generate"}
        </Button>
    )
}

const initialState:{
    message:string,
    data?: any
}={
    message:""
}

const FormGeneratorDialog = () => {
   
    const { data }=useSession()
    const [isOpen,setIsOpen]=useState(false)
    const [state,formAction]=useFormState(generateForm,initialState)
    const onFormCreate=()=>{
        if(data?.user){
            setIsOpen(true)
        }else{
            signIn()
        }
    }

    useEffect(()=>{
        if(state.message === 'success'){
            setIsOpen(false)
        }
        console.log(state)
    },[state.message])

  return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={onFormCreate}>Create form</Button>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Create new form</DialogTitle>
                </DialogHeader>
                    <form action={formAction}>
                        <div className="grid gap-4 py-4">
                          <Textarea id="desc" name="desc" required placeholder="Share what your form is about, who is it for, and the information you would like to collect. And our QuikFormAI will do the magical stuff ✨" />
                        </div>
                <DialogFooter>
                    <SubmitButton/>
                    <Button variant={'link'}>Create manually</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
  )
}

export default FormGeneratorDialog