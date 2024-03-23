import React from 'react'
import { generateText } from '../api/openai';
import { useLanguage } from '../context/LanguageContext';

const GenerateText = (props) => {
  const { setText } = useLanguage();

  async function handleClick(difficulty) {
    props.setLoading(true);

    try {
      const currentText = await generateText(difficulty);
      setText(currentText);
    } catch (e) {
      props.setError(e.message);
    } finally {
      props.setIsOpen(true);
      props.setLoading(false);
    }

  }

  return (
    <div className='h-96 space-y-14 p-4'>
      <div className='text-3xl font-medium leading-tight'>
        Generate Text
      </div>
      <p className='text-lg'>Choose a level of difficulty</p>
      <div className='flex text-center space-x-9 border-black border-2 rounded-lg shadow-lg  px-8 py-14'>
        <button className='bg-green-400 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('easy')}>Easy</button>
        <button className='bg-yellow-400 hover:bg-yellow-700 text-white text-lg  font-bold py-2 px-4 rounded' onClick={() => handleClick('medium')}>Average</button>
        <button className='bg-red-400 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('hard')}>Hard</button>
      </div> 
    </div>
  )
}

export default GenerateText