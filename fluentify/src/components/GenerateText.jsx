import React from 'react'

const GenerateText = () => {
  return (
    <div className='justify-center space-y-12'>
      <div className='text-3xl font-medium leading-tight'>
        Generate Text
      </div>
      <p className='text-lg'>Choose a level of difficulty</p>
      <div className='flex text-center space-x-9 border-black border-2 rounded-lg shadow-lg  px-8 py-14'>
        <button className='bg-green-400 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded'>Easy</button>
        <button className='bg-yellow-400 hover:bg-yellow-700 text-white text-lg  font-bold py-2 px-4 rounded'>Average</button>
        <button className='bg-red-400 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded'>Hard</button>
      </div> 

  </div>
  )
}

export default GenerateText