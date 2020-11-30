import { getLangDict, Lang, LangDict } from '../contexts/lang_context';

export default class LangCache {
  private dict: LangDict;
  private currentLang: Lang;

  constructor(lang: Lang) {
    this.currentLang = lang;
    this.dict = getLangDict(lang);
  }

  public getPhrase(lang: Lang, phrase: string) {
    if (lang !== this.currentLang) {
      this.changeLang(lang);
    }

    return this.dict[phrase] || phrase;
  }

  private changeLang(lang: Lang) {
    this.currentLang = lang;
    this.dict = getLangDict(lang);
  }
}
