import { atom, useAtom } from 'jotai';

const messageListAtom = atom<Array<{ message: string; key: number }>>([]);
const keyAtom = atom(100);

export const addMessageAtom = atom(
  (get) => get(messageListAtom),
  (get, set, _arg: string) => {
    const messageKey = get(keyAtom);
    set(messageListAtom, [...get(messageListAtom), { key: messageKey, message: _arg }]);
    setTimeout(
      () =>
        set(
          messageListAtom,
          get(messageListAtom).filter((obj) => obj.key !== messageKey),
        ),
      1000,
    );
    set(keyAtom, get(keyAtom) + 1);
  },
);
