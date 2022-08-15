import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./InitialState";

const navigator = createSlice({
  name: "navigator",
  initialState,

  reducers: {
    createFolder(state) {
      state.folders?.push({
        name: "Новая папка",
        id: nanoid(),
        files: [],
      });
    },
    createFile(state) {
      state.folders?.forEach((folder) => {
        if (folder.id === state.currentFolder?.id) {
          folder.files?.push({
            name: "Новый файл",
            id: nanoid(),
            textContent: "",
          });
          state.currentFolder = folder;
        }
      });
    },
    setCurrentFolder(state, action: PayloadAction<string>) {
      state.folders?.filter((folder) => {
        if (folder.id === action.payload) {
          state.currentFolder = folder;
        }
      });
    },
    setCurrentNote(state, action: PayloadAction<string | undefined>) {
      state.folders?.forEach((folder) => {
        folder.files?.filter((item) => {
          if (item?.id === action.payload) {
            state.currentFile = item;
          }
        });
      });
    },

    deleteFolder(state, action: PayloadAction<{ id: string }>) {
      let folders = state.folders?.filter(
        (folder) => folder.id !== action.payload.id
      );
      state.folders = folders;
      // Если папок нет = текущая папка зануляется
      if (state.folders?.length === 0) {
        state.currentFolder = null;
        state.currentFile = null;
      }
      // Если текущая папка удаляется, то зануляется
      if (state.currentFolder?.id === action.payload.id) {
        state.currentFolder = null;
        state.currentFile = null;
      }
      // Если текущая папка с файлом удаляется, то удаляется текущий файл
    },
    deleteFile(state, action: PayloadAction<{ id: string | undefined }>) {
      let files: any;
      // Добавление файла в корзину
      state.folders?.forEach((folder) => {
        folder.files?.forEach((item) => {
          if (item?.id === action.payload.id) {
            if (item) {
              state.Backet.push({ ...item, active: false });
            }
          }
        });
      });

      // Зануление текущей папки при её удалении
      state.folders?.forEach((folder) => {
        folder.files?.forEach((item) => {
          if (item?.id === state.currentFile?.id) {
            state.currentFile = null;
          }
        });
      });

      // Удаление файла из истории
      let historyWithoutDeletedFile = state.history.filter(
        (item) => item.id !== action.payload.id
      );
      state.history = historyWithoutDeletedFile;

      // Удаление файла из избранного
      let favouriteWithoutDeletedFile = state.favourite?.filter(
        (item) => item?.id !== action.payload.id
      );
      state.favourite = favouriteWithoutDeletedFile;

      state.folders?.forEach((folder) => {
        files = folder.files?.filter((item) => item?.id !== action.payload.id);
        folder.files = files;

        if (folder.id === state.currentFolder?.id) {
          state.currentFolder = folder;
        }
      });
    },
    renameFolder(
      state,
      action: PayloadAction<{ id: string; newFolderName: string }>
    ) {
      state.folders?.forEach((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.newFolderName;
        }
      });
    },
    replaceFile(state, action: PayloadAction<{ folderId: string }>) {
      let file:
        | { name?: string; id?: string; textContent?: string }
        | undefined;
      let folderId: string;
      let arrayOfFiles: any;
      // Подтягиваем файл
      state.folders?.forEach((folder) => {
        folder.files?.forEach((item) => {
          if (item?.id === state.theFileBeingReplacedID) {
            file = item;
          }
        });
      });

      state.folders?.forEach((folder) => {
        if (
          folder.files?.some(
            (item) => item?.id === state.theFileBeingReplacedID
          )
        ) {
          folderId = folder.id;
        }
      });

      state.folders?.forEach((folder) => {
        if (folder.id === folderId) {
          arrayOfFiles = folder.files?.filter((item) => item?.id !== file?.id);
          folder.files = arrayOfFiles;
        }
      });

      //  Пушим файл в папку
      state.folders?.forEach((folder) => {
        if (folder.id === action.payload.folderId) {
          folder.files?.push(file);
        }
        if (folder.id === state.currentFolder?.id) {
          state.currentFolder = folder;
        }
      });
    },
    renameFile(
      state,
      action: PayloadAction<{ id: string | undefined; newFileName: string }>
    ) {
      state.folders?.forEach((folder) => {
        folder.files?.forEach((file) => {
          if (file?.id === action.payload.id) {
            if (file?.name && action.payload.newFileName !== "") {
              file.name = action.payload.newFileName;

              if (file.id === state.currentFile?.id) {
                if (state.currentFile) {
                  state.currentFile.name = action.payload.newFileName;
                }
              }
            }
          }

          state.favourite?.forEach((item) => {
            if (item.id === file?.id) {
              if (item) {
                item.name = file?.name;
              }
            }
          });

          state.history?.forEach((item) => {
            if (item?.id === file?.id) {
              if (item) {
                item.name = file?.name;
              }
            }
          });
        });
        if (folder.id === state.currentFolder?.id) {
          state.currentFolder = folder;
        }
      });
    },
    newTextContent(state, action: PayloadAction<{ text: string }>) {
      if (state.currentFile) {
        state.currentFile.textContent = action.payload.text;

        state.folders?.forEach((folder) => {
          folder.files?.forEach((item) => {
            if (item?.id === state.currentFile?.id) {
              if (item) {
                item.textContent = state.currentFile?.textContent;
              }
            }
          });
        });
      }
    },
    closeNote(state) {
      state.currentFile = null;
    },

    // FavouriteBlock
    addToFavourite(state, action: PayloadAction<{ id: string | undefined }>) {
      state.folders?.forEach((folder) => {
        folder.files?.forEach((item) => {
          if (state.favourite?.some((item) => item.id === action.payload.id)) {
          } else {
            if (item?.id === action.payload.id) {
              if (item) {
                state.favourite?.push(item);
              }
            }
          }
        });
      });
    },
    removeFavourite(state, action: PayloadAction<{ id: string | undefined }>) {
      let array = state.favourite?.filter(
        (item) => item.id !== action.payload.id
      );
      state.favourite = array;
    },

    // History Block
    addNoteToHistory(
      state,
      action: PayloadAction<{ NoteId: string | undefined }>
    ) {
      state.currentFile = null;
      if (state.history) {
        if (state.history?.length >= 1) {
          if (
            state.history.some(
              (element) => element?.id === action.payload.NoteId
            )
          ) {
          } else if (state.history.length === 7) {
            state.folders?.forEach((folder) => {
              folder.files?.forEach((file) => {
                if (file?.id === action.payload.NoteId) {
                  if (file) {
                    state.history?.unshift(file);
                  }
                }
              });
            });
            state.history.pop();
          } else {
            state.folders?.forEach((folder) => {
              folder.files?.forEach((file) => {
                if (file?.id === action.payload.NoteId) {
                  if (file) {
                    state.history?.unshift(file);
                  }
                }
              });
            });
          }
        } else {
          state.folders?.forEach((folder) => {
            folder.files?.forEach((file) => {
              if (file?.id === action.payload.NoteId) {
                if (file) {
                  state.history?.unshift(file);
                }
              } else {
              }
            });
          });
        }
      }
    },
    removeFromHistory(
      state,
      action: PayloadAction<{ id: string | undefined }>
    ) {
      let array = state.history.filter((item) => item.id !== action.payload.id);

      state.history = array;
    },

    // BacketBlock

    openBacket(state) {
      state.isBacketOpen = !state.isBacketOpen;
    },
    switchIsReplaceMenuOpen(state) {
      state.isReplaceMenuOpen = !state.isReplaceMenuOpen;
    },
    setTheFileBeingReplacedID(
      state,
      action: PayloadAction<{ fileID: string | undefined }>
    ) {
      if (action.payload.fileID) {
        state.theFileBeingReplacedID = action.payload.fileID;
      }
    },

    removeFileFromBacket(
      state,
      action: PayloadAction<{ id: string | undefined }>
    ) {
      let array = state.Backet.filter((item) => item.id !== action.payload.id);
      state.Backet = array;
    },
    setActive(state, action: PayloadAction<{ id: string | undefined }>) {
      state.Backet.forEach((item) => {
        if (item.id === action.payload.id) {
          item.active = !item.active;
        }
      });
    },
    setAllActive(state) {
      if (state.Backet.every((item) => item.active)) {
        state.Backet.forEach((item) => {
          item.active = false;
        });
      } else {
        state.Backet.forEach((item) => {
          item.active = true;
        });
      }
    },
    restoreFile(state, action: PayloadAction<{ fileId: string | undefined }>) {
      let file = state.Backet.find((item) => item.id === action.payload.fileId);
      let currentFolderId = state.currentFolder?.id;

      state.folders?.forEach((folder) => {
        if (folder.id === currentFolderId) {
          folder.files?.push(file);
          state.currentFolder = folder;
        }
      });

      state.Backet = state.Backet.filter(
        (item) => item.id !== action.payload.fileId
      );
    },
    restoreMultiple(state) {
      state.folders?.forEach((folder) => {
        if (folder.id === state.currentFolder?.id) {
          state.Backet.forEach((item) => {
            if (item.active) {
              folder.files?.push(item);
              state.currentFolder = folder;
            }
          });
        }
      });
      state.Backet = state.Backet.filter((item) => !item.active);
    },
    deleteMultiple(state) {
      state.Backet = state.Backet.filter((item) => !item.active);
    },

    // SearchBlock
    searchNote(state, action: PayloadAction<{ searchStr: string }>) {
      state.searchResult = [];
      state.folders?.forEach((folder) => {
        folder.files?.forEach((item) => {
          if (
            item?.name
              ?.toUpperCase()
              .includes(action.payload.searchStr.toLocaleUpperCase())
          ) {
            state.searchResult?.push(item);
          }
        });
      });
    },

    setNoteFromHistory(
      state,
      action: PayloadAction<{ id: string | undefined }>
    ) {
      state.folders?.forEach((folder) => {
        folder.files?.forEach((item) => {
          if (item?.id === action.payload.id) {
            state.currentFile = item;
          }
        });
      });
    },
    removeHistory(state, action: PayloadAction<{ id: string }>) {},
  },
});

export default navigator.reducer;
export const {
  createFolder,
  setCurrentFolder,
  setCurrentNote,
  createFile,
  deleteFile,
  deleteFolder,
  removeFileFromBacket,
  removeHistory,
  restoreFile,
  restoreMultiple,
  deleteMultiple,
  setActive,
  setAllActive,
  replaceFile,
  setTheFileBeingReplacedID,
  renameFolder,
  renameFile,
  newTextContent,
  addNoteToHistory,
  setNoteFromHistory,
  removeFromHistory,
  closeNote,
  addToFavourite,
  searchNote,
  removeFavourite,
  openBacket,
  switchIsReplaceMenuOpen,
} = navigator.actions;
