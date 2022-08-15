interface initialStateType {
  folders?: {
    name: string;
    id: string;
    files?: [
      {
        name?: string;
        id?: string;
        textContent?: string;
      }?
    ];
  }[];
  currentFolder: null | {
    name: string;
    id: string;
    files?: [{ name?: string; id?: string; textContent?: string }?];
  };
  currentFile:
    | undefined
    | null
    | {
        name?: undefined | string;
        id?: undefined | string;
        textContent?: undefined | string;
      };
  history: { name?: string; id?: string; textContent?: string }[];

  favourite?: {
    name?: string;
    id?: string;
  }[];
  searchResult?: {
    name?: string;
    id?: string;
  }[];
  isBacketOpen: boolean;
  isReplaceMenuOpen: boolean;
  Backet: {
    name?: string;
    id?: string;
    textContent?: string;
    active?: boolean;
  }[];
  theFileBeingReplacedID: string | null;
}

const initialState: initialStateType = {
  theFileBeingReplacedID: null,
  folders: [],
  currentFolder: null,
  currentFile: null,
  history: [],
  favourite: [],
  searchResult: [],
  isBacketOpen: false,
  isReplaceMenuOpen: false,
  Backet: [],
};

export default initialState;
