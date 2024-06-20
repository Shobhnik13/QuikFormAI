'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"



const Header = () => {

    const {data}=useSession()
    const signOutFunction = async()=>{
        await signOut()
    }
  return (
    <header className='border bottom-1'><nav className='bg-white border-gray-200 px-4 py-2.5'>
      <div className='flex font-bold md:text-xl flex-wrap justify-between items-center mx-auto max-w-screen-xl'><h1>QuikFormAI</h1><div>
        {
          data?.user ? (
            <div className="flex items-center gap-4">
              <Link href="/view-forms">
                <Button variant="outline">Dashboard</Button></Link>
              {data?.user.name && data?.user.image &&
                <Image
                  src={data?.user.image}
                  alt={data?.user.name}
                  width={32}
                  height={32}
                  className='rounded-full' />
              }
            <Button onClick={signOutFunction} type="submit">Sign out</Button>
            </div>
          ) : (
            <Link href="/api/auth/signin"><Button variant="link">Sign in</Button></Link>
          )
        }</div></div>
    </nav></header>
  )
}

export default Header