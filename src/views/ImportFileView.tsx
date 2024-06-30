import useQuizSolve from "../hooks/useQuizSolve.ts";
import JsonDropzone from "../components/JsonDropzone.tsx";
import {useToastStore} from "../store/toastStore.ts";

export default function ImportFileView () {
    const { loadTestQuiz, loadLearnQuiz, quitQuiz } = useQuizSolve();
    const currentQuiz = window.localStorage.getItem("quiz");
    const isToast = useToastStore(state => state.isToast);
    const messageToast = useToastStore(state => state.messageToast);
    return(
        <div className="gap-4 h-full w-full flex flex-col justify-center sm:w-1/2 md:w-1/3 xl:w-1/4">
            {isToast && <h2 className="p-4 rounded-full w-full absolute text-center bg-red-600 top-4 left-0 text-white">{messageToast.message}</h2>}
            {currentQuiz ?
                <>
                <div className="flex flex-row">
                    <button className="w-full text-2xl m-4 h-32 bg-gray-400 rounded-xl"
                            onClick={() => loadTestQuiz()}>Test
                    </button>
                    <button className="w-full text-2xl m-4 h-32 bg-gray-400 rounded-xl"
                            onClick={() => loadLearnQuiz()}>Learn
                    </button>
                </div>
                <div className="flex flex-row">
                    <button className="w-full text-2xl m-4 h-32 bg-gray-400 rounded-xl" onClick={() => quitQuiz()}>Load new Quiz</button>
                </div>
                </>
                :
                <>
                    <h1 className="text-2xl text-center">JSON file example</h1>
                <img src={'example.png'}  alt='example' />
                <JsonDropzone />
                </>
            }

        </div>

    )
}