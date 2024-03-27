import React from 'react'

const InstructionModal = (props) => { 

    function handleClick(){
        props.setShowModal(false);
    } 

    if(!props.showModal) return null;
    return (
        <div className='fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-[500px] h-[500px] flex flex-col'>
                <button className='place-self-end text-white text-2xl' onClick={handleClick}>X</button> 
                <div className=' bg-white rounded p-2'> 
                    <div className='text-3xl m-6 font-bold'>How to use our App</div>
                    <div className='text-left m-6'>
                        <div className='text-lg font-bold'>Step1: Create an article</div> 
                        <div className='text-md mb-2'>You have 2 ways to do it: upload a .txt file in your chosen language; or choose a level to generate it</div>
                        <div className='text-lg font-bold'>Step2: Choose your target language</div>
                        <div className='text-md mb-2'>Choose the language that you want to learn and click confirm</div>
                        <div className='text-lg font-bold'>Step3: Start the quiz</div>
                        <div className='text-md mb-2'>Wait for the article and quiz in your target language to be loaded, and enjoy the quiz</div>
                    </div>
                    
                </div>
            </div>  
        </div>
    )
}

export default InstructionModal