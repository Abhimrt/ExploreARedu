import Nav from '@/Components/Nav'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className=' absolute top-0 h-screen mainSection '>
            <Nav />
            <h1 className='text-6xl font-bold m-5 p-5'>Select Class:</h1>
            <div className='flex justify-center content-center'>
                <div className='center flex-wrap p-5 mainButtonSection lg:w-[50vw] sm:w-screen'>
                    {/* class 6 */}
                    <Link href="/class/6/prac1" className=' mainButton drop-shadow-lg' ><span>Class VI</span> <br /> Practical 1 </Link>

                    {/* class 7 */}
                    <Link href="/class/7/prac1" className=' mainButton drop-shadow-lg' ><span>Class VII</span> <br /> Practical 1 </Link>

                    {/* class 10 */}
                    <Link href="/class/10/prac1" className=' mainButton drop-shadow-lg' ><span>Class X</span> <br /> Practical 1 </Link>

                    {/* class 11 */}
                    <Link href="/class/11/prac1" className=' mainButton drop-shadow-lg' ><span>Class XI</span> <br /> Pracrical 1</Link>
                </div>
                <div className="mainImage lg:w-[40vw] sm:none aspect-square">
                </div>
            </div>
        </div>
    )
}

export default page