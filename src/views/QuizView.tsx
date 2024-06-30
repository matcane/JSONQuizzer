import useQuizSolve from "../hooks/useQuizSolve.ts";

export default function QuizView() {
    const { quiz, isSolved, currentIndex, attempt, nextQuestion, quizSummary, reloadQuiz, resetQuiz } = useQuizSolve();
    return(
        <>
            {isSolved ?
                <div className="w-full h-full gap-4 flex flex-col items-center pointer-events-none">
                    <div className="w-full h-full flex justify-center items-center"><p
                        className="text-5xl w-full border-2 border-black text-center">{quizSummary()} %</p></div>
                    <div className="w-full h-full flex gap-5">
                        <button className="text-2xl w-full border-2 border-black pointer-events-auto hover:border-yellow-500"
                                onClick={() => reloadQuiz()}>Try again
                        </button>
                        <button className="text-2xl w-full border-2 border-black pointer-events-auto hover:border-yellow-500"
                                onClick={() => resetQuiz()}>Quit
                        </button>
                    </div>
                    {quiz.map((question, questionIndex) => (
                        <div key={question.id}
                             className="p-2 gap-4 w-full h-full flex flex-col justify-center items-center md:p-12">
                            <div
                                className="w-full h-full flex flex-col justify-center items-center border-2 border-black rounded-xl">
                                <h1 className="text-xl text-center md:text-2xl">{question.question}</h1>
                            </div>

                            <div className="gap-4 w-full h-full text-center grid grid-cols-1 md:grid-cols-2">
                                {question.answers.map((answer, index) => {
                                    const answerKey = Object.keys(answer)[0];
                                    const isSelectedAnswer = attempt[questionIndex] === answerKey;
                                    const isCorrectAnswer = question.correct_answer === answerKey;
                                    const isIncorrectAnswer = isSelectedAnswer && !isCorrectAnswer;

                                    let answerClass = '';
                                    if (isSelectedAnswer) {
                                        answerClass = isCorrectAnswer ? 'bg-green-300' : 'bg-red-300';
                                    } else if (isIncorrectAnswer) {
                                        answerClass = 'bg-red-300';
                                    } else if (!isSelectedAnswer && isCorrectAnswer) {
                                        answerClass = 'bg-yellow-300';
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={`flex flex-col justify-center items-center border-2 border-black ${answerClass}`}
                                        >
                                            <p className="text-xl w-full rounded-xl md:text-2xl">{Object.values(answer)[0]}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div> :
                <div className="p-2 gap-4 w-full h-full flex flex-col justify-center items-center md:p-12">
                    <div
                        className="w-full h-1/3 flex flex-col justify-center items-center border-2 border-black pointer-events-none">
                        <h1 className="text-2xl text-center">{quiz[currentIndex].question}</h1>
                    </div>

                    <div className="gap-4 w-full h-full text-center grid grid-cols-1 md:grid-cols-2">
                        <div
                            className="flex flex-col justify-center items-center cursor-pointer border-2 border-black"
                            onClick={() => nextQuestion(Object.keys(quiz[currentIndex].answers[0])[0])}>
                            <p className="text-2xl w-full rounded-xl">{Object.values(quiz[currentIndex].answers[0])}</p>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center cursor-pointer border-2 border-black"
                            onClick={() => nextQuestion(Object.keys(quiz[currentIndex].answers[1])[0])}>
                            <p className="text-2xl w-full rounded-xl">{Object.values(quiz[currentIndex].answers[1])}</p>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center cursor-pointer border-2 border-black"
                            onClick={() => nextQuestion(Object.keys(quiz[currentIndex].answers[2])[0])}>
                            <p className="text-2xl w-full rounded-xl">{Object.values(quiz[currentIndex].answers[2])}</p>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center cursor-pointer border-2 border-black"
                            onClick={() => nextQuestion(Object.keys(quiz[currentIndex].answers[3])[0])}>
                            <p className="text-2xl w-full rounded-xl">{Object.values(quiz[currentIndex].answers[3])}</p>
                        </div>
                    </div>
                    <p>{currentIndex + 1}/{quiz.length}</p>
                    <button onClick={() => {
                        resetQuiz()
                    }} className="w-full h-12 border-2 border-black rounded-xl">Back to Menu
                    </button>
                </div>

            }
        </>
    )
}