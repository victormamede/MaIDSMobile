import React, { useState } from 'react';
import {
  Lang,
  LangContextProps,
  LangProvider,
} from '../util/contexts/lang_context';
import LangCache from '../util/helper/lang_cache';

const langCache = new LangCache(Lang.PT_BR);

type Props = {
  children: React.ReactNode;
};

export default function LangContextProvider({ children }: Props) {
  const [currentLang, langHandler] = useState<Lang>(Lang.EN);

  const changeLang = (newLang: Lang) => {
    langHandler(newLang);
  };

  const props: LangContextProps = {
    changeLang: changeLang,
    getPhrase: (phrase) => langCache.getPhrase(currentLang, phrase),
    currentLang: currentLang,
  };

  return <LangProvider value={props}>{children}</LangProvider>;
}
