"use client"
// components/ARScene.js
import { ARButton, XR, Hands } from '@react-three/xr';
import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ContactShadows } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'

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
                    <Hands />
                </XR>
                <ambientLight intensity={1} />
                <axesHelper />
                {/* <primitive object={arRef} /> */}
                <group position={[0, -.5, 0]} scale={.5}>
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
            </Canvas>
            <Leva collapsed />
        </>
    );
};


export default ArBox;

