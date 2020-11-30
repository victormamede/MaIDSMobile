import { createContext, useContext } from 'react';
import ptBr from '../../lang/pt_br.json';

export type LangDict = {
  [phrase: string]: string;
};

export enum Lang {
  EN,
  PT_BR,
}

export type LangContextProps = {
  getPhrase: (phrase: string) => string;
  changeLang: (targetLang: Lang) => void;
  currentLang: Lang;
};

const LangContext = createContext<LangContextProps>({
  getPhrase: (word) => word,
  changeLang: () => {},
  currentLang: Lang.EN,
});

export function getLangDict(lang: Lang): LangDict {
  switch (lang) {
    case Lang.EN:
      return {};
    case Lang.PT_BR:
      return ptBr;
  }
}

export const LangProvider = LangContext.Provider;
export const useLang = () => useContext(LangContext);
