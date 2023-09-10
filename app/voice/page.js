"use client"

import { useState, useEffect } from 'react';

const page = () => {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [synthesis, setSynthesis] = useState(null);
    const [voices, setVoices] = useState([]);

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
        if (!text) return;

        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = voices.find((voice) => voice.lang === 'en-US');
        utterThis.rate = .9;
        synthesis.speak(utterThis);
        setIsSpeaking(true);
        utterThis.onend = (event) => {
            setIsSpeaking(false);
            console.log(
                `Utterance has finished being spoken after ${event.elapsedTime} seconds.`,
            );
        };
    };



    return (
        <div>
            <main>
                <h1>Text to Audio Converter</h1>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to convert to audio"
                />
                <select id="voiceSelect"></select>

                <button onClick={speakText} disabled={isSpeaking}>
                    {isSpeaking ? 'Speaking...' : 'Speak'}
                </button>
            </main>
        </div>
    );
};
export default page