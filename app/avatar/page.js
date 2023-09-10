"use client"
import { Avatar } from '@/Components/Models/Avatar'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const page = () => {


    return (
        <Canvas camera={{ position: [1, 2, 3] }}>
            <Avatar />
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 2, 3]} intensity={0.8} />
            <OrbitControls />
        </Canvas>
    )
}

export default page