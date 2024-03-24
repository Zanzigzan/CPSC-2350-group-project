import React from 'react'

const GenerateText = (props) => {

  function handleClick() {
    props.setIsOpen(true);
  }

  return (
    <div className='w-2/6 h-96 space-y-14 p-4'>
      <div className='text-3xl font-medium'>
        Generate Text
      </div>
      <p className='text-lg'>Choose a level of difficulty</p>
      <div className='flex text-center space-x-9 border-black border-2 rounded-lg shadow-lg px-4 py-14'>
        <button className='bg-green-400 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={handleClick}>Easy</button>
        <button className='bg-yellow-400 hover:bg-yellow-700 text-white text-lg  font-bold py-2 px-4 rounded' onClick={handleClick}>Average</button>
        <button className='bg-red-400 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={handleClick}>Hard</button>
      </div> 
    </div>
  )
}

export default GenerateText