import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='p-5'>
            <h1 className='text-3xl font-bold m-5'>Select Class:</h1>
            <div className='center flex-wrap'>
                {/* class 6 */}
                <div className='border shadow-md text-xl  py-2 px-4 rounded-md m-5 hover:shadow-lg transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110  duration-300 '><Link href="/class/6/prac1" className='w-full' >Class VI Practical 1 </Link></div>

                {/* class 10 */}
                <div className='border shadow-md text-xl  py-2 px-4 rounded-md m-5 hover:shadow-lg transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110  duration-300 '><Link href="/class/10/prac1" className='w-full' >Class X Practical 1 </Link></div>

                {/* class 11 */}
                <div className='border shadow-md text-xl  py-2 px-4 rounded-md m-5 hover:shadow-lg transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110  duration-300 '><Link href="/class/11/prac1" className='w-full' >Class XI Pracrical 1</Link></div>
            </div>
        </div>
    )
}

export default page