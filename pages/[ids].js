import {useRouter} from 'next/router';
import { ArrowSmLeftIcon, DotsVerticalIcon, PhotographIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useState, useEffect, useRef } from 'react';
import { addDoc, collection, serverTimestamp, updateDoc, doc  } from "firebase/firestore";
import {db, storage} from '../firebase-config';
import { getDownloadURL, uploadString, ref } from "firebase/storage";



export default function Chat({user, contacts, dataMessages}) {
  const router = useRouter();
  const { ids } = router.query;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [input, setInput] = useState('');
  const [disBut, setDisBut] = useState(false);
  const [currentMess, setCurrentMess] = useState([]);
  const [slectedFile, SetSlectedFile] = useState(null);
  const filePickerRef = useRef(null)

  useEffect(() => {
    setCurrentMess(dataMessages.filter((m) => (m.data().from == user.phoneNumber && m.data().to == ids) || (m.data().from == ids) ));
  }, [dataMessages])

  //////
  

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
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (slectedFile) {
      await uploadString(imageRef, slectedFile, 'data_url').then(async() => {
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);
        await updateDoc(doc(db, 'messages', docRef.id), {
          image: downloadURL,
        })
      })
    }

    SetSlectedFile(null);
    
    setDisBut(false);
  }


  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      SetSlectedFile(readerEvent.target.result);
    }
  };






    var name = ids;
    if (contacts.length > 0) {
      name = contacts.find(({phone}) => phone == ids).name;
    }
    

    return (
      <div className='flex flex-col h-[100vh] bg-auto bg-center' style={{background: "url('images/bg-chat1.png')"}}>
        <div className='flex flex-none items-center bg-green-600 text-white pr-2.5 pl-1.5 h-[48px] space-x-1.5'>
          <ArrowSmLeftIcon className='h-7 hoverEffect' onClick={() => router.push('/')}/>
          <div className='flex flex-grow items-center space-x-2'>
            <img className="w-7 rounded-full" src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />
            <h1 className='font-semibold'>{name}</h1>
          </div>
          <DotsVerticalIcon className="h-7 hoverEffect"/>
        </div>
        <div id='boten' className='flex flex-grow flex-col-reverse overflow-y-scroll py-1' onScroll={(e) => setScrollPosition(e.target.scrollTop)}>
          {currentMess.map((mess) =>
            <div key={mess.id} className={`flex w-full ${mess.data().from == user.phoneNumber ? 'justify-start' : 'justify-end'}`}>
                <div 
                  className={`${mess.data().from == user.phoneNumber ? 'bg-green-300' : 'bg-white'} 
                  rounded-xl mx-2 my-1 w-fit py-1 px-1`}
                >
                  {mess.data().image && <img className='rounded-xl w-fit' src={mess.data().image} />}
                  {mess.data().text != '' && <span className='mx-1'>{mess.data().text}</span>}
                  

                </div>
            </div>
          )}
        </div>
        <form className='p-2 pt-0 flex flex-row' onSubmit={sendMes}>
          <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Message' className='w-full h-10 rounded-full px-4' />
          <div className="" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className={`${slectedFile && 'bg-red-500'} h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100`} />
              <input 
                  onChange={addImageToPost} 
                  type='file' 
                  hidden
                  ref={filePickerRef} />
          </div>
          <button disabled={!disBut && !input.trim() && !slectedFile } type='submit' className='bg-green-500 disabled:opacity-50 rounded-full text-white w-10 h-10 flex justify-center items-center hover:bg-green-400'><PaperAirplaneIcon className='h-6 rotate-90' /></button>
        </form>
      </div>
    )
}

