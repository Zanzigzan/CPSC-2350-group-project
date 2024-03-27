import React from 'react'


const Or = () => {
  return (
    <div className='pt-2 flex flex-col h-96'>
      <div className='flex flex-row items-center justify-center'>
        <div className='h-36 border-r-2 border-blue-400'></div>
        <div className='h-36 border-l-2 border-blue-400'></div>
      </div>
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-400">
        <span className="text-white font-bold text-3xl"> 
          OR
        </span>
      </div> 
      <div className='flex flex-row items-center justify-center'>
        <div className='h-36 border-r-2 border-blue-400'></div>
        <div className='h-36 border-l-2 border-blue-400'></div>
      </div>
    </div>

  )
}

export default Or