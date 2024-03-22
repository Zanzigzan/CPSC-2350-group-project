import React from 'react'
import { useState, useEffect } from 'react';

const MainHeader = () => {
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
  
      } else if (infinite) { // ADD THIS CHECK
        setCurrentIndex(0);
        setCurrentText('');
      }
  
      return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);
  
    return <span>{currentText}</span>;
  };
  

  return (
    <div className='bg-blue-400 py-20'>
        <div className='h-12 mb-8 mt-0 text-white text-5xl font-medium leading-tight text-primary'> <Typewriter text="Find Your Fluent" delay={150} infinite/></div>
        <div className='text-2xl text-white qleading-tight'>Improve your vocabulary by reading in your target language</div>
    </div>
    
  )
}

export default MainHeader