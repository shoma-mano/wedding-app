import { useEffect, useState } from 'react';

export const useNotification = () => {
  const [message, setMessage] = useState<Array<{ message: string; key: number }>>([]);
  const [key, setKey] = useState(0);
  const addMessage = (s: string) => {
    const messageKey = key;
    setMessage((v) => [...v, { key: messageKey, message: s }]);
    console.log(message);
    setTimeout(() => setMessage((v) => v.filter((obj) => obj.key !== messageKey)), 3000);
    setKey(key + 1);
  };
  useEffect(() => console.log(message.length), [message]);
  return { addMessage, message };
};
