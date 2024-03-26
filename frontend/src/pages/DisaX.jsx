import React from 'react'
import Leftsidebar from '../components/Leftsidebar'
import Topbar from '../components/Topbar'
import { BsRobot } from 'react-icons/bs'
import Chatcomponent from '../components/Chatcomponent'

const DisaXBot = () => {
  return (
    <div className='bg-bgGradient text-white '>
      <div className=' block md:hidden '><Topbar/></div>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-3 md:px-20 h-[100vh] '>
        <Leftsidebar />
        <div className=''>
          <h2 className='pb-1 md:pb-3 md:p-4 text-lg md:text-xl font-semibold flex flex-row items-center '><BsRobot className='mr-1'/>DisaX</h2>
          <Chatcomponent  />
        </div>
        <div className=' border-l-[1px] border-grey-500 hidden md:block pt-5 '>
          {/* Search btn */}
          <div className='  md:pl-6 '>
              <input className='bg-graylight p-1 md:p-2 border-2 border-graydark rounded-full text-graydark ' type="text" placeholder='🔍Search' />
          </div>
          <div className='bg-graydark min-h-[200px] m-4 rounded-xl '>
            <button className='bg-transparent outline outline-1 outline-black rounded-xl p-2  w-[100%] '> + New Chat</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisaXBot