"use client"
import { AvatarGlb } from '@/Components/Models/Avatar'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const Avatar = ({ gesture }) => {


    return (
        <Canvas camera={{ position: [-1, 1, 3] }}>
            <AvatarGlb gesture={gesture} />
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 2, 3]} intensity={1} />
            <directionalLight position={[5, 2, 3]} intensity={1} />
            <ContactShadows position={[0, -2.21, 0]} color="#808080" />
        </Canvas>
    )
}

export default Avatar