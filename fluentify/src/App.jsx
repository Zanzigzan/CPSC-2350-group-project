
import React, {useState} from 'react';
import GenerateText from './components/GenerateText';
import SelectFile from './components/SelectFile';
import Or from './components/Or';
import Logo from './components/Logo';
import MainHeader from './components/MainHeader';
import './index.css'
import MainPageModal from './components/MainPageModal';
import InstructionModal from './components/InstructionModal';



function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='ml-auto mr-auto mr-container text-center w-4/5 h-screen p-4 rounded flex flex-col'>

        <div className='mt-2'>
            <Logo/>
        </div>

        <div className='mt-4 mb-6'>
            <MainHeader setShowModal={setShowModal}/>
        </div>
        
          
      <div className='flex flex-row mt-6 mb-20 justify-center gap-28'>
          <SelectFile setIsOpen={setIsOpen} setError={setError} setLoading={setLoading} loading={loading} />
          <Or/>
          <GenerateText setIsOpen={setIsOpen} setError={setError} setLoading={setLoading} loading={loading} />
      </div>
      <MainPageModal isOpen={isOpen} setIsOpen={setIsOpen} error={error} setError={setError} />
      <InstructionModal showModal={showModal} setShowModal={setShowModal} onClose={setShowModal}/>

    </div>
  )
}

export default App
