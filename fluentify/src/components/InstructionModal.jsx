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
                <div className=' bg-white rounded p-2 '>
                    <div className='text-3xl my-4'>How to use our App</div>
                    <div className='text-lg'>Instruction content goes here</div> 
                </div>
            </div>  
        </div>
    )
}

export default InstructionModal