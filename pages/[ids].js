import {useRouter} from 'next/router';
import { ArrowSmLeftIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp  } from "firebase/firestore";
import {db} from '../firebase-config';



export default function Chat({user, contacts}) {
  
  const router = useRouter();
  const { ids } = router.query;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [messages, setMessages] = useState(messaging);
  const [input, setInput] = useState('');
  const [disBut, setDisBut] = useState(false);

  
  

  const sendMes = async (e) => {
    e.preventDefault();
    setDisBut(true);
    const docRef = await addDoc(collection(db, "messages"), {
      from: user.phoneNumber,
      to: ids,
      text: input,
      timestamp: serverTimestamp(),
    });

    setInput('');
    setDisBut(false);
  }

    return (
      <div className='flex flex-col h-[100vh] bg-auto bg-center' style={{background: "url('images/bg-chat1.png')"}}>
        <div className='flex flex-none items-center bg-green-600 text-white pr-2.5 pl-1.5 h-[48px] space-x-1.5'>
          <ArrowSmLeftIcon className='h-7 hoverEffect' onClick={() => router.push('/')}/>
          <div className='flex flex-grow items-center space-x-2'>
            <img className="w-7 rounded-full" src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />
            <h1 className='font-semibold'>{contacts.find(({phone}) => phone == ids).name}</h1>
          </div>
          <DotsVerticalIcon className="h-7 hoverEffect"/>
        </div>
        <div id='boten' className='flex flex-grow flex-col-reverse overflow-y-scroll py-1' onScroll={(e) => setScrollPosition(e.target.scrollTop)}>
          {messages.map((mess) =>
            <div className={`flex w-full ${mess.me ? 'justify-start' : 'justify-end'}`}>
                <div 
                  className={`${mess.me ? 'bg-green-300' : 'bg-white'} 
                  rounded-full py-1 px-4 mx-2 my-1 w-fit`}
                >
                  {mess.text}
                </div>
            </div>
          )}
        </div>
        <form className='p-2 pt-0 flex flex-row' onSubmit={sendMes}>
          <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Message' className='w-full h-10 rounded-full px-4' />
          <button disabled={!input.trim() || disBut} type='submit' className='bg-green-500 disabled:opacity-50 rounded-full text-white w-10 h-10 flex justify-center items-center hover:bg-green-400'><PaperAirplaneIcon className='h-6 rotate-90' /></button>
        </form>
      </div>
    )
}


var messaging = [
  { 
    from: '',
    to: '',
    text: 'hello good morning',
    me: true
  },
  {
    text: 'yes, its a nice morning',
    me: false
  },
  {
    text: 'lets play footbol',
    me: false
  },
  {
    text: 'yes! i am in',
    me: true
  },
]

messaging = messaging.reverse();
  