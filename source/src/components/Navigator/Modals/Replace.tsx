import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  switchIsReplaceMenuOpen,
  replaceFile,
  createFolder,
} from "../../../redux/navigatorReducer";

function Replace() {
  let folders = useAppSelector((state) => state.navigator.folders);
  let isModalOpen = useAppSelector(
    (state) => state.navigator.isReplaceMenuOpen
  );
  let currentFolder = useAppSelector((state) => state.navigator.currentFolder);
  let dispatch = useAppDispatch();
  let array = folders?.map((item) => {
    if (item.id !== currentFolder?.id) {
      return <Item id={item.id} name={item.name} key={item.id} />;
    }
  });

  function Item({ id, name }: { id: string; name: string }) {
    return (
      <div className={``}>
        <div
          className={`bg-slate-50 mx-5 my-2  p-2 hover:bg-slate-200 transition rounded-md cursor-pointer `}
          onClick={() => {
            dispatch(replaceFile({ folderId: id }));
            dispatch(switchIsReplaceMenuOpen());
          }}
        >
          <span className="text-black truncate text-xl">{name}</span>
        </div>
      </div>
    );
  }

  function Folders() {
    if (array) {
      if (array?.length > 1) {
        return <div className={``}>{array}</div>;
      }
    }

    return (
      <div className={`flex items-center justify-center h-full`}>
        <div className={`text-2xl`}>
          <span>Других папок не обнаружено</span> <br />
          <div className={`flex justify-center items-center m-2`}>
            <button
              className="bg-white text-black p-2 px-4 rounded-md hover:bg-slate-300 transition "
              onClick={() => dispatch(createFolder())}
            >
              Создать папку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        !isModalOpen && "hidden"
      } h-full w-full flex  justify-center items-center fixed`}
    >
      <div className={` bg-blue-500 w-[400px] h-[600px] rounded-md shadow-md`}>
        <div className={`flex justify-between items-center p-2`}>
          <span className="text-xl">Выберите папку</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 hover:stroke-red-500 transition cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => dispatch(switchIsReplaceMenuOpen())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className={`overflow-auto h-[90%]`}>
          <Folders />
        </div>
      </div>
    </div>
  );
}
export default Replace;
