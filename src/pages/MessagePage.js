import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {SideNav} from '../components/UI/SideNav';
import useInput from '../hooks/use-input';


import { GrTechnology } from "react-icons/gr";

import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';
export const socket = io(URL);


const MessagePage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [event, setevent] = useState([]);
  const [roomState, setRoomState ] = useState('room1');
  const [roomIndex, setRoomIndex] = useState(0) 
  const [toggleSideNav, setToggleSideNav] = useState(false);

  const user = useSelector(state => state?.auth?.user);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit('join', roomState);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log(value)
      setevent(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onFooEvent);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  const {
        value: messageInput,
        // isValid: courseNameisValid,
        // hasError: courseNameHasError,
        valueChangeHandler: courseNameChangeHandler,
        // inputBlurHandler: courseBlurHandler,
        rest: restMessageInput,
      } = useInput((value) => value.trim() !== "");
    

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(messageInput)  
    socket.emit('message', {msg: messageInput, room: roomState, name: user.currentUsername, profileImage:user.profileImage});    
    restMessageInput();
  }

  const handleJoin = (room) => {
    console.log(room)
    setRoomState(room)
    socket.emit('join', room);    
  }
  
  const rooms = ['room1'];

  return (
    <div className="flex"> 
    <button onClick={() => setToggleSideNav(!toggleSideNav)} type="button" class="absolute inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <div className={`w-80 border-r-2 border-gray-100  fixed z-30 bg-white h-full ${toggleSideNav ? 'translate-x-[0]' : 'translate-x-[-100%]'}`}>
          <SideNav setToggleSideNav={setToggleSideNav} toggleSideNav={toggleSideNav}/>
        </div>
       <div className='w-full md:main bg-gray-50 md:flex mt-10'>

          <div className='md:w-1/3 border-r-2'>
              {rooms.map( (room, index ) =>
                 <div key={index} className={`p-4 w-full border-b-2 cursor-pointer flex items-center hover:bg-gray-200 ${roomIndex === index ? 'bg-gray-200': ''}`} onClick={() => {handleJoin(room); setRoomIndex(index)}}>
                  <div className="text-3xl p-2 bg-green-400 mr-2 rounded-md"><GrTechnology className="fill-green-800"/></div> 
                  <div className=''>
                    <h3 className="text-sm text-gray-800">{room}</h3>
                    <h3 className='text-xs text-gray-600'rounded>this is the name of the course</h3>
                  </div>
              </div>
              )}

          </div>
          <div className='p-8 w-full'>  
              <div className='border-b-2'>
                <h2 className='p-4 text-gray-800'>{`Your are now in chat room ${roomIndex + 1}`}</h2>
              </div>

              <ul className='h-[70vh] p-10 overflow-y-scroll flex flex-col'>
                  {event.map((message, index) =>  
                  <li key={index} class={`flex items-start  gap-2.5 ${user.currentUsername === message.content.name ? 'self-start': 'self-end flex-row-reverse'}`}>
                    <img class="h-12 w-12 bg-center bg-cover rounded-full ml-4 bg-green-400" src={message.content.profileImage} alt="profile picture"/>
                  <div class="flex flex-col gap-1 w-full max-w-[500px] ">
                        <div class={`flex items-center space-x-2 ${user.currentUsername === message.content.name ? 'justify-start': 'justify-end'}`}>
                          <span class={`text-sm font-semibold text-gray-900 `}>{message.content.name}</span>
                          {/* <span class="text-sm font-normal text-gray-500 ">{Date.now()}</span> */}
                        </div>
                        <div class={`flex flex-col leading-1.5 p-4 border-gray-200  ${user.currentUsername === message.content.name ? 'bg-gray-200 rounded-br-lg rounded-r-lg rounded-bl-lg': 'bg-green-200 rounded-b-lg rounded-bl-lg rounded-l-lg'}`} >
                          <p class="text-sm font-normal text-gray-900 ">{message.content.msg}</p>
                        </div>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>
                  </li>)}
              </ul>
        
              <form onSubmit={onSubmit} className="flex items-center p-4 border-t-2 w-full">
                <label className="text-sm mr-4 h-12 w-4/5">
                <input
                    type="text"
                    id=""
                    value={messageInput}
                    onChange={courseNameChangeHandler}
                    placeholder="type to send a message"
                    className={"bg-gray-100 text-gray-500 h-full w-full border-none outline-none p-4 rounded-md focus:text-black"}
                />
                </label>
                <button className="bg-black px-8 py-2 text-white rounded-md" type='submit'>send</button>
              </form>
            </div>
        </div>
    </div>
  );
}

export default MessagePage;