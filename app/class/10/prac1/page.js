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
        heading1: "Response of the plant to the direction of lightning",
        description1: "The movement of plants due to gravity is called gravitropism. They also do respond to the light. The aerial parts respond positively and grow towards the light whereas the roots respond negatively and grow backward to light. The movement due to lights is known as phototropism.",
    }
    const [text, setText] = useState(`Today we will discuss about ${theory.heading1}... ${theory.description1}`);


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
                    {/* <h3 className='text-3xl font-semibold mt-5' >Example</h3>
                    <p className='border shadow-md m-2 p-2 px-4 '>{theory.example1}</p>
                    <h3 className='text-3xl font-semibold mt-5' >Formula</h3>
                    <p className='border shadow-md m-2 p-2 px-4 '>{theory.formula1}</p> */}
                </div>
                <div className='w-screen center flex-wrap'>
                    <Link href="/class/11/prac1/3d"><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ">3D Model</button></Link>
                </div>
            </main>
        </div>
    )
}

export default page

// {
//     "heading1": "Response of the plant to the direction of lightning",
//     "description1": "The movement of plants due to gravity is called gravitropism. They also do respond to the light. The aerial parts respond positively and grow towards the light whereas the roots respond negatively and grow backward to light. The movement due to lights is known as phototropism.",
//     "example1": "",
//     "formula1": ""
//   }