import { useState } from 'react';
import useQuizSolve from "../hooks/useQuizSolve.ts";

export default function LearnQuiz() {
    const { quiz, currentIndex, nextLearn,prevLearn, validateAnswer, resetQuiz } = useQuizSolve();
    const [selectedAnswer, setSelectedAnswer] = useState<string>();
    const [correctAnswer, setCorrectAnswer] = useState<string>();
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>();

    const handleAnswerClick = (answerKey: string) => {
        const isCorrect: boolean = validateAnswer(answerKey);
        setSelectedAnswer(answerKey);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setCorrectAnswer(Object.keys(quiz[currentIndex].answers).find(key => quiz[currentIndex].answers[key].isCorrect));
        setIsAnswerCorrect(isCorrect);
    };

    const getAnswerClass = (answerKey: string) => {
        if (selectedAnswer === null) return '';
        if (answerKey === correctAnswer) return 'bg-yellow-500';
        if (answerKey === selectedAnswer) return isAnswerCorrect ? 'bg-green-500' : 'bg-red-500';
        return '';
    };

    return (
        <div className="p-2 gap-4 w-full h-full flex flex-col justify-center items-center md:p-12">
            <div className="w-full h-1/3 flex flex-col justify-center items-center border-2 border-black pointer-events-none">
                <h1 className="text-2xl text-center">{quiz[currentIndex].question}</h1>
            </div>

            <div className="gap-4 w-full h-full text-center grid grid-cols-1 md:grid-cols-2">
                {quiz[currentIndex].answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`flex flex-col justify-center items-center cursor-pointer border-2 border-black ${getAnswerClass(Object.keys(answer)[0])}`}
                        onClick={() => handleAnswerClick(Object.keys(answer)[0])}>
                        <p className="text-2xl w-full rounded-xl">{Object.values(answer)[0]}</p>
                    </div>
                ))}
            </div>
            <div className="gap-1 w-full flex flex-row">
                <button onClick={() => {
                    prevLearn();
                    setSelectedAnswer(undefined)
                }} className="w-full h-12 border-2 border-black rounded-xl">Prev
                </button>
                <button onClick={() => {
                    nextLearn();
                    setSelectedAnswer(undefined)
                }} className="w-full h-12 border-2 border-black rounded-xl">Next
                </button>
            </div>
            <p>{currentIndex + 1}/{quiz.length}</p>
            <button onClick={() => {
                setSelectedAnswer(undefined);
                resetQuiz()
            }} className="w-full h-12 border-2 border-black rounded-xl">Back to Menu
            </button>
        </div>
    );
}
