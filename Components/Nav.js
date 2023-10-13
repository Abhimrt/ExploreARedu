import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <div className='w-screen h-[50px] flex items-center px-6'>
            <Link href="/" className='font-bold text-xl'>Explore Ar Education</Link>
        </div>
    )
}

export default Nav