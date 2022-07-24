import {useRouter} from 'next/router';
import { ArrowSmLeftIcon, DotsVerticalIcon } from "@heroicons/react/outline";



export default function Chat() {
  const router = useRouter();
  const { ids } = router.query;
    return (
      <div className='flex flex-col h-[100vh] bg-auto bg-center' style={{background: "url('images/bg-chat1.png')"}}>
        <div className='flex flex-none items-center bg-green-600 text-white pr-2.5 pl-1.5 h-[48px] space-x-1.5'>
          <ArrowSmLeftIcon className='h-7 hoverEffect' onClick={() => router.push('/')}/>
          <div className='flex flex-grow items-center space-x-2'>
            <img className="w-7 rounded-full" src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />
            <h1 className='font-semibold'>{ids}</h1>
          </div>
          <DotsVerticalIcon className="h-7 hoverEffect"/>
        </div>
        <div className='w-full flex-grow'>
          fdgfgfg
        </div>
        <div className='p-2'>
          <input type='text' placeholder='Message' className='w-full h-8 rounded-full px-4' />
        </div>
      </div>
    )
}
  