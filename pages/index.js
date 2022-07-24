import { SearchIcon, DotsVerticalIcon } from "@heroicons/react/outline";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-between bg-green-600 text-white text-xl py-2.5 px-2.5 font-semibold">
      <h1>WhatsApp</h1>
      <div className="flex flex-row space-x-1">
        <SearchIcon className="h-7 hoverEffect"/>
        <DotsVerticalIcon className="h-7 hoverEffect"/>
      </div>
    </div>
    {chats.map(chat => 
      <div className="flex flex-row items-center p-2 hover:bg-green-100 space-x-2 h-10">
        <img className="w-8 rounded-full" src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col justify-center space-y-0">
            <h1 className="text-sm font-semibold leading-tight">{chat.name}</h1>
            <span className="text-xs leading-tight">{chat.last_mes}</span>
          </div>
          <div className="flex fles-col">
            <span className="text-xs">{chat.time}</span>
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