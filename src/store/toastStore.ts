import { create } from 'zustand'

export type MessageObject = {
    error: number;
    message: string;
}

type ToastStore = {
    isToast: boolean,
    messageToast: MessageObject,
    showToast: () => void,
    removeToast: () => void,
    setMessageToast: (messageToast: MessageObject) => void,
}

export const useToastStore = create<ToastStore>((set) => ({
    isToast: false,
    messageToast: { error: 0, message: "" },
    showToast: () => set({ isToast: true }),
    removeToast: () => set({ isToast: false }),
    setMessageToast: (messageToast: MessageObject) => set({ isToast: true, messageToast: messageToast })
}))