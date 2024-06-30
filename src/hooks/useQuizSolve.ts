import {useQuizStore} from "../store/quizStore.ts";
import {useState} from "react";

export default function useQuizSolve() {
    const [ isSolved, setIsSolved ] = useState(Number(window.sessionStorage.getItem("isSolved")) || 0);
    const [ currentIndex, setCurrentIndex ] = useState(Number(window.sessionStorage.getItem("currentIndex")) || 0);
    const quiz = useQuizStore(state => state.quiz);
    const isLoaded = useQuizStore(state => state.isLoaded);
    const setIsLoaded = useQuizStore(state => state.setIsLoaded);
    const attempt = useQuizStore(state => state.quizAttempt);
    const addAnswer = useQuizStore(state => state.addAnswerToAttempt);
    const resetAttempt = useQuizStore(state => state.restQuizAttempt);
    const clearQuiz = useQuizStore(state => state.clearQuizData);
    const shuffleQuiz = useQuizStore(state => state.shuffleQuiz);

    const quizSummary = () => {
        const correctCount = quiz.reduce((count, question, index) => {
            return count + (question.correct_answer === attempt[index] ? 1 : 0);
        }, 0)
        return ((correctCount / quiz.length) * 100).toFixed(2);

    }

    const nextQuestion = (answer: string) => {
        const updatedCurrentIndex = currentIndex === quiz.length ? currentIndex : currentIndex + 1;
        setCurrentIndex(updatedCurrentIndex);

        const updatedIsSolved = updatedCurrentIndex === quiz.length ? 1 : isSolved;
        setIsSolved(updatedIsSolved);

        const updatedAttempt = [...attempt, answer];
        addAnswer(answer);


        window.sessionStorage.setItem("isLoaded", String(isLoaded));
        window.sessionStorage.setItem("quizAttempt", JSON.stringify(updatedAttempt));
        window.sessionStorage.setItem("isSolved", updatedIsSolved.toString());
        window.sessionStorage.setItem("currentIndex", updatedCurrentIndex.toString());
    }

    const nextLearn = () => {
        const updatedCurrentIndex = currentIndex + 1 === quiz.length ? 0 : currentIndex + 1;
        setCurrentIndex(updatedCurrentIndex);


        window.sessionStorage.setItem("isLoaded", String(isLoaded));
        window.sessionStorage.setItem("currentIndex", updatedCurrentIndex.toString());
    }

    const prevLearn = () => {
        const updatedCurrentIndex = currentIndex === 0 ? quiz.length - 1 : currentIndex - 1;
        setCurrentIndex(updatedCurrentIndex);

        window.sessionStorage.setItem("isLoaded", String(isLoaded));
        window.sessionStorage.setItem("currentIndex", updatedCurrentIndex.toString());
    }

    const validateAnswer = (answer: string) => {
        return answer === quiz[currentIndex].correct_answer;
    }

    const reloadQuiz = () => {
        resetAttempt();
        setIsSolved(0);
        setCurrentIndex(0);
        window.sessionStorage.removeItem("isLoaded");
        window.sessionStorage.removeItem("quizAttempt");
        window.sessionStorage.removeItem("isSolved");
        window.sessionStorage.removeItem("currentIndex");
    }

    const resetQuiz = () => {
        reloadQuiz();
        setIsLoaded(0);
    }

    const loadTestQuiz = () => {
        setIsLoaded(1);
        shuffleQuiz();
        window.localStorage.setItem("quiz", JSON.stringify(quiz));
    }

    const loadLearnQuiz = () => {
        setIsLoaded(2);
        shuffleQuiz();
        window.localStorage.setItem("quiz", JSON.stringify(quiz));
    }

    const quitQuiz = () => {
        resetQuiz();
        clearQuiz();
        window.localStorage.removeItem("quiz");
        window.sessionStorage.removeItem("isLoaded");
        window.sessionStorage.removeItem("quizAttempt");
        window.sessionStorage.removeItem("isSolved");
        window.sessionStorage.removeItem("currentIndex");
    }

    return { quiz, isSolved, currentIndex, attempt, nextQuestion, nextLearn, prevLearn, validateAnswer, quizSummary, resetQuiz, reloadQuiz,  loadTestQuiz, loadLearnQuiz, quitQuiz }
}