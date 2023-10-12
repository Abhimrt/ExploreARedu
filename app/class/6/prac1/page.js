"use client"
import Avatar from '@/Components/Avatar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [gesture, setgesture] = useState("idle")
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [synthesis, setSynthesis] = useState(null);
    const [voices, setVoices] = useState([]);
    const [num, setnum] = useState(1);
    const theory = {
        heading1: "Attraction and repulsion between magnets",
        description1: "Repulsion occurs when like poles (N-N or S-S) of the magnets are kept closer to each other. Attraction occurs when unlike poles (N-S or S-N) of the magnets are kept closer to each other. Like poles repel whereas unlike poles attract each other.",
        example1: "If you hold two bar magnets, and bring one close to the other, you will observe one of two things. Either the magnets will resist being pushed together, or they will snap together. Here is a perfect example of force as a push or a pull. When two opposite magnetic poles are close, they attract each other.",
    }
    const [text, setText] = useState(`Today we will discuss about ${theory.heading1}... ${theory.description1}... Let us understand with an example ${theory.example1}... `);


    useEffect(() => {
        // Check if window is defined (client side)
        if (typeof window !== 'undefined') {
            // Initialize speechSynthesis and get voices
            const synth = window.speechSynthesis;
            const availableVoices = synth.getVoices();
            setSynthesis(synth);
            console.log(availableVoices)
            setVoices(availableVoices);
        }
    }, []);


    const speakText = () => {
        // if (!text) return;
        if (!synthesis) return;

        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = voices.find((voice) => voice.lang === 'en-US');
        utterThis.rate = .8;
        synthesis.speak(utterThis);
        setIsSpeaking(true);
        setgesture("talking")
        utterThis.onend = (event) => {
            setIsSpeaking(false);
            setgesture("idle")
        };
    };


    return (
        <div className='relative h-auto overflow-x-hidden'>
            <div className='center flex-col my-2 w-screen h-[420px] pb-4 fixed top-0  desBackground'>
                {!isSpeaking && <button onClick={speakText} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ">Start Speaking</button>}
                {isSpeaking && <button type="button" class="text-white bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  ">Speaking...</button>}

                <Avatar gesture={gesture} />
            </div>
            <main className='w-screen h-auto pt-[420px] mb-5  p-5 '>
                <h1 className='text-6xl lg:text-5xl font-bold'>{theory.heading1}</h1>
                <div className='m-3 text-lg'>
                    <p>{theory.description1}</p>
                    <h3 className='text-3xl font-semibold mt-5' >Example</h3>
                    <p className='border shadow-md m-2 p-2 px-4 '>{theory.example1}</p>
                </div>
                <div className='w-screen center flex-wrap'>
                    <Link href="/class/6/prac1/3d"><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ">3D Model</button></Link>
                </div>
            </main>
        </div>
    )
}

export default page

// "heading1": "Torque",
//       "description1": "Torque is a measure of the force that can cause an object to rotate about an axis. Just as force is what causes an object to accelerate in linear kinematics, torque is what causes an object to acquire angular acceleration.",
//       "example1": "A person pushing a closed-door is applying a static torque because the door isn't rotating despite the force applied. Pedalling a cycle at a constant speed is also an example of static torque as there is no acceleration.",
//       "formula1": "T = F × r × siny."

// heading1	"Torque"
// description1	"Torque is a measure of the force that can cause an object to rotate about an axis. Just as force is what causes an object to accelerate in linear kinematics, torque is what causes an object to acquire angular acceleration."
// example1	"The seesaw principle is really a statement about the equilibrium of forces. On either side of the seesaw, gravity is acting on either body. and we need the forces to balance out. What it boils down to is the following simple Mathematical statement: w1d1 = w2d2 where Wi is the weight of a object and Di is that object's distance from the center of the seesaw."
// formula1	"T = F × L"