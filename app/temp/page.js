"use client"
// components/ARScene.js
import React, { useRef } from 'react';
import { ARButton, XR, Hands } from '@react-three/xr';
import { Canvas, useFrame } from '@react-three/fiber';

const ARScene = () => {
  const arRef = useRef();

  // Function to add a cube to the scene when AR is ready
  const addCubeToScene = (scene) => {
    const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0.05, -0.2); // Adjust the cube's position
    scene.add(cube);
  };

  return (
    <>
      <ARButton ar={arRef} />
      <Canvas>
        <XR>
          <Hands />
        </XR>
        <pointLight intensity={1} position={[0, 3, 0]} />
        <ambientLight intensity={0.5} />
        <axesHelper />
        <primitive object={arRef} />
        <group>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </group>
        <group>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
        </group>
        <group>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="green" />
          </mesh>
        </group>
        <group>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="yellow" />
          </mesh>
        </group>
        <group>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="purple" />
          </mesh>
        </group>
      </Canvas>
    </>
  );
};


export default ARScene;

