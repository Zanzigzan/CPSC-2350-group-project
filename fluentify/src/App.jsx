
import React, {useState} from 'react';
import GenerateText from './components/GenerateText';
import SelectFile from './components/SelectFile';
import Or from './components/Or';
import Logo from './components/Logo';
import MainHeader from './components/MainHeader';
import './index.css'
import MainPageModal from './components/MainPageModal';



function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <container className='ml-auto mr-auto mr-container text-center w-4/5 p-4 rounded flex flex-col'>

        <div className='mt-2'>
            <Logo/>
        </div>

        <div className='mt-4 mb-6'>
            <MainHeader/>
        </div>
          
      <div className='flex flex-row mt-6 mb-20 items-center justify-center gap-28'>
          <SelectFile setIsOpen={setIsOpen} setError={setError} setLoading={setLoading} />
    
          <Or/>
          <GenerateText setIsOpen={setIsOpen} />
      </div>
      <MainPageModal isOpen={isOpen} setIsOpen={setIsOpen} error={error} setError={setError} />

    </container>
  )
}

export default App
