import React, {useState, useEffect} from 'react'

export default function QuizDisplay(props) {
    const [questionNum, setQuestionNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [curQuestion, setCurQuestion] = useState({});
    const [toggle, setToggle] = useState(false);
    const [select, setSelect] = useState(false);

    useEffect(() => {
        console.log('loading');
        const temp = getQuestion();
        setCurQuestion(temp);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
        console.log("loaded");
        console.log(curQuestion.question);
    
        return () => clearTimeout(timer);
      }, []);

    function handleNext() {
        setQuestionNum(questionNum + 1);
        setLoading(true);
        setCurQuestion(getQuestion());
        setLoading(false)
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
            question: "Lorem ipsum dolor sit amet consectetur?",
            optiona: "A. Lorem",
            optionb: "B. Ipsum",
            optionc: "C. Dolor",
            optiond: "D. Sit",
            answer: "C. Dolor"
        };
    }

    return (
        <>
            <div className='bg-blue-400 rounded border border-black text-white p-7 space-y-5' >
                {loading ? <div>Loading...</div> 
                : 
                ( 
                <div>
                <h1 className='font-bold text-lg'>Question {questionNum}</h1>
                <h1 className='text-3xl'>{curQuestion.question}</h1>
                <div className='grid grid-cols-2 gap-1'>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>{curQuestion.optiona}</button>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>{curQuestion.optionb}</button>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>{curQuestion.optionc}</button>
                    <button className={`bg-white ${select ? '' : 'hover:bg-blue-200'} text-blue-400 font-bold text-lg p-2 rounded`} onClick={handleSelect}>{curQuestion.optiond}</button>
                </div>
                <button className={`bg-white hover:bg-blue-200 text-blue-400 font-bold text-lg p-2 rounded ${toggle ? 'visible' : 'invisible'}`} onClick={handleNext}>Next</button> 
                </div>
                )}
            </div>
        </>
    );
}
