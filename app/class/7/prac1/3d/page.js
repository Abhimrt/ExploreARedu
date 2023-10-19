"use client"
import { Canvas, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Center, ContactShadows, Environment, Html, OrbitControls, useAnimations } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'
import Link from 'next/link';
import Loader from '@/Components/Loader'
import { HeatWithFire } from '@/Components/HeatWithFire'

const page = () => {

    const [withoutFire, setWithoutFire] = useState(null);

    useEffect(() => {



        const loadTraingle = async () => {
            try {

                const loadedTraingle1 = await new Promise((resolve, reject) => {
                    new GLTFLoader().load('/models/HeatWithoutFire.glb', resolve, undefined, reject);
                });

                setWithoutFire(loadedTraingle1);
            } catch (error) {
                console.error('Error loading magnets.glb:', error);
            }
        };

        loadTraingle();
    }, []);




    // leva start

    const options = useMemo(() => {
        return {
            // Position: { value: 2, min: 0, max: 3, step: .01 },
            FireON: false,
        }
    }, [])

    const Handler = useControls('Readings', options)

    // leva end



    function Env() {
        return (
            <Environment
                files={"/images/room_1k.exr"}
                background
                ground={{
                    height: 20,
                    radius: 40,
                    scale: 70,
                }}
                receiveShadow
            />
        );
    }


    return (
        <main className='center w-screen h-screen'>
            <section className='center' >
                <Canvas camera={{ position: [-10, 8, 10] }}>
                    <Center>
                        <Suspense fallback={<Html><Loader /></Html>}>
                            <Env />
                            <group position={[0, -.5, 0]} scale={10}>
                                {withoutFire && !Handler.FireON && <primitive
                                    object={withoutFire.scene}
                                    position={
                                        [
                                            0,
                                            0,
                                            0
                                        ]
                                    }
                                    children-0-castShadow
                                />}
                                {Handler.FireON &&
                                    <HeatWithFire />
                                }
                            </group>
                        </Suspense>
                    </Center>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 2, 3]} intensity={10} />
                    <OrbitControls />
                </Canvas>
                <Leva collapsed />
            </section>
            <Link href='/class/7/prac1/ar' type="button" class="z-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 fixed bottom-5">Switch AR</Link>

        </main>
    )
}





export default page