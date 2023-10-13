"use client"
import { Canvas, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Center, ContactShadows, Environment, Html, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'
import Link from 'next/link';
import Loader from '@/Components/Loader'

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

    window.onbeforeunload = function () {
        return "Data will be lost if you leave the page, are you sure?";
    };

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


    function Env() {
        return (
            <Environment
                files={"/images/woods_1k.exr"}
                background
                ground={{
                    height: 26.40,
                    radius: 84.12,
                    scale: 56.68,
                }}
                receiveShadow
            />
        );
    }


    return (
        <main className='center w-screen h-screen'>

            <section className='center' >
                <Canvas camera={{ position: [-10, 12, 10] }}>
                    <Center>
                        <Suspense fallback={<Html><Loader /></Html>}>
                            <Env />
                            <group position={[0, -.5, 0]} scale={1.7}>
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
                        </Suspense>
                    </Center>


                    <ambientLight intensity={0.5} />
                    {/* <directionalLight position={[1, 2, 3]} intensity={1} /> */}
                    <OrbitControls
                        enableRotate={false}
                        autoRotate
                        autoRotateSpeed={.3}
                    />
                </Canvas>
                <Leva collapsed />
            </section>
            <Link href='/class/10/prac1/ar' type="button" class="z-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 fixed bottom-5">Switch AR</Link>

        </main>
    )
}





export default page