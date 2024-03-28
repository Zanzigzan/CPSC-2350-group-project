import React, {useState, useEffect} from 'react'
import { useLanguage } from '../context/LanguageContext';
import { generateQuiz } from '../api/quiz';

export default function QuizDisplay(props) {
    const {translatedText, sourceLanguage} = useLanguage();

    const [questionNum, setQuestionNum] = useState(1);
    const [curQuestion, setCurQuestion] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [toggle, setToggle] = useState(false);
    const [select, setSelect] = useState(false);
    const [selectColor, setSelectColor] = useState('bg-green-400');

    useEffect(() => {
        if (!props.translating && sourceLanguage && translatedText) {
            setQuestion();
        } else if (props.translating) {
            setLoading(props.translating);
        }
    }, [props.translating]);

    function handleNext() {
        setQuestionNum(questionNum + 1);
        setQuestion();
    }

    function handleTryAgain() {
        setError('');
        setQuestion();
    }

    function handleSelect(id) {
        if (!select) {
            setSelect(id);

            if ((id === 'optiona') && (curQuestion.answer1 === curQuestion.correctAnswer)) {
                setSelectColor('bg-green-400');
            } else if ((id === 'optionb') && (curQuestion.answer2 === curQuestion.correctAnswer)) {
                setSelectColor('bg-green-400');
            } else if ((id === 'optionc') && (curQuestion.answer3 === curQuestion.correctAnswer)) {
                setSelectColor('bg-green-400');
            } else if ((id === 'optiond') && (curQuestion.answer4 === curQuestion.correctAnswer)) {
                setSelectColor('bg-green-400');
            } else {
                setSelectColor('bg-red-400');
            }

            setToggle(true);
        }
    }

    async function setQuestion() {
        setLoading(true);

        setSelect(false);
        setToggle(false);

        try {
            const question = await generateQuiz(translatedText, sourceLanguage);
            setCurQuestion(question);
        } catch (e) {
            setError(e.message);
        }

        setLoading(false);
    }

    // temp function
    async function getQuestion() {
        const options = ["Lorem","Ipsum","Dolor","Sit"];
        const index = Math.floor(Math.random() * 4);

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (Math.random() * 100 < 100) {
            throw new Error('testing errors');
        }

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
            <div className='col-span-1 bg-blue-400 rounded border border-black text-white p-7 w-full h-full relative min-w-min' >
                {loading ? 
                    (<div>Loading...</div>)
                    : 
                    (error ? 
                        (<div className='grid h-full'>
                            <div className='text-red-600 text-lg'>{error}</div>
                            <div className='flex justify-center items-end'>
                                <button className={'bg-white hover:bg-blue-100 text-blue-400 font-bold text-lg p-2 rounded'} onClick={handleTryAgain}>Try again.</button> 
                            </div>
                        </div>) 
                        :
                        (<div className='grid gap-7 h-full'>
                            <h1 className='font-bold text-lg'>Question {questionNum}</h1>
                            <h1 className='text-3xl'>{curQuestion.question}</h1>
                            <div className='row-span-4 grid grid-cols-1 gap-3 w-full'>
                                <div className={`${select ? (select == 'optiona' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optiona')}>{curQuestion.answer1}</div>
                                <div className={`${select ? (select == 'optionb' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optionb')}>{curQuestion.answer2}</div>
                                <div className={`${select ? (select == 'optionc' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optionc')}>{curQuestion.answer3}</div>
                                <div className={`${select ? (select == 'optiond' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optiond')}>{curQuestion.answer4}</div>
                            </div>
                            <div>
                                <button className={`bg-white hover:bg-blue-100 text-blue-400 font-bold text-lg p-2 rounded ${toggle ? 'visible' : 'invisible'}`} onClick={handleNext}>Next</button> 
                            </div>
                        </div>)
                    )
                }
            </div>
        </>
    );
}
