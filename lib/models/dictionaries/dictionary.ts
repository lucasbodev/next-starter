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
      unlogged: string;
    };
  }