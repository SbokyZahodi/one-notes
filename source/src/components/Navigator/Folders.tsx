import { useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createFolder,
  deleteFolder,
  renameFolder,
  setCurrentFolder,
} from "../../redux/navigatorReducer";

function Folders() {
  let folders = useAppSelector((state) => state.navigator.folders);
  let dispatch = useAppDispatch();
  let currentFolderId = useAppSelector(
    (state) => state.navigator.currentFolder?.id
  );

  let folder = folders?.map((folder) => {
    if (folder.id === currentFolderId) {
      return (
        <FolderList
          name={folder.name}
          id={folder.id}
          key={folder.id}
          active={true}
        />
      );
    } else {
      return (
        <FolderList
          name={folder.name}
          id={folder.id}
          key={folder.id}
          active={false}
        />
      );
    }
  });

  return (
    <div className={`relative h-full w-full mb-12`}>
     <button>
     <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 cursor-pointer hover:stroke-green-400 transition m-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => dispatch(createFolder())}
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
     </button>

      <div className={`max-h-full min-h-full overflow-y-scroll`}>{folder}</div>
    </div>
  );
}

function FolderList(props: { name: string; id: string; active?: boolean }) {
  let dispatch = useAppDispatch();
  const [IsContextMenuOpen, setIsContextMenuOpen] = useState(false);

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
        dispatch(renameFolder({ id: props.id, newFolderName: result.value }));
      }
    });
  }

  const unactive = `bg-slate-50 text-black m-10 w-52 ml-4 my-4 cursor-pointer p-2 rounded-md hover:translate-x-2  transition z-5 mount `;
  const active = `bg-green-500  text-black m-10 w-52 ml-4 my-4 cursor-pointer p-2 rounded-md hover:translate-x-2 translate-x-2  transition z-5 mount `;
  return (
    <div className={props.active ? active : unactive}>
      <div className={`flex justify-between items-center `}>
        <span
          className="truncate"
          onClick={() => dispatch(setCurrentFolder(props.id))}
        >
          {props.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:stroke-blue-400 transition"
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
      </div>
      {/* Context Menu */}
      <div
        className={`absolute -right-1 border top-0 bg-slate-50  shadow-md rounded-md z-10  ${
          !IsContextMenuOpen && "hidden"
        }`}
        onMouseLeave={() => setIsContextMenuOpen(false)}
      >
        <div className={`flex justify-center items-center flex-col`}>
          <div
            className={`hover:bg-blue-400 w-full p-1 hover:rounded-md  text-center`}
            onClick={() => rename()}
          >
            Переименовать
          </div>
          <div
            className={`hover:bg-blue-400 w-full p-1 hover:rounded-md text-center`}
            onClick={() => dispatch(deleteFolder({ id: props.id }))}
          >
            Удалить
          </div>
        </div>
      </div>
    </div>
  );
}

export default Folders;
