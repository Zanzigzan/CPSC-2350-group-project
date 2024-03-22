import React from 'react'
import { useState, useEffect } from 'react';

const MainHeader = () => {

  const Typewriter = ({ text, delay }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Typing logic goes here
    useEffect(() => {
      const typingInterval = setInterval(() => {
        setCurrentText(prevText => {
          const nextIndex = (prevText.length + 1) % text.length;
          return text.substring(0, nextIndex);
        });
      }, delay);
  
      return () => clearInterval(typingInterval);
    }, [delay, text]);
  
    return <span>{currentText}</span>;
  };

  return (
    <div className='bg-blue-400 py-20'>
        <div className='h-12 mb-8 mt-0 text-white text-5xl font-medium leading-tight text-primary'> <Typewriter text="Find Your Fluent" delay={100} /></div>
        <div className='text-2xl text-white qleading-tight'>Improve your vocabulary by reading in your target language</div>
    </div>
    
  )
}

export default MainHeader