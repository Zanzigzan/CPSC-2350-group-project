import React from 'react'
import { useState, useEffect } from 'react';


const MainHeader = (props) => {
  const Typewriter = ({ text, delay, infinite }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      let timeout;
  
      if (currentIndex <= text.length) {
        timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);
      } else if (infinite) { 
        setCurrentIndex(0);
        setCurrentText('');
      }
      return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);
  
    return <span>{currentText}</span>;
  };

  function handleClick(){
    props.setShowModal(true);
  }


  return (
    <div className='bg-blue-400 py-10 space-x-6'>
        <div className='h-12 mb-16 mt-0 text-white text-5xl font-medium leading-tight text-primary'> <Typewriter text="Find Your Fluent" delay={150} infinite/></div>
        <div className='text-2xl text-white qleading-tight'>Improve your vocabulary by reading in your target language</div>
        <div className='mt-10'>
          <button className='bg-white hover:text-blue-400 text-black text-lg font-bold py-2 px-4 rounded' onClick ={handleClick}>
              Check How It Works
          </button>
        </div>
    </div>
    
  )
}

export default MainHeader