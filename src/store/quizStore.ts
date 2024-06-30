import { create } from 'zustand';


type Answer = {
    a?: number | string;
    b?: number | string;
    c?: number | string;
    d?: number | string;
};

export type QuizObject = {
    id: number;
    question: string;
    answers: Array<Answer>;
    correct_answer: string;
}


type QuizStore = {
    quiz: Array<QuizObject>;
    isLoaded: number;
    quizAttempt: string[];
    setIsLoaded: (data: number) => void;
    initializeQuizData: (data: Array<QuizObject>, mode: number) => void;
    shuffleQuiz: () => void;
    addAnswerToAttempt: (data: string) => void;
    restQuizAttempt: () => void;
    clearQuizData: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
    quiz: JSON.parse(window.localStorage.getItem("quiz") || '[]'),
    isLoaded: Number(window.sessionStorage.getItem("isLoaded")) || 0,
    quizAttempt: JSON.parse(window.sessionStorage.getItem("quizAttempt") || '[]'),
    setIsLoaded: (data: number) => set({ isLoaded: data }),
    initializeQuizData: (data: Array<QuizObject>, mode: number) => set(() => ({ quiz: data, isLoaded: mode })),
    shuffleQuiz: () => set((state) => ({
        quiz: state.quiz
            .sort(() => Math.random() - 0.5)
            .map((question) => ({
                ...question,
                answers: question.answers.sort(() => Math.random() - 0.5)
            }))
    })),
    addAnswerToAttempt: (data: string) => set((state) => ({ quizAttempt: [...state.quizAttempt, data] })),
    restQuizAttempt: () => set(() => ({ quizAttempt: [] })),
    clearQuizData: () => set({ quiz: [], isLoaded: 0 }),
}));