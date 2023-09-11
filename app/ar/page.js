"use client"
import { Canvas, useLoader } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ARCanvas, useHitTest } from "@react-three/xr";
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'
import Link from 'next/link';

const page = () => {

  const background = useRef()
  // const vid = false
  const [vid, setvid] = useState(false)
  const [dimension, setdimension] = useState({ width: "auto", height: "auto" });
  const [traingle, setTraingle] = useState(null);

  useEffect(() => {
    if (vid) getVideo();
    setdimension({ width: `${background.current.offsetWidth}px`, height: `${background.current.offsetHeight + 100}px` })
    // console.log(background.current.offsetWidth, background.current.offsetHeight)


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
  }, [background, vid]);

  let stream

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(gstream => {
        stream = gstream
        let video = background.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };



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

  function Env() {
    return (
      <Environment
        files={"./images/lebombo_1k.exr"}
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
      {vid && <video ref={background} className="cam"></video>}
      <section className='center' ref={vid ? null : background} style={vid ? dimension : {}}>
        <Canvas camera={{ position: [-10, 8, 10] }}>
          {!vid && <Env />}
          <group position={[0, -.5, 0]} scale={vid ? 8 : 6}>
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



          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 2, 3]} intensity={0.8} />
          <OrbitControls />
        </Canvas>
        <Leva collapsed />
      </section>
      {/* <button type="button" onClick={() => setvid(!vid)} class="z-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 fixed bottom-5">{vid ? "Switch 3d" : "Switch AR"}</button> */}
      <Link href='/temp' type="button" class="z-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 fixed bottom-5">{vid ? "Switch 3d" : "Switch AR"}</Link>

    </main>
  )
}





export default page