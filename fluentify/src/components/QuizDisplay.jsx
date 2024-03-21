import React, {useState, useEffect} from 'react'

export default function QuizDisplay(props) {
    const [questionNum, setQuestionNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [curQuestion, setCurQuestion] = useState({});
    const [toggle, setToggle] = useState(false);
    const [select, setSelect] = useState(false);
    const [selectColor, setSelectColor] = useState('bg-green-400');

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
        setLoading(false);
        setSelect(false);
        setToggle(false);
    }

    function handleSelect(id) {
        if (!select) {
            setSelect(id);
            switch(id) {
                case 'optiona':
                    if (curQuestion.optiona == curQuestion.answer) {
                        setSelectColor('bg-green-400');
                    } else {
                        setSelectColor('bg-red-400');
                    }
                    break;
                case 'optionb':
                    if (curQuestion.optionb == curQuestion.answer) {
                        setSelectColor('bg-green-400');
                    } else {
                        setSelectColor('bg-red-400');
                    }
                    break;
                case 'optionc':
                    if (curQuestion.optionc == curQuestion.answer) {
                        setSelectColor('bg-green-400');
                    } else {
                        setSelectColor('bg-red-400');
                    }
                    break;
                default:
                    if (curQuestion.optiond == curQuestion.answer) {
                        setSelectColor('bg-green-400');
                    } else {
                        setSelectColor('bg-red-400');
                    }
                    break;
            }
            setToggle(true);
        }
    }

    // temp function
    function getQuestion() {
        const options = ["A. Lorem","B. Ipsum","C. Dolor","D. Sit"];
        const index = Math.floor(Math.random() * 4);
        return {
            question: `The answer is ${options[index]}`,
            optiona: options[0],
            optionb: options[1],
            optionc: options[2],
            optiond: options[3],
            answer: options[index]
        };
    }

    return (
        <>
            <div className='bg-blue-400 rounded border border-black text-white p-7 space-y-5 w-1/3 h-80 relative' >
                {loading ? <div>Loading...</div> 
                : 
                ( 
                <div>
                <h1 className='font-bold text-lg'>Question {questionNum}</h1>
                <h1 className='text-3xl'>{curQuestion.question}</h1>
                <div className='grid grid-cols-2 gap-1'>
                    <button className={`${select ? (select == 'optiona' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-200'} font-bold text-lg p-2 rounded`} onClick={() => handleSelect('optiona')}>{curQuestion.optiona}</button>
                    <button className={`${select ? (select == 'optionb' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-200'} font-bold text-lg p-2 rounded`} onClick={() => handleSelect('optionb')}>{curQuestion.optionb}</button>
                    <button className={`${select ? (select == 'optionc' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-200'} font-bold text-lg p-2 rounded`} onClick={() => handleSelect('optionc')}>{curQuestion.optionc}</button>
                    <button className={`${select ? (select == 'optiond' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-200'} font-bold text-lg p-2 rounded`} onClick={() => handleSelect('optiond')}>{curQuestion.optiond}</button>
                </div>
                <button className={`bg-white hover:bg-blue-200 text-blue-400 font-bold text-lg p-2 rounded ${toggle ? 'visible' : 'invisible'} absolute bottom-7`} onClick={handleNext}>Next</button> 
                </div>
                )}
            </div>
        </>
    );
}
