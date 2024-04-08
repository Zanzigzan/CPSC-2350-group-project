import React from "react";

export default function QuizOption(props) {

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            props.handleSelect(props.id);
        }
    }

  return (
    <>
        <div
        className={`${props.option.style} ${props.select ? "" : "hover:bg-blue-100 cursor-pointer"} font-bold text-lg p-3 rounded flex items-center justify-between h-full`}
        onClick={() => props.handleSelect(props.id)}
        onKeyDown={handleKeyDown}
        tabIndex={props.select ? -1 : 0}
        aria-label={props.value}
        >
            <div className="flex-grow text-center text-2xl">{props.value}</div>
            <div className="font-outline text-2xl">{props.option.icon}</div>
        </div>
    </>
  );
}
