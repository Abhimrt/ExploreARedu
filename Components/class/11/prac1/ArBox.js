"use client"
// components/ARScene.js
import { ARButton, XR } from '@react-three/xr';
import { Canvas, useLoader } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Center, ContactShadows, Html } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'
import Loader from '../../../Loader';

const ArBox = () => {
    const arRef = useRef();

    const [traingle, setTraingle] = useState(null);

    useEffect(() => {

        const loadTraingle = async () => {
            try {
                const loadedTraingle = await new Promise((resolve, reject) => {
                    new GLTFLoader().load('/models/traingle.glb', resolve, undefined, reject);
                });
                setTraingle(loadedTraingle);
            } catch (error) {
                console.error('Error loading traingle.glb:', error);
            }
        };

        loadTraingle();
    }, []);

    // function for setting the range
    const trainglePositionHandler = (input) => {
        return ((input - 0) / (20 - 0)) * (1 - (-1)) + (-1);
    }

    // leva start

    const options = useMemo(() => {
        return {
            Position: { value: 10, min: 5, max: 15, step: .01 },
            Weight1: { value: 100, min: 100, max: 800, step: 50 },
            Weight2: { value: 100, min: 100, max: 800, step: 50 },
        }
    }, [])

    const Handler = useControls('Readings', options)

    const control = useMemo(() => {
        return {
            x: { value: 0, min: -20, max: 20, step: .1 },
            y: { value: 1, min: -20, max: 20, step: .1 },
            z: { value: -5, min: -20, max: 20, step: .1 },
            scale: { value: 1, min: .3, max: 10, step: .1 }
        }
    }, [])

    const location = useControls('Positions', control)

    // leva end

    const Plank = () => {
        let plank = useMemo(
            () => [useLoader(GLTFLoader, '/models/plank.glb'), useLoader(GLTFLoader, '/models/plankL.glb'), useLoader(GLTFLoader, '/models/plankR.glb')],
            []
        )
        const offset = [-trainglePositionHandler(Handler.Position), 0, 0]
        const [count, setcount] = useState(0)

        const group = useRef()
        const moreWtSide = (Handler.Weight1 * Handler.Position) - (Handler.Weight2 * (20 - Handler.Position))

        useEffect(() => {
            if (Handler.Weight1 > Handler.Weight2) {
                setcount(1)
            } else if (Handler.Weight1 < Handler.Weight2) {
                setcount(2)
            }
            if (moreWtSide < 10 && moreWtSide > -10) {
                group.current.rotation.z = 0
            } else if (moreWtSide < 0) {
                group.current.rotation.z = -Math.PI / 8
            } else if (moreWtSide > 0) {
                group.current.rotation.z = Math.PI / 8
            }
        }, [])








        return (
            <group ref={group} rotation={[0, 0, 0]} position={[trainglePositionHandler(Handler.Position), 0.385166, -0]}> {/* Adjust the position to the right end */}
                <primitive
                    object={plank[count].scene}
                    position={offset}
                    children-0-castShadow
                />
            </group>
        )
    }

    return (
        <>
            <ARButton ar={arRef} />
            <Canvas>
                <XR>
                    <ambientLight intensity={1} />
                    <directionalLight position={[1, 2, 3]} intensity={10} />
                    <axesHelper />
                    {/* <primitive object={arRef} /> */}
                    {/* <Cube position={[0, 2, -5]} /> */}
                    <Center>
                        <Suspense fallback={<Html><Loader /></Html>}>
                            <group
                                position={[
                                    location.x,
                                    location.y,
                                    location.z
                                ]}
                                scale={location.scale}
                            >
                                {/* Plank start */}
                                <Plank />
                                <ContactShadows position={[0, 1, 0]} color="#808080" />
                                {/* Plank end */}


                                {/* traingle start */}
                                {traingle && <primitive
                                    object={traingle.scene}
                                    position={
                                        [
                                            trainglePositionHandler(Handler.Position),
                                            0,
                                            0
                                        ]
                                    }
                                    children-0-castShadow
                                />}
                            </group>
                        </Suspense>
                    </Center>
                </XR>
            </Canvas>
            <Leva collapsed />
        </>
    );
};


export default ArBox;