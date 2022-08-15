import { useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addToFavourite,
  createFile,
  deleteFile,
  renameFile,
  setCurrentNote,
  setTheFileBeingReplacedID,
  switchIsReplaceMenuOpen,
} from "../../redux/navigatorReducer";

function Notes() {
  let folder = useAppSelector((state) => state.navigator.currentFolder);
  let currentFileId = useAppSelector(
    (state) => state.navigator.currentFile?.id
  );
  let file = folder?.files?.map((file) => {
    if (file?.id === currentFileId) {
      return (
        <NoteList
          name={file?.name}
          id={file?.id}
          key={file?.id}
          active={true}
        />
      );
    } else {
      return (
        <NoteList
          name={file?.name}
          id={file?.id}
          key={file?.id}
          active={false}
        />
      );
    }
  });
  let dispatch = useAppDispatch();

  return (
    <div className={`text-black h-full p-2 w-[250px]`}>
      <div className={`flex justify-center items-center m-5 px-5`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 mx-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="text-2xl font-medium">Заметки</span>
      </div>
      <button
        className={`flex items-center text-xl border-dashed hover:bg-blue-400 transition border-2 rounded-md p-1 m-2 mb-5 border-blue-400 cursor-pointer`}
        onClick={() => dispatch(createFile())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="">Добавить заметку</span>
      </button>
      <div className={`overflow-y-auto h-3/4 pr-4 pb-4`}>{file}</div>
    </div>
  );
}

function NoteList(props: {
  name: string | undefined;
  id: string | undefined;
  active: boolean;
}) {
  let dispatch = useAppDispatch();

  function setCurrentFile() {
    dispatch(setCurrentNote(props.id));
  }

  function rename() {
    Swal.fire({
      title: "Переименовать",
      input: "text",
      inputValue: props.name,
      inputAttributes: {
        maxlength: "32",
      },
      showCancelButton: true,
      cancelButtonText: "Отмена",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(renameFile({ id: props.id, newFileName: result.value }));
      }
    });
  }
  const [isContextMenuOpen, setisContextMenuOpen] = useState(false);

  function ContextMenu() {
    return (
      <>
        <div
          className={`absolute -right-0 bg-slate-50 border shadow-md  text-black top-0 rounded-md z-20 ${
            !isContextMenuOpen && "hidden"
          }`}
          onMouseLeave={() => setisContextMenuOpen(false)}
        >
          <div
            className={`text-center p-1 hover:bg-blue-400 rounded-md`}
            onClick={() => rename()}
          >
            Переименовать
          </div>
          <div
            className={`text-center p-1 hover:bg-blue-400 rounded-md`}
            onClick={() => dispatch(addToFavourite({ id: props.id }))}
          >
            Избранное
          </div>
          <div
            className={`text-center p-1 hover:bg-blue-400 rounded-md`}
            onClick={() => dispatch(switchIsReplaceMenuOpen())}
          >
            Переместить
          </div>
          <div
            className={`text-center p-1 hover:bg-blue-400 rounded-md`}
            onClick={() => dispatch(deleteFile({ id: props.id }))}
          >
            Удалить
          </div>
        </div>
      </>
    );
  }

  const unactive = `bg-blue-500 m-2 rounded-md shadow-md cursor-pointer hover:bg-green-500 hover:translate-x-2 transition text-white p-2 z-10 mount`;
  const active = `bg-green-500 m-2 rounded-md shadow-md cursor-pointer hover:bg-green-500 hover:translate-x-2 translate-x-2 transition text-white p-2  mount`;

  return (
    <div className={props.active ? active : unactive}>
      <div className={`flex justify-between items-center `}>
        <span
          onClick={() => {
            setCurrentFile();
          }}
          className={`truncate w-40`}
        >
          {props.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => {
            dispatch(setTheFileBeingReplacedID({ fileID: props.id }));
            setisContextMenuOpen(true);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
        <ContextMenu />
      </div>
    </div>
  );
}

export default Notes;
