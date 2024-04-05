import React, { useState } from "react";
import { generateText } from "../api/openai";
import { useLanguage } from "../context/LanguageContext";
import Spinner from "./Spinner";

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
      props.setError("Unable to generate text. Please try again later.");
    } finally {
      setGenerating(false);
      props.setIsOpen(true);
      props.setLoading(false);
    }
  }

  return (
<<<<<<< HEAD
    <div className="w-2/6 h-96 space-y-14 p-4">
      <div className="text-3xl font-medium">Generate Text</div>
      <div className="text-lg">Choose a level of difficulty</div>
      <div className="flex text-center justify-center space-x-9 border-black border-2 rounded-lg px-4 py-14 relative">
        <button
          className="bg-green-400 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded box-shadow: 0 0 0 5px rgba(59, 130, 246, 1.0)"
          style={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
          onClick={() => handleClick("easy")}
        >
          Easy
        </button>

        <button
          className="bg-yellow-400 hover:bg-yellow-700 text-white text-lg font-bold py-2 px-4 rounded box-shadow: 0 0 0 5px rgba(59, 130, 246, 1.0)"
          style={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
          onClick={() => handleClick("medium")}
        >
          Average
        </button>
        <button
          className="bg-red-400 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded box-shadow: 0 0 0 5px rgba(59, 130, 246, 1.0)"
          style={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
          onClick={() => handleClick("hard")}
        >
          Hard
        </button>
        <div className={`${generating ? "invisible" : "visible"} absolute bottom-2 text-red-400 flex transform -translate-x-7`}>
          English is not available for this feature
        </div>
        <div
          className={`${generating ? "visible" : "invisible"} absolute bottom-2 text-blue-400 flex transform -translate-x-7`}
        >
          <Spinner size={"25px"} color={"blue-400"} />
          Generating...
        </div>
        
      </div>
=======
    <div className='w-2/6 h-80 space-y-10 p-4'>
      <div className='text-2xl font-medium'>
        Generate Text
      </div>
      <p className='text-lg'>Choose a level of difficulty</p>
      <div className='flex flex-col justify-center items-center border-black border-2 rounded-lg shadow-lg overflow-hidden'>
        <div className='flex text-center justify-center space-x-7 px-4 pt-12 pb-8 overflow-auto'>
          <button className='bg-green-400 hover:bg-green-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('easy')}>Easy</button>
          <button className='bg-yellow-400 hover:bg-yellow-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('medium')}>Average</button>
          <button className='bg-red-400 hover:bg-red-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={() => handleClick('hard')}>Hard</button>
        </div> 
        <div className={`${generating ? 'visible' : 'invisible'} bottom-2 text-blue-400 flex transform -translate-x-7`}>
          <Spinner size={'25px'} color={'blue-400'}/>
          Generating...
        </div>
      </div>

>>>>>>> main
    </div>
  );
};

export default GenerateText;
