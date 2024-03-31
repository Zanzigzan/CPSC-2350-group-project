import React, { useState } from 'react'
import { generateText } from '../api/openai';
import { useLanguage } from '../context/LanguageContext';

const GenerateText = (props) => {
  const { setText } = useLanguage();
  const [generating, setGenerating] = useState(false);

  async function handleClick(difficulty) {
    if (props.loading) return;
    props.setLoading(true);
    setGenerating(true);

    try {
      const currentText = await generateText(difficulty);
      setText(currentText);
    } catch (e) {
      props.setError(e.message);
    } finally {
      setGenerating(false);
      props.setIsOpen(true);
      props.setLoading(false);
    }

  }

  return (
    <div className='w-2/6 h-96 space-y-14 p-4'>
      <div className='text-3xl font-medium'>
        Generate Text
      </div>
      <p className='text-lg'>Choose a level of difficulty</p>
      <div className='flex text-center justify-center space-x-9 border-black border-2 rounded-lg shadow-lg px-4 py-14'>
        <button className='bg-green-400 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('easy')}>Easy</button>
        <button className='bg-yellow-400 hover:bg-yellow-700 text-white text-lg  font-bold py-2 px-4 rounded' onClick={() => handleClick('medium')}>Average</button>
        <button className='bg-red-400 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('hard')}>Hard</button>
        <div className={`${generating ? 'visible' : 'invisible'} absolute bottom-2 text-blue-400 flex transform -translate-x-7`}>
          <svg className='mr-3 h-5 w-5 animate-spin text-blue-400' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </div>
      </div> 
    </div>
  )
}

export default GenerateText