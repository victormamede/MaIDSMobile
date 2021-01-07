import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboard() {
  const [showing, showHandler] = useState(true);

  useEffect(() => {
    hide();

    Keyboard.addListener('keyboardDidShow', show);
    Keyboard.addListener('keyboardDidHide', hide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', hide);
      Keyboard.removeListener('keyboardDidHide', show);
    };
  }, []);

  const show = () => showHandler(true);
  const hide = () => showHandler(false);

  return showing;
}
