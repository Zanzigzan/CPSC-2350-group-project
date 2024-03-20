import React, {useState} from 'react'

export default function QuizDisplay(props) {
    const [questionNum, setQuestionNum] = useState(1);
    const [question, setQuestion] = useState('Lorem ipsum dolor sit amet consectetur?');
    const [loading, setLoading] = useState(true);
    const [curQuestion, setCurQuestion] = useState();
    const [toggle, setToggle] = useState(false);
    const [select, setSelect] = useState(false);

    function handleNext() {
        setQuestionNum(questionNum + 1);
        setCurQuestion(getQuestion());
        setSelect(false);
        setToggle(false);
    }

    function handleSelect() {
        if (!select) {
            setSelect(true);
            setToggle(true);
        }
    }

    // temp function
    function getQuestion() {
        return {
            thisQuestion: "Lorem ipsum dolor sit amet consectetur?",
            optiona: "A. Lorem",
            optionb: "B. Ipsum",
            optionb: "C. Dolor",
            optionb: "D. Sit",
            answer: "C. Dolor"
        };
    }

    return (
        <>
            <div className='bg-blue-400 rounded border border-black text-white p-7 space-y-5' >
                <h1 className='font-bold text-lg'>Question {questionNum}</h1>
                <h1 className='text-3xl'>{question}</h1>
                <div className='grid grid-cols-2 gap-1'>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>A. Lorem</button>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>B. Ipsum</button>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>C. Dolor</button>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>D. Sit</button>
                </div>
                <button className={`bg-white hover:bg-blue-200 text-blue-400 font-bold text-lg p-2 rounded ${toggle ? 'visible' : 'invisible'}`} onClick={handleNext}>Next</button>
            </div>
        </>
    );
}
