import React, { useContext } from "react";
import { useLanguage } from "../context/LanguageContext";

const TranslatedText = () => {
  const { translatedText } = useLanguage();

  return (
    <div className="flex">
      <div className="border-4 border-black rounded-lg h-screen p-4 overflow-auto"> 
      {/**check if this is right before applying typing effect */}
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default TranslatedText;