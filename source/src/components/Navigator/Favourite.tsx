import { useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeFavourite,
  renameFile,
  setCurrentNote,
} from "../../redux/navigatorReducer";

function Favourite() {
  let favourite = useAppSelector((state) => state.navigator.favourite);
  let currentFile = useAppSelector((state) => state.navigator.currentFile);

  let favouriteItems = favourite?.map((item) => {
    if (item.id === currentFile?.id) {
      return (
        <Item name={item?.name} id={item?.id} key={item?.id} active={true} />
      );
    } else {
      return (
        <Item name={item?.name} id={item?.id} key={item?.id} active={false} />
      );
    }
  });

  return (
    <div className={`relative h-full w-full`}>
      <div className={`max-h-full min-h-full mt-12 overflow-y-scroll`}>
        {favouriteItems}
      </div>
    </div>
  );
}

function Item(props: {
  name: string | undefined;
  id: string | undefined;
  key: string | undefined;
  active: boolean;
}) {
  let dispatch = useAppDispatch();

  function rename() {
    Swal.fire({
      title: "Переименовать",
      input: "text",
      inputValue: props.name,
      inputAttributes: {
        maxlength: "16",
      },
      showCancelButton: true,
      cancelButtonText: "Отмена",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(renameFile({ id: props.id, newFileName: result.value }));
      }
    });
  }

  function ContextMenu() {
    return (
      <div
        className={`absolute -right-1 border top-0 bg-slate-50  shadow-md rounded-md z-10`}
        onMouseLeave={() => {
          setIsContextMenuOpened(false);
        }}
      >
        <div
          onClick={() => rename()}
          className={`hover:bg-blue-400 w-full p-1 hover:rounded-md  text-center`}
        >
          Переименовать
        </div>
        <div
          onClick={() => dispatch(removeFavourite({ id: props.id }))}
          className={`hover:bg-blue-400 w-full p-1 hover:rounded-md  text-center`}
        >
          Убрать
        </div>
      </div>
    );
  }

  const [IsContextMenuOpened, setIsContextMenuOpened] = useState(false);

  const unactive = `bg-slate-50 text-black m-10 w-52 ml-4 my-4 cursor-pointer p-2 rounded-md hover:translate-x-2  transition z-5 mount`;
  const active = `bg-green-500  text-black m-10 w-52 ml-4 my-4 cursor-pointer p-2 rounded-md hover:translate-x-2 translate-x-2  transition z-5 mount`;
  return (
    <div className={props.active ? active : unactive}>
      <div className={`flex justify-between items-center`}>
        <span onClick={() => dispatch(setCurrentNote(props.id))} className={`truncate w-40`}>
          {props.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => setIsContextMenuOpened(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </div>
      {IsContextMenuOpened ? <ContextMenu /> : null}
    </div>
  );
}

export default Favourite;
