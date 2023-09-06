"use client"
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { useMemo, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useControls } from 'leva'
import { Racing_Sans_One } from 'next/font/google'

const page = () => {

  const traingle = useLoader(GLTFLoader, '/models/traingle.glb')
  const leftWt = useLoader(GLTFLoader, '/models/leftWt.glb')
  const rightWt = useLoader(GLTFLoader, '/models/rightWt.glb')
  const n = 1.8


  // function for setting the range
  const trainglePositionHandler = (input) => {
    return ((input - 0) / (20 - 0)) * (1 - (-1)) + (-1);
  }

  // leva start

  const options = useMemo(() => {
    return {
      x: { value: 10, min: 5, max: 15, step: 1 },
      // y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      // z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      // visible: true,
      // color: { value: 'lime' },
    }
  }, [])

  const traingleHandler = useControls('Base Position', options)

  // leva end

  const Plank = () => {
    const plank = useLoader(GLTFLoader, '/models/plank.glb')
    // const offset = [-0.33, 0.33, 0.33]
    // const offset = [-0, 0.385166, 0]
    const offset = [-.33, 0, 0]

    const mesh = useRef()

    // reference to the threejs group
    const group = useRef()


    return (
      // <group ref={group} rotation={[0, 0, Math.PI / 8]} position={[0.33, -0.33, -0.33]}> {/* Adjust the position to the right end */}
      <group ref={group} rotation={[0, 0, 0]} position={[.33, 0.385166, -0]}> {/* Adjust the position to the right end */}
        <primitive
          object={plank.scene}
          position={offset}
          children-0-castShadow
        />
      </group>
    )
  }


  return (
    <section className='center'>
      <Canvas camera={{ position: [0, 0, 2] }}>
        {/* Plank start */}
        <Plank />
        {/* Plank end */}


        {/* traingle start */}
        <primitive
          object={traingle.scene}
          position={
            [
              trainglePositionHandler(traingleHandler.x),
              0,
              0
            ]
          }
          children-0-castShadow
        />
        {/* traingle end */}

        {/* leftWt start */}
        <primitive
          object={leftWt.scene}
          position={[0, 0, 0]}
          children-0-castShadow
        />
        {/* leftWt end */}

        {/* rightWt start */}
        <primitive
          object={rightWt.scene}
          // formula for this equation with respect to the scale
          // 1 = 1
          // 2 = 1.25
          // 3 = 1.50
          // value = 1 + (0.25 * (n - 1))
          position={
            [
              0.782943,
              (0.610676) * (1 + (0.25 * (n - 1))),
              0
            ]
          }
          children-0-castShadow
          scale={n}
        />
        {/* rightWt end */}


        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} intensity={0.8} />
        <OrbitControls />
      </Canvas>
    </section>
  )
}





export default page