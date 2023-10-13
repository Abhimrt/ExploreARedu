/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 HeatWithFire.glb 
*/
"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function HeatModel(props) {
  const { nodes, materials, animations } = useGLTF('/models/HeatWithFire.glb')
  console.log(animations)
  return (
    <group {...props} dispose={null}>
      <group position={[-0.383, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={0.1}>
            <mesh geometry={nodes['Body1_Carbon_Fiber_-_Twill_0'].geometry} material={materials['Carbon_Fiber_-_Twill']} scale={10} />
          </group>
        </group>
      </group>
      <group position={[-0.037, 0.178, 0.127]} rotation={[-Math.PI / 2, 0, 1.646]} scale={12.114}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[0, 0.498, 0.17]} scale={0.496}>
            <group position={[0.272, -5.057, 4.368]} rotation={[-1.361, -0.091, -0.093]}>
              <mesh geometry={nodes.flame_Flame_mat_0.geometry} material={materials['Flame_mat.002']} position={[0.846, 0.286, 4.784]} />
            </group>
          </group>
        </group>
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.147}>
        <mesh geometry={nodes.Object_2.geometry} material={materials['None.002']} position={[-3.282, -0.323, 0.605]} scale={0.001} />
      </group>
      <mesh geometry={nodes.ContainerParaffinHolder_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ContainerMainScrew_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ContainerOpenerMain_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ContainerOpenerTwist_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ContainerParaffinDeliveryPipe_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunScrewT_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ScrewGunRectangle_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunMetalSupport_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunScrewCylinder_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunMainFrameSupport_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunMainFrame_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunScrewSupport_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.Hanger_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ArmHandle_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ArmHandleCylinder_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ContainerMainScrew_low1.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ContainerMainScrew_low2.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.ContainerMainScrew_low3.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunHoleTriangle1_low5.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunHoleTriangle1_low2.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunHoleTriangle1_low3.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunHolledPart_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunHoleTriangle1_low1.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunHoleTriangle1_low4.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.GunHoleTriangle1_low.geometry} material={materials['lambert12.003']} position={[0.416, 0.132, 0.044]} rotation={[Math.PI / 2, 0, -1.646]} scale={0.181} />
      <mesh geometry={nodes.Cube.geometry} material={materials['Material.003']} position={[-0.133, 0.293, 0.07]} scale={[0.275, 0.008, 0.023]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials['Carbon_Fiber_-_Twill']} position={[-0.38, 0.31, 0.069]} scale={[0.028, 0.01, 0.027]} />
    </group>
  )
}

useGLTF.preload('/models/HeatWithFire.glb')
