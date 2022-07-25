import { SearchIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import {useRouter} from 'next/router';


export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between bg-green-600 text-white text-xl pr-2.5 pl-3 h-[48px] font-semibold">
        <h1>WhatsApp</h1>
        <div className="flex flex-row space-x-1">
          <SearchIcon className="h-7 hoverEffect"/>
          <DotsVerticalIcon className="h-7 hoverEffect"/>
        </div>
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