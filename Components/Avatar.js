"use client"
import { AvatarGlb } from '@/Components/Models/Avatar'
import { Center, ContactShadows, Html, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Loader from './Loader'

const Avatar = ({ gesture }) => {


    return (
        <Canvas camera={{ position: [-1, 1, 3] }}>
            <Center>
                <Suspense fallback={<Html><Loader /></Html>}>
                    <AvatarGlb gesture={gesture} />
                </Suspense>
            </Center>
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 2, 3]} intensity={1} />
            <directionalLight position={[5, 2, 3]} intensity={1} />
            <ContactShadows position={[0, -2.21, 0]} color="#808080" />
        </Canvas>
    )
}

export default Avatar