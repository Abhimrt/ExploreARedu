"use client"
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const Cube = ({ position }) => {
    const cubeRef = useRef()

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
    })

    return (
        <>
            {/* <OrbitControls />
            <ambientLight /> */}
            <mesh ref={cubeRef} position={position} scale={.5}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </>
    )
}

export default Cube