"use client"
import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'
import Link from 'next/link';

const page = () => {

    const [magnet1, setMagnet1] = useState(null);
    const [magnet2, setMagnet2] = useState(null);

    useEffect(() => {



        const loadTraingle = async () => {
            try {
                const loadedTraingle = await new Promise((resolve, reject) => {
                    new GLTFLoader().load('/models/magnets.glb', resolve, undefined, reject);
                });
                const loadedTraingle1 = await new Promise((resolve, reject) => {
                    new GLTFLoader().load('/models/magnets.glb', resolve, undefined, reject);
                });
                setMagnet1(loadedTraingle);
                setMagnet2(loadedTraingle1);
            } catch (error) {
                console.error('Error loading magnets.glb:', error);
            }
        };

        loadTraingle();
    }, []);



    // leva start

    const options = useMemo(() => {
        return {
            Position: { value: 2, min: 0, max: 3, step: .01 },
            reverse: false,
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
                    <Env />
                    <group position={[0, -.5, 0]} scale={3}>
                        {magnet1 && <primitive
                            object={magnet1.scene}
                            position={
                                [
                                    0,
                                    0,
                                    Handler.Position <= 1 ? Handler.reverse ? Handler.Position - 3 : Handler.Position - 2.14 : -2
                                ]
                            }
                            children-0-castShadow
                        />}
                        {magnet2 && <primitive
                            object={magnet2.scene}
                            position={
                                [
                                    0,
                                    0,
                                    Handler.Position
                                ]
                            }
                            rotation={
                                [
                                    0, Handler.reverse ? Math.PI : 0, 0
                                ]
                            }
                            children-0-castShadow
                        />}
                    </group>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 2, 3]} intensity={10} />
                    <OrbitControls

                        enableRotate={false}
                        autoRotate
                        autoRotateSpeed={.3}
                    />
                </Canvas>
                <Leva collapsed />
            </section>
            <Link href='/class/6/prac1/ar' type="button" class="z-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 fixed bottom-5">Switch AR</Link>

        </main>
    )
}





export default page