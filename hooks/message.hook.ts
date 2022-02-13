import { useState } from "react";

const useNotification = () => {
    const [message, setMessage] = useState<Array<{ message: string; key: number; }>>([])
    const [key, setKey] = useState(0)
    const addMessage = (message: string) => {
        const messageKey = key;
        setMessage((v) => [...v, {key: messageKey, message: message}])
        setTimeout(() => setMessage((v) => v.filter(obj => obj.key !== messageKey)), 3000)
        setKey(key + 1)
    }
    return {addMessage}
}

