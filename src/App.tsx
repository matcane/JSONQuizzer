import ImportFileView from "./views/ImportFileView.tsx";
import { useQuizStore } from "./store/quizStore.ts";
import QuizView from "./views/QuizView.tsx";
import LearnQuiz from "./views/LearnQuiz.tsx";

export default function App() {
    const isQuiz = useQuizStore((state) => state.isLoaded);
    return (
        <div className="p-4 flex w-full h-dvh justify-center items-center select-none">
            {isQuiz === 1 && <QuizView />}
            {isQuiz === 2 && <LearnQuiz />}
            {isQuiz === 0 && <ImportFileView />}
        </div>

    )
}