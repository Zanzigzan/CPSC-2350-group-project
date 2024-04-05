import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { generateQuiz } from "../api/quiz";
import Spinner from "./Spinner";

export default function QuizDisplay(props) {
  const unSelected =
    "bg-white text-blue-400 font-bold text-lg p-3 rounded flex items-center justify-center h-full";
  const rightAnswer =
    "bg-green-400 text-white font-bold text-lg p-3 rounded flex items-center justify-center h-full";
  const wrongAnswer =
    "bg-red-400 text-white font-bold text-lg p-3 rounded flex items-center justify-center h-full";

  const { translatedText, sourceLanguage } = useLanguage();

  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  const [curQuestion, setCurQuestion] = useState({});

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const [toggle, setToggle] = useState(false);
  const [select, setSelect] = useState(false);

  const [optionA, setOptionA] = useState(unSelected);
  const [optionB, setOptionB] = useState(unSelected);
  const [optionC, setOptionC] = useState(unSelected);
  const [optionD, setOptionD] = useState(unSelected);

  useEffect(() => {
    setLoading(
      generating || props.translating || !sourceLanguage || !translatedText,
    );
  }, [generating, props.translating]);

  useEffect(() => {
    if (!props.translating && sourceLanguage && translatedText) {
      setQuestion();
    }
  }, [props.translating]);

  function handleNext() {
    setQuestionNum(questionNum + 1);
    unselectAll();
    setQuestion();
  }

  function unselectAll() {
    setOptionA(unSelected);
    setOptionB(unSelected);
    setOptionC(unSelected);
    setOptionD(unSelected);
  }

  function handleTryAgain() {
    setError("");
    setQuestion();
  }

  function handleSelect(id) {
    if (!select) {
      setSelect(id);

      const options = ["optiona", "optionb", "optionc", "optiond"];

      for (let i = 0; i < options.length; i++) {
        const answer = curQuestion["answer" + (i + 1)];

        if (id == options[i]) {
          if (answer == curQuestion.correctAnswer) {
            setScore(score + 1);
            setOption(options[i], rightAnswer);
          } else {
            setOption(options[i], wrongAnswer);
          }
        } else if (answer == curQuestion.correctAnswer) {
          setOption(options[i], rightAnswer);
        }
      }

      setToggle(true);
    }
  }

  function setOption(option, value) {
    switch (option) {
      case "optiona":
        setOptionA(value);
        break;
      case "optionb":
        setOptionB(value);
        break;
      case "optionc":
        setOptionC(value);
        break;
      default:
        setOptionD(value);
        break;
    }
  }

  async function setQuestion() {
    if (generating) return;
    setGenerating(true);

    setSelect(false);
    setToggle(false);

    try {
      const question = await generateQuiz(translatedText, sourceLanguage);
      setCurQuestion(question);
    } catch (e) {
      setError("Unable to generate question. Press the button to try again.");
    } finally {
      setGenerating(false);
    }
  }

    return (
        <>
            <div className='col-span-1 bg-blue-400 rounded-lg border-4 border-black text-white p-7 w-full h-full relative min-w-min' >
                {loading ? 
                    (<div className='h-full w-full flex justify-center items-center'>
                        <Spinner size={'100px'} color={'white'} />
                    </div>)
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
                            <div className="flex">
                                <h1 className='font-bold text-lg'>Question {questionNum}</h1>
                                <div className='font-bold text-lg absolute top-7 right-7'>Score: {score}/{questionNum}</div>
                            </div>
                            <h1 className='text-3xl'>{curQuestion.question}</h1>

                            <div className='row-span-4 grid grid-cols-1 gap-8 w-full'>
                                <div className={`${select ? "" : "hover:bg-blue-100 cursor-pointer"} ${optionA}`} onClick={() => handleSelect('optiona')}>{curQuestion.answer1}</div>
                                <div className={`${select ? "" : "hover:bg-blue-100 cursor-pointer"} ${optionB}`} onClick={() => handleSelect('optionb')}>{curQuestion.answer2}</div>
                                <div className={`${select ? "" : "hover:bg-blue-100 cursor-pointer"} ${optionC}`} onClick={() => handleSelect('optionc')}>{curQuestion.answer3}</div>
                                <div className={`${select ? "" : "hover:bg-blue-100 cursor-pointer"} ${optionD}`} onClick={() => handleSelect('optiond')}>{curQuestion.answer4}</div>

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
