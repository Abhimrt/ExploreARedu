"use client"
import { OrbitControls } from '@react-three/drei'
import { Interactive, useHitTest, useXR } from '@react-three/xr'
import React, { Children, useRef, useState } from 'react'
import Cube from './Cube'
import TempModel from '../TempModel'
import TorqueAR from '../TorqueAR'

const ArHit = ({ Child }) => {

    const rectRef = useRef()
    const [cubes, setCubes] = useState([])

    useHitTest((hitMatrix, hit) => {
        hitMatrix.decompose(rectRef.current.position, rectRef.current.quaternion, rectRef.current.scale)
        rectRef.current.rotation.set(-Math.PI / 2, 0, 0);
    })

    const { isPresenting } = useXR();

    const placeCube = (e) => {
        let position = e.intersection.object.position.clone()
        let id = Date.now();
        setCubes([
            // uncomment if you want to show multiple elements on clicking on the pointer
            // ...cubes,
            { position, id }
        ])
    }

    return (
        <>
            <OrbitControls />
            <ambientLight />
            {isPresenting &&
                cubes.map(({ position, id }) => {
                    return (
                        <group position={position} key={id} >
                            {/* <TempModel position={position} key={id} /> */}
                            <TorqueAR position={position} key={id} />
                            {Child}
                        </group>
                    )
                })

            }
            {Child}
            <Interactive onSelect={placeCube}>

                <mesh ref={rectRef} rotation-x={Math.PI / 2}>
                    <ringGeometry args={[.1, .25, 32]} />
                    <meshStandardMaterial color={"white"} />
                </mesh>
            </Interactive>
        </>
    )
}

export default ArHit