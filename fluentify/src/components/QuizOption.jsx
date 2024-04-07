import React from "react";

export default function QuizOption(props) {
  return (
    <>
        <div
        className={`${props.select ? "" : "hover:bg-blue-100 cursor-pointer"} ${props.option.style}`}
        onClick={() => props.handleSelect(props.id)}
        >
            <div className="absolute left-10 text-xs">{props.option.text}</div>
            <div>{props.value}</div>
            {props.option.icon ? <img src={props.option.icon} alt={`Icon of ${props.option.text} answer`} className="absolute right-5"/> : <></>}
        </div>
    </>
  );
}
