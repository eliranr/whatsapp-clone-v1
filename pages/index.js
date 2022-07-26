import { SearchIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import {useRouter} from 'next/router';
import Papa from "papaparse";
import {useState, useEffect} from 'react';
import {db} from '../firebase-config';
import { addDoc, collection, serverTimestamp, doc, updateDoc  } from "firebase/firestore";


export default function Home({user}) {
  const router = useRouter();
  const [dropMenu, setDropMenu] = useState(false);


  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        var listContacts = [];
        for (var i=0; i<results.data.length; i++) {
          listContacts.push(
            {
              name: results.data[i]['First Name'], 
              phone: results.data[i]['Mobile Phone']
            }
          )
        }
        sendPost(listContacts);
      },
    });
  };


  const sendPost = async (listContacts) => {
    const docRef = await addDoc(collection(db, 'contacts'), {
        uid: user.uid,
        list: listContacts,
        timestamp: serverTimestamp(),
    });
    console.log('upload contact is done');
  };


  return (
    <div>
      <input
        type="file"
        id="file_inp"
        accept=".csv"
        onChange={changeHandler}
        className='hidden'
      />
      <div className="flex items-center justify-between bg-green-600 text-white text-xl pr-2.5 pl-3 h-[48px] font-semibold">
        <h1>WhatsApp</h1>
        <div className="flex flex-row space-x-1">
          <SearchIcon className="h-7 hoverEffect" />
          <DotsVerticalIcon className="h-7 hoverEffect" onClick={() => setDropMenu(!dropMenu)}/>
        </div>
      </div>

      <div className="relative">
        {/* dropMenu */}
        <div id="dropdownDots" className={`${!dropMenu && 'hidden'} absolute right-1 top-1 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            <li>
              <a href="#" onClick={() => document.getElementById('file_inp').click()} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Import Contacts</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</a>
            </li>
          </ul>
        </div>

        {chats.map(chat => 
          <div key={chat.name} onClick={() => router.push(chat.name)} className="flex flex-row items-center px-2 py-2 h-[52px] hover:bg-green-100 space-x-2  cursor-pointer">
            <img className="w-8 rounded-full" src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col justify-center">
                <h1 className="text-sm font-semibold leading-3">{chat.name}</h1>
                <span className="text-xs leading-tight">{chat.last_mes}</span>
              </div>
              <div className="flex flex-col items-end space-y-1 h-full">
                <span className="text-xs">{chat.time}</span>
                {chat.state > 0 && <span className="text-[10px] bg-green-500 rounded-full w-4 h-4 flex items-center justify-center text-white">{chat.state}</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


var chats = [
  {
    name: 'michael',
    img: '',
    last_mes: 'so see you latter!',
    time: '13:28',
    state: 4
  },
  {
    name: 'mital',
    img: '',
    last_mes: 'so see you tommorow!',
    time: '13:28',
    state: 0
  },
]