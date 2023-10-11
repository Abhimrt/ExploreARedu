"use client"
import { ARButton, XR } from '@react-three/xr';
import { Canvas, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Center, ContactShadows, Html } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'

const page = () => {
    const [tree, setTree] = useState(null);
    const [sunTree, setSunTree] = useState(null);
    useEffect(() => {
        const loadTraingle = async () => {
            try {
                const loadedTraingle = await new Promise((resolve, reject) => {
                    new GLTFLoader().load('/models/StraightTree.glb', resolve, undefined, reject);
                });
                setTree(loadedTraingle);
            } catch (error) {
                console.error('Error loading StraightTree.glb:', error);
            }

            try {
                const loadedTraingle = await new Promise((resolve, reject) => {
                    new GLTFLoader().load('/models/SunTree.glb', resolve, undefined, reject);
                });
                setSunTree(loadedTraingle);
            } catch (error) {
                console.error('Error loading SunTree.glb:', error);
            }
        };

        loadTraingle();
    }, []);

    // leva start

    const options = useMemo(() => {
        return {
            Position: { value: 1, min: 1, max: 7, step: .0001 },

            SunVisible: false
        }
    }, [])

    const Handler = useControls('Readings', options)



    // const ENV = useMemo(() => {
    //     return {
    //         x: { value: -10, min: -200, max: 200, step: .01 },
    //         y: { value: 12, min: -200, max: 200, step: .01 },
    //         z: { value: 20, min: -200, max: 200, step: .01 },
    //     }
    // }, [])

    // const env = useControls('Readings', ENV)



    // leva end



    return (
        <>
            <ARButton />
            <Canvas camera={{ position: [-10, 12, 10] }}>
                <XR>
                    <axesHelper />
                    <group position={[0, 1, -5]} scale={.5}>
                        {/* tree start */}
                        {!Handler.SunVisible ?
                            tree && <primitive
                                object={tree.scene}
                                position={
                                    [
                                        0,
                                        0,
                                        0
                                    ]
                                }
                                children-0-castShadow
                            />
                            : sunTree && <primitive
                                object={sunTree.scene}
                                position={
                                    [
                                        0,
                                        0,
                                        0
                                    ]
                                }
                                rotation={
                                    [
                                        0, Handler.Position, 0
                                    ]
                                }
                                children-0-castShadow
                            />}
                    </group>
                </XR>


                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 2, 3]} intensity={2} />

            </Canvas>
            <Leva collapsed />


        </>
    )
}

export default page