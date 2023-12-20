'use client'

import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import { errorToast, successToast } from '@/components/Toast';
import { useRouter } from "next/navigation";

export default function Form() {

    const router = useRouter();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');


    /**CREATE NEW ROOM */
    const createNewRoom = (e) => {
        e.preventDefault();
        const newRoomId = uuidv4();

        setRoomId(newRoomId);
        successToast('New room created !');

    }

    /**JOIN ROOM */
    const joinRoom = (e) => {
        e.preventDefault();
        if(roomId === '' || username === ''){
            errorToast('Please fill all the fields !');
            return;
        }
        router.push(`/editor/${roomId}/${username}`,{
            //passing data from one route to another
            state: {
                roomId: roomId,
                username: username
            }
        });
    }

    return (
        <div className="min-w-[25rem] w-[70%] h-[70vh] bg-secondary flex flex-col items-center justify-center
            rounded-md">
            <div className="container w-[20rem] flex flex-col items-center justify-center
            gap-4 px-4 pt-6 pb-8 rounded-md bg-bg shadow-darkshadow">
                <div className="header mb-4">
                    <h1 className="title font-extrabold text-4xl text-white text-center">Real-T</h1>
                    <p className="font-medium text-light">A real time coding editor</p>
                </div>
                <form className="min-w-[15rem] flex flex-col  justify-center gap-2">
                    <p className="text-xs text-gray-400 italic mb-1">Paste invitation ROOM ID</p>
                    <input className="px-3 py-2 rounded-md bg-gray-400 shadow-lightshadow outline-none text-black mb-2 caret-black placeholder-gray-200 place" 
                            type="text" 
                            placeholder="ROOM ID" 
                            onChange={(e) => setRoomId(e.target.value)}
                            value={roomId}
                    />
                    <input className="px-3 py-2 rounded-md bg-gray-400 shadow-lightshadow outline-none text-black caret-black mb-5 placeholder-gray-200 place" 
                            type="text" 
                            placeholder="USERNAME"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                    />
                    <button className="px-2 py-2 rounded-md bg-white shadow-lightshadow outline-none font-bold text-black caret-white 
                        hover:bg-light duration-300"
                        onClick={joinRoom}
                        >JOIN
                    </button>
                    <div className="mt-2">
                        <div className="text-light text-xs">Don't have an invite ? Create room.{' '}
                        <a onClick={createNewRoom}>
                            <span className="text-blue-400 text-xs hover:text-blue-600 cursor-pointer underline hover:no-underline"
                                > 
                                Click here
                            </span>
                        </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}