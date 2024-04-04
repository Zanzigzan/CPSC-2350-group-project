import React, { useState, useContext } from "react";

const LanguageContext = React.createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider(props) {
  const [language, setLanguageState] = useState(localStorage.getItem("language") || "");
  const [text, setTextState] = useState(localStorage.getItem("text") || "");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");

  const setLanguage = (newLanguage) => {
    localStorage.setItem("language", newLanguage);
    setLanguageState(newLanguage);
  }

  const setText = (newText) => {
    localStorage.setItem("text", newText);
    setTextState(newText);
  }

  const value = {
    language,
    setLanguage,
    text,
    setText,
    translatedText,
    setTranslatedText,
    sourceLanguage,
    setSourceLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
}
