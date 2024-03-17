
import React from 'react';
import GenerateText from './components/GenerateText';
import SelectFile from './components/SelectFile';
import Or from './components/Or';
import Logo from './components/Logo';
import MainHeader from './components/MainHeader';
import './index.css'


function App() {

  return (
    <container className='ml-auto mr-auto mr-container text-center w-4/5 p-4 rounded flex flex-col'>

        <div className='mt-2'>
            <Logo/>
        </div>

        <div className='mt-4 mb-6'>
            <MainHeader/>
        </div>
          
      <div className='mt-6 mb-20 flex items-center justify-center gap-28'>
          <SelectFile/>
          <Or/>
          <GenerateText/>
      </div>

    </container>
  )
}

export default App
