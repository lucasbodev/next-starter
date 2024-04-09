import 'server-only';

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  return await import(`@/dictionaries/${locale}.json`).then((module) => module.default);
};

export interface LangParams {
  lang: string;
}

export interface Dictionary {
  home: {
    title: string;
  };
  links: {
    playerLink: string;
    homeLink: string;
    countLink: string;
  };
  log: {
    login: string;
    logout: string;
  };
  count: {
    title: string;
    countViewer: string;
    increment: string;
  };
  players: {
    form: {
      title: string;
      name: string;
      age: string;
      position: string;
      add: string;
    };
    list: {
      title: string;
      name: string;
      age: string;
      position: string;
      delete: string;
      edit: string;
    };
    messages: {
      addPlayerSuccess: string;
      addPlayerError: string;
    };
  };
  errors: {
    general: string;
    required: string;
    min: string;
    max: string;
    integer: string;
    email: string;
    unique: string;
  };
}