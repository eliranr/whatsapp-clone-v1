import { SearchIcon, DotsVerticalIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import {useRouter} from 'next/router';
import Papa from "papaparse";
import {useState, useEffect} from 'react';
import {db} from '../firebase-config';
import { addDoc, setDoc, collection, serverTimestamp, doc, updateDoc  } from "firebase/firestore";
import Contacts from "../components/Contacts";


export default function Home({user, contacts}) {
  const router = useRouter();
  const [dropMenu, setDropMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [newContacts, SetNewContacts] = useState(contacts);

  const handleSearch = (e) => {
    SetNewContacts(filterByValue(e.target.value));
  }

  function filterByValue(value) {
    return contacts.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        var listContacts = [];
        for (var i=0; i<results.data.length; i++) {
          var newNum = results.data[i]['Mobile Phone'].replace('-','');
          newNum = newNum.replace(' ','');
          newNum = newNum.replace('-','');
          if (!newNum.includes('+')) {
            newNum = '+972' + newNum;
          }
          if (!listContacts.find(({phone}) => phone == newNum)) {
            listContacts.push(
              {
                name: results.data[i]['First Name'], 
                phone: newNum
              }
            )
          }
        }
        sendPost(listContacts);
      },
    });
  };
  const sendPost = async (listContacts) => {
    const docRef = await setDoc(doc(db, "contacts", user.uid), {
      list: listContacts,
      timestamp: serverTimestamp(),
    })

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
      {!search ? 
        <h1>WhatsApp</h1>
      : 
        <>
        <ArrowSmLeftIcon className='h-7 hoverEffect' onClick={() => setSearch(false)}/>
        <div className="w-full px-3">
          <label htmlFor="input-group-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" htmlFor="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input onChange={handleSearch} type="text" id="input-group-search" className="block p-2 pl-10 w-full text-sm text-gray-900 bg-green-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
          </div>
        </div>
        </>
      }
        <div className="flex flex-row space-x-1">
          {!search &&
            <SearchIcon className="h-7 hoverEffect" onClick={() => setSearch(!search)} />
          }
          <DotsVerticalIcon className="h-7 hoverEffect" onClick={() => setDropMenu(!dropMenu)}/>
        </div>
      </div>

      <div className="relative h-[calc(100vh-48px)] overflow-y-auto">
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

        {!search ? 
          chats.map(chat => 
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
          )
        :
          <Contacts contacts={newContacts} />
        }
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