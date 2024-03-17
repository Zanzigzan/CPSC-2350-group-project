import React, {useState, useContext} from 'react'

const LanguageContext = React.createContext();

export function useLanguage() {
    return useContext(LanguageContext);
}

export function LanguageProvider(props) {
    const [language, setLanguage] = useState();

    const value = {
        language, 
        setLanguage
    }

    return (<LanguageContext.Provider value={value}>{props.children}</LanguageContext.Provider>)
}