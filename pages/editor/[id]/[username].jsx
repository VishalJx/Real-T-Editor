// import Navbar from "@/components/Navbar" //future purposes
'use client'

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import '../../../app/globals.css';
import Joiny from "@/components/Joiny";
import { useEffect, useRef, useState } from "react";
import { initSocket } from "@/backend/sockets/socket";
import ACTIONS from "@/backend/sockets/actions";
import { errorToast, successToast } from "@/components/Toast";
import Editor from "@/components/Editor";

export default function editor() {
    const router = useRouter();
    const { id, username: routeUsername } = router.query;
    const [clients, setClients] = useState([]);


    const selectedColor = '#ff0000';

    /*----------Socket.io------------- */
    const socketRef = useRef(null); //after changing state the component do not re-renders
    const codeRef = useRef(null);

    useEffect(()=>{
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(err) {
                console.log('socket error: ', err);
                errorToast('Socket connection failed, try again later');
                router.push('/');
            }
            
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId: id,
                username: routeUsername,
            });

            //Listening for joined event
            socketRef.current.on(ACTIONS.JOINED,
                ({clientsList, username, socketId})=>{
                    // console.log("joined",clients)
                    // console.log("joined",username)
                    // console.log("joined",socketId)
                    if(username !== routeUsername){
                        successToast(`${username} joined the room`);
                        console.log("joined successfullyyyyyyy")
                    }
                    // console.log("username:", username);
                    // console.log("routeName:", routeUsername);
                    setClients(clientsList);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                });

            //Listening for disconnected event
            socketRef.current.on(ACTIONS.DISCONNECTED,
                ({socketId, username})=>{
                    // console.log("disconnected",clients)
                    // console.log("disconnected",username)
                    // console.log("disconnected",socketId)
                    successToast(`${username} left the room`);
                    setClients((prev)=>{
                        return prev.filter(
                            (item)=>item.socketId !== socketId);//filtering out the disconnected user
                    });
                });
           
        }
        init();
    },[id, routeUsername])

    //Copy room id to clipboard
    const copyRoomId = async() => {
        try{
            await navigator.clipboard.writeText(id);
            successToast('Room ID copied to clipboard');
            console.log("copied")
        }
        catch(err){
            errorToast('Failed to copy room ID');
        }
    }

    //Leave room
    const leaveRoom = () => {
        router.push('/');
    }

    // const testSuccessCode=()=>{
    //     successToast('Success MESSAGE TESTING');
    //     toast.success('Success MESSAGE TESTING');
    //     console.log("success")
    // }

    return (
        <div className="w-full h-[100vh]">
            {/* <div>
                <Navbar />
            </div> */}
            <div className="h-[100vh] flex flex-row">
                <div className="Left text-light w-[14rem] h-full
                                flex flex-col gap-3 bg-secondary ">
                    <div className="flex flex-col gap-5 border-b border-gray-600 pb-2 px-3 py-3">
                        <h1 className="text-3xl font-extrabold text-center">RealT</h1>
                    </div>
                    <p className="text-xs italic font-semibold tracking-wider px-3">Participants</p>
                    <div className="px-3 py-3 overflow-x-hidden overflow-y-auto h-full
                                    scrollbar scrollbar-track-[#191339] scrollbar-thumb-[#211743]">
                        <div className="pl-2">
                            {
                                clients.map((item, key) => {
                                    return (
                                        <Joiny uname={item.username} uid={item.socketId} selectedColor={selectedColor} key={key} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 py-4 px-2 bg-black">
                        <button className="bg-bg/90 hover:bg-bg/60 duration-300" onClick={copyRoomId}>Copy Code</button>
                        <button className=" bg-secondary/90 hover:bg-red-400 duration-200" onClick={leaveRoom}>Leave</button>
                    </div>
                </div>

                <div className="Right w-full h-full p-4">
                    <Editor 
                        socketRef={socketRef} 
                        roomId={id} 
                        onCodeChange={(code)=>{
                            codeRef.current = code;
                        }} 
                    />
                </div>
            </div>
        </div>
    );
}
