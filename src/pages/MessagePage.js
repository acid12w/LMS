import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {SideNav} from '../components/UI/SideNav';
import useInput from '../hooks/use-input';

import img4 from '../assets/M-bg.png';
import avatar1 from '../assets/avatar-01.png';
import avatar2 from '../assets/avatar-s-1.png';

// import Swiper core and required modules
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';
export const socket = io(URL);


const MessagePage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [event, setevent] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [roomIndex, setRoomIndex] = useState(1);
  const [currentRoom, setCurrentRoom] = useState("General assemblly") 
  const [toggleSideNav, setToggleSideNav] = useState(false);

  const user = useSelector(state => state?.auth?.user);

  console.log(participants)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit('leave', {name: user.currentUsername});  
      socket.emit('join', {roomID: roomIndex, profileImage: user.profileImage,  name: user.currentUsername});  
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setevent(previous => [...previous, value]);
    }

    function onParticipant(value) {
      setParticipants(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onFooEvent);
    socket.on('participants', onParticipant);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
      socket.off('foo', onParticipant);
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

    if(messageInput.trim() === '') return;

    console.log(messageInput)
    socket.emit('message', {msg: messageInput, room: roomIndex, name: user.currentUsername, profileImage:user.profileImage});    
    restMessageInput();
  }

  const handleJoin = (index, roomName) => {
    setRoomIndex(`room${index+ 1}`);
    setCurrentRoom(roomName);
    socket.emit('join', {roomID: `room${index+ 1}`, profileImage: user.profileImage, name: user.currentUsername});     
  }

  const handleleave = () => {
    socket.emit('leave', {name: user.currentUsername});   
  }

  // const message = roomIndex === event. (<li key={index} class={`flex items-center gap-2.5 ${user.currentUsername === message.content.name ? 'self-start': 'self-end flex-row-reverse'}`}>
  //                   <img class="h-6 w-6 bg-center bg-cover rounded-full ml-4 bg-green-400" src={message.content.profileImage} alt="profile picture"/>
  //                   <div class="flex flex-col gap-1 w-full max-w-[500px] ">
  //                       <div class={`flex items-center space-x-2 ${user.currentUsername === message.content.name ? 'justify-start': 'justify-end'}`}>
  //                         <span class={`text-sm font-semibold text-gray-900 `}>{message.content.name}</span>
  //                         {/* <span class="text-sm font-normal text-gray-500 ">{Date.now()}</span> */}
  //                       </div>
  //                       <div class={`flex flex-col leading-1.5 p-4 border-gray-200 drop-shadow-md  ${user.currentUsername === message.content.name ? 'bg-white rounded-br-lg rounded-r-lg rounded-bl-lg': 'bg-emerald-500 rounded-b-lg rounded-bl-lg rounded-l-lg'}`} >
  //                         <p class="text-sm font-normal text-emerald-950 ">{message.content.msg}</p>
  //                       </div>
  //                       <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
  //                   </div>
  //                 </li>)

  
  const rooms = [{ roomName: 'General assemblly', id: 1 }, { roomName: 'Notice board', id: 2 }];

  return (
    <div className="flex">
      
    <button onClick={() => setToggleSideNav(!toggleSideNav)} type="button" className="left-2 absolute inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <div className={`w-11/12 sm:w-1/4 border-r-2 border-gray-100 fixed lg:relative z-30 bg-gray-100 h-full md:h-auto ${toggleSideNav ? 'translate-x-[0]' : 'translate-x-[-100%]'} lg:translate-x-[0]`}>
          <SideNav setToggleSideNav={setToggleSideNav} toggleSideNav={toggleSideNav}/>
        </div>

       <div className='w-full md:main gap-4 md:flex'>  
       
          <div className='w-full md:w-1/3 px-4 pt-10'>
            <h4 className='my-4'>Our campus</h4>
          <Swiper
          // install Swiper modules
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          // pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          modules={[Pagination, Navigation]}
          className="mySwiper md:hidden mb-4"
        >
           
          {rooms.map( (room, index ) =>
          <SwiperSlide>
                 <div key={index} className={`p-4 w-full flex rounded-lg cursor-pointer items-center hover:bg-gray-100 ${roomIndex === room.id ? 'bg-gray-100': ''}`} onClick={() => {handleleave(); handleJoin(index, room.roomName); }}>
                  <div className="text-3xl p-4 bg-cover bg-center mr-2 rounded-full h-12 w-12" style={{backgroundImage: `url(${avatar1})`}}></div> 
                  <div className=''>
                    <h3 className="text-sm text-gray-800">{room.roomName}</h3>
                    {/* <h3 className='text-xs text-gray-600'rounded>this is the name of the course</h3>   */}
                  </div>
              </div>
              </SwiperSlide>
              )}
        </Swiper>
              {rooms.map( (room, index ) =>
                <div key={index} className={`hidden md:flex p-4 w-full flex rounded-lg cursor-pointer items-center hover:bg-gray-100 ${roomIndex === room.id ? 'bg-gray-100': ''}`} onClick={() => {handleleave(); handleJoin(index, room.roomName); }}>
                  <div className="text-3xl p-4 bg-cover bg-center mr-2 rounded-full h-12 w-12" style={{backgroundImage: `url(${avatar1})`}}></div> 
                  <div className=''>
                    <h3 className="text-xs text-gray-800">{room.roomName}</h3>
                    {/* <h3 className='text-xs text-gray-600'rounded>this is the name of the course</h3>   */}
                  </div>
              </div>
              )}
          </div>

  

          <div className='p-0 sm:px-4 sm:p-8 w-full bg-center bg-cover' style={{
            backgroundImage: `url(${img4})`,
            }}>  
              <div className='px-4 sm:p-0 grid grid-cols-2 mb-4 drop-shadow-sm border-b'>
                <h2 className=' bg-violet-200 py-1 px-2 rounded text-sm text-violet-900 w-max self-center'>{currentRoom}</h2>
                <div className='flex justify-self-end mr-8'>
                  {
                    participants.filter(el => el.roomID === roomIndex).map((participant, index) => {
                     
                      if(index >= 5) return; 
                
                      return (<div key={index} className='p-4 w-4 h-4 bg-center bg-cover rounded-md ml-[-10px] border-4 border-white' style={{
                        backgroundImage: `url(${participant.profileImage})`,
                      }}></div>)
                    }
                    )
                  }
                   {participants.length > 5 && <h3 className='ml-2 p-1 w-[80%] h-10 bg-gray-300 rounded-md text-gray-500 text-lg border-4 border-white'>{` +${participants.length - 5} `}</h3>}
                </div>
              </div>

              <ul className='h-[70vh] sm:p-10 overflow-y-scroll flex flex-col'>
                <h4 className='text-center text-gray-300 pb-6'>Today</h4>
                  {event.filter((message)=> message.content.room === roomIndex).map((message, index) =>  
                  <li key={index} class={`flex items-center gap-2.5 ${user.currentUsername === message.content.name ? 'self-start': 'self-end flex-row-reverse'}`}>
                    <img class="h-6 w-6 bg-center bg-cover rounded-full ml-4 bg-green-400" src={message.content.profileImage} alt="profile picture"/>
                  <div class="flex flex-col gap-1 w-full max-w-[500px] ">
                        <div class={`flex items-center space-x-2 ${user.currentUsername === message.content.name ? 'justify-start': 'justify-end'}`}>
                          <span class={`text-sm font-semibold text-gray-900 `}>{message.content.name}</span>
                          {/* <span class="text-sm font-normal text-gray-500 ">{Date.now()}</span> */}
                        </div>
                        <div class={`flex flex-col leading-1.5 p-4 border-gray-200 drop-shadow-md  ${user.currentUsername === message.content.name ? 'bg-white rounded-br-lg rounded-r-lg rounded-bl-lg': 'bg-emerald-500 rounded-b-lg rounded-bl-lg rounded-l-lg'}`} >
                          <p class="text-sm font-normal text-emerald-950 ">{message.content.msg}</p>
                        </div>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>
                  </li>)}
              </ul>
        
              <form onSubmit={onSubmit} className="m-auto bg-white sm:rounded-lg flex items-center p-2 sm:p-4 w-full drop-shadow-md w-full sm:w-2/3">
                <label className="text-sm mr-4 h-12 w-4/5 border-r-2">
                <input
                    type="text"
                    id=""
                    value={messageInput}
                    onChange={courseNameChangeHandler}
                    placeholder="type to send a message"
                    className={" text-gray-500 h-full w-full border-none outline-none p-4 rounded-md focus:text-black "}
                />
                </label>
                <button className="bg-emerald-600 px-8 py-2 text-white rounded-md ml-4" type='submit'>send</button>
              </form>
            </div>
        </div>
    </div>
  );
}

export default MessagePage;