"use client"
import { ARButton, XR } from '@react-three/xr';
import { Canvas, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Center, ContactShadows, Html } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'

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


    const control = useMemo(() => {
        return {
            x: { value: 0, min: -20, max: 20, step: .1 },
            y: { value: 1, min: -20, max: 20, step: .1 },
            z: { value: -5, min: -20, max: 20, step: .1 },
            scale: { value: .5, min: .3, max: 10, step: .1 }
        }
    }, [])

    const location = useControls('Positions', control)

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
                    <group position={[
                        location.x,
                        location.y,
                        location.z
                    ]}
                        scale={location.scale}>
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
                </XR>


                <ambientLight intensity={0.5} />
                <directionalLight position={[1, 2, 3]} intensity={2} />

            </Canvas>
            <Leva collapsed />


        </>
    )
}

export default page