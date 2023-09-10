/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 avatar.glb 
*/
"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useControls } from 'leva'

export function AvatarGlb({ gesture }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/avatar.glb')
  const { actions } = useAnimations(animations, group)

  // animations name = [ "talking", "idle", "annoye", "accept"]
  const [animationName, setanimationName] = useState("accept");



  // leva start

  // const options = useMemo(() => {
  //   return {
  //     Action: { value: "talking", options: ["idle", "talking", "accept", "annoye"] }
  //   }
  // }, [])

  // const Handler = useControls('Avatar', options)

  // leva end

  useEffect(() => {
    if (gesture) {
      actions[gesture].reset().fadeIn(0.5).play();
      return () => actions[gesture].fadeOut(0.5);
    }
  }, [gesture])

  // useEffect(() => {
  //   setanimationName(Handler.Action)
  // }, [Handler])




  return (
    <group ref={group} dispose={null} position={[0, -2.2, 0]}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.02}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Boy01_Body_Geo" geometry={nodes.Boy01_Body_Geo.geometry} material={materials['Boy01_Body_MAT1.002']} skeleton={nodes.Boy01_Body_Geo.skeleton} />
          <skinnedMesh name="Boy01_Brows_Geo" geometry={nodes.Boy01_Brows_Geo.geometry} material={materials['Boy01_Brows_MAT2.002']} skeleton={nodes.Boy01_Brows_Geo.skeleton} />
          <skinnedMesh name="Boy01_Eyes_Geo" geometry={nodes.Boy01_Eyes_Geo.geometry} material={materials['Boy01_Eyes_MAT2.002']} skeleton={nodes.Boy01_Eyes_Geo.skeleton} />
          <skinnedMesh name="h_Geo" geometry={nodes.h_Geo.geometry} material={materials['Boy01_Mouth_MAT2.002']} skeleton={nodes.h_Geo.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/avatar.glb')