import { useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addNoteToHistory,
  addToFavourite,
  closeNote,
  deleteFile,
  newTextContent,
  renameFile,
} from "../../redux/navigatorReducer";

function Editor() {
  let currentFile = useAppSelector((state) => state.navigator.currentFile);
  let dispatch = useAppDispatch();
  const [IsContextMenuOpen, setIsContextMenuOpen] = useState(false);

  function ContextMenu() {
    function rename() {
      Swal.fire({
        title: "Переименовать",
        input: "text",
        inputValue: currentFile?.name,
        inputAttributes: {
          maxlength: "32",
        },
        showCancelButton: true,
        cancelButtonText: "Отмена",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            renameFile({ id: currentFile?.id, newFileName: result.value })
          );
        }
      });
    }

    if (!IsContextMenuOpen) {
      return null;
    }

    return (
      <div
        className={` absolute bg-slate-50 shadow-md text-black -ml-20 rounded-md`}
        onMouseLeave={() => setIsContextMenuOpen(false)}
      >
        <div
          className={`text-center p-1 hover:bg-blue-400 rounded-md cursor-pointer`}
          onClick={() => rename()}
        >
          Переименовать
        </div>
        <div
          className={`text-center p-1 hover:bg-blue-400 rounded-md cursor-pointer`}
          onClick={() => dispatch(addToFavourite({ id: currentFile?.id }))}
        >
          Избранное
        </div>
        <div
          className={`text-center p-1 hover:bg-blue-400 rounded-md cursor-pointer`}
          onClick={() => dispatch(deleteFile({ id: currentFile?.id }))}
        >
          Удалить
        </div>
      </div>
    );
  }

  if (!currentFile) {
    return null;
  }

  return (
    <div
      className={`text-white w-full h-full flex justify-center items-center `}
    >
      <div className={`bg-blue-500 w-2/3 h-[550px] rounded-md shadow-xl`}>
        <div className={`flex justify-between items-center p-2`}>
          <span className="lg:text-xl xl:text-3xl">{currentFile.name}</span>
          <div className={`flex`}>
            <div className={``}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-2 hover:stroke-green-400 transition cursor-pointer relative"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => setIsContextMenuOpen(true)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              <ContextMenu />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-2 hover:stroke-green-400 transition cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() =>
                dispatch(addNoteToHistory({ NoteId: currentFile?.id }))
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-2 hover:stroke-red-500 transition cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => dispatch(closeNote())}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className={`m-5 h-[80%] text-black`}>
          <textarea
            name=""
            id=""
            className="w-full h-full resize-none outline-none rounded-md p-2 text-lg"
            placeholder="Введите тут текст..."
            value={currentFile?.textContent}
            onChange={(e) => dispatch(newTextContent({ text: e.target.value }))}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Editor;
