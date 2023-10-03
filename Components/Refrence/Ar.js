"use client"
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Cube from './Cube'
import { ARButton, XR } from '@react-three/xr'
import ArHit from './ArHit'

const Ar = () => {
    return (
        <>
            <ARButton sessionInit={{
                requiredFeatures: ["hit-test"],
            }} />
            <Canvas>
                <XR>
                    <ArHit />
                </XR>
            </Canvas>
        </>
    )
}

export default Ar