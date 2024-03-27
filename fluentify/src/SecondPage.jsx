import React from "react";
import { Link } from "react-router-dom";
import TranslatedText from "./components/TranslatedText";
import Logo from "./components/Logo";
import QuizDisplay from "./components/QuizDisplay";

const SecondPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center pl-8 pr-8">
        <Link to="/"> {/* Link to the root route */}
          <Logo />
        </Link>
        <div className="flex">
          <Link
            to="/"
            className="bg-red-700 hover:bg-red-900 text-white text-lg font-bold py-2 px-4 rounded"
          >
            Click Here to Exit
          </Link>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="w-3/4 p-4 px-8 pb-8">
          <TranslatedText />
        </div>
        <div className="w-1/4 p-4 px-8 pb-8 md:100svh">
          <QuizDisplay />
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
