import {useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useQuizStore } from "../store/quizStore.ts";
import {useToastStore} from "../store/toastStore.ts";
import {QuizObject} from "../store/quizStore.ts";

export default function JsonDropzone() {
    const initializeQuiz = useQuizStore((state) => state.initializeQuizData);
    const isToast = useToastStore((state) => state.isToast);
    const removeToast = useToastStore((state) => state.removeToast);
    const setErrorMessage = useToastStore(state => state.setMessageToast);
    const onDrop = useCallback((acceptedFiles: object[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const fileContent = reader.result;
                // string | ArrayBuffer | null
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const jsonContent = JSON.parse(fileContent);

                    // Function to validate the JSON structure
                    const validateJsonStructure = (data: Array<QuizObject>) => {
                        if (!Array.isArray(data)) return false;
                        // noinspection SuspiciousTypeOfGuard
                        return data.every(item =>
                            Object.keys(item).length === 4 &&
                            typeof item.id === 'number' &&
                            typeof item.question === 'string' &&
                            Array.isArray(item.answers) &&
                            item.answers.length === 4 &&
                            item.answers.every((answer) => {
                                const keys = Object.keys(answer);
                                return keys.length === 1 && ['a', 'b', 'c', 'd'].includes(keys[0]);
                            }) &&
                            typeof item.correct_answer === 'string' &&
                            ['a', 'b', 'c', 'd'].includes(item.correct_answer)
                        );
                    };

                    if (validateJsonStructure(jsonContent)) {
                        initializeQuiz(jsonContent, 0);
                        removeToast();
                        window.localStorage.setItem("quiz", JSON.stringify(jsonContent));
                    } else {
                        setErrorMessage({error: 0, message: 'Invalid JSON structure'});
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };

            reader.readAsText(file as Blob);
        });
    }, [initializeQuiz, removeToast, setErrorMessage]);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        accept: {
            'application/json': ['.json'],
        },
        maxFiles: 1,
    });

    useEffect(() => {
        fileRejections.some(({ file, errors }) => {
            return errors.some(err => {
                if (err.code === 'file-invalid-type') {
                    setErrorMessage({ error: 0, message: `File ${file.name} is not a valid JSON file.` });
                    return true;
                }
                return false;
            });
        });
    }, [fileRejections, setErrorMessage]);

    useEffect(() => {
        if (isToast) {
            setTimeout(() => {
                removeToast();
            }, 4000);
        }
    }, [isToast, removeToast]);

    return (
        <div {...getRootProps()} className="h-1/4 m-4 p-2 flex justify-center items-center border-dotted border-2 border-gray-500 rounded-md text-center cursor-pointer">
            <input {...getInputProps()} />
            <p>Drag 'n' drop a .json file here, or click to select a file</p>
        </div>
    );
}