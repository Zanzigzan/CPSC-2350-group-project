import React, {useState} from 'react'
import { getTextFromFile } from '../api/getTextFromFile';
import { useLanguage } from '../context/LanguageContext';

const SelectFile = (props) => {
    const [reading, setReading] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const { setText } = useLanguage();

    function handleFileChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        e.target.value = null;
    }

    const showFileName = () => {
        return selectedFile ? selectedFile.name : 'Choose a file';
      };

    function handleSubmit() {
        if (props.loading) return;
        if (!selectedFile) {
            props.setError("Please select a file.");
            props.setIsOpen(true);
        } else {
            setTextContext();
        }
    }

    async function setTextContext() {
        props.setLoading(true);
        setReading(true);

        getTextFromFile(selectedFile)
            .then((readText) => {
                setText(readText);
            })
            .catch((e) => {
                props.setError(e.message);
            }).finally(() => {
                setSelectedFile(null);
                setReading(false)
                props.setIsOpen(true);
                props.setLoading(false);
            });
    }

  return (
    <div className='w-2/6 h-96 space-y-8 p-4'>
        <div className='text-3xl font-medium'>
            Select Your Own Text
        </div>
        <div className="items-center justify-center bg-grey-lighter">
            <label className="h-40 flex flex-col items-center justify-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-lg leading-normal">{showFileName()}</span>
                <input type='file' className="hidden" onChange={handleFileChange} accept='.txt'/>
            </label>
            {
                reading ?
                (
                    <div className={'mt-2 text-blue-400 flex justify-center transform -translate-x-3'}>
                    <svg className='mr-3 h-5 w-5 animate-spin text-blue-400' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Reading File...
                    </div>
                )
                :
                <div className='mt-2 text-blue-400'>Please upload file in the .txt format</div>
            }
        </div> 
        
        <button className="bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 pl-6 pr-6 rounded-full" onClick={handleSubmit}>
            Submit
        </button>
        
    </div>
    

  )
}

export default SelectFile