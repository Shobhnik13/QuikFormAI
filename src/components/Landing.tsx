'use client'

import Image from "next/image"
import FormGeneratorDialog from "./FormGeneratorDialog"

const Landing = () => {
  return (
    <>
        {/* section 1  */}
        <section id="hero" className="px-4 flex flex-col items-center justify-center space-y-4 pt-24 w-full bg-[url('/grid.svg')]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center tracking-tighter leading-8">Create your form in seconds</h1>
            <p className="max-w-[600px] mt-4 text-center text-gray-500 md:text-xl">Generate, publish and share your form right away with AI. Dive into insightful results, analytics and charts.</p>
            <FormGeneratorDialog/>
            <div className="w-full bg-gradient-to-b from-transparent to-white h-24">

            </div>
        </section>

        {/* section 2 */}
        <section className='flex flex-col items-center justify-center space-y-4 mt-12 pb-24' id="features">
        <h2 className='text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl'>How It Works</h2>
        <ul className='pt-10 grid gap-4 grid-cols-1 md:gridcols-2 lg:grid-cols-3 w-full max-w-5xl text-center'>
          <li className='flex flex-col items-center space-y-4 relative'>
            <Image
              src="/demo1.png"
              width="250"
              height="250"
              alt="create a form"
              className='bg-white p-4 shadow-sm border rounded-md'
            />
            <Image src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2" />
            <p>1. Add a prompt and describe the requirements for your form.</p>
          </li>
          <li className='flex flex-col items-center space-y-4 relative'>
            <Image
              src="/demo2.png"
              width="250"
              height="250"
              alt="update the form"
              className='bg-white p-4 shadow-sm border rounded-md'
            />
            <Image src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1] rotate-180" />
            <p>2. Generate the form.</p>
          </li>
          <li className='flex flex-col items-center space-y-4 relative'>
            <Image
              src="/demo4.png"
              width="250"
              height="250"
              alt="check the analytics"
              className='bg-white p-4 shadow-sm border rounded-md'
            />
            <p>3. Check results, analytics and more. </p>
          </li>
        </ul>
      </section>
    </>
  )
}

export default Landing