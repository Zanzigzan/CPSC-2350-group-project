import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

const TranslatedText = (props) => {
  const { translatedText } = useLanguage();

  return (
    <div className="flex">
      <div className="border-4 border-black rounded-lg h-screen w-full p-4 overflow-auto"> 
        {
          props.translating ?
          <div>Translating...</div>
          :
          (
            props.error ?
            <div className='text-red-600 text-2xl'>{props.error}... Please go back to <Link to='/' className='font-bold underline hover:text-red-900'>Home Page</Link> to try again.</div>
            :
            <p>{translatedText}</p>
          )
        }
      </div>
    </div>
  );
};

export default TranslatedText;
