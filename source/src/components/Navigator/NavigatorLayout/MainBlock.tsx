import { useAppDispatch } from "../../../redux/hooks";
import { openBacket } from "../../../redux/navigatorReducer";
import Favourite from "../Favourite";
import Folders from "../Folders";

function MainBlock({
  CurrentMenu,
  setCurrentMenu,
}: {
  CurrentMenu: string;
  setCurrentMenu: any;
}) {
  let dispatch = useAppDispatch();
  return (
    <div className={`h-[55%]`}>
      <div className={`flex justify-between items-center`}>
        <div
          className={`flex justify-center items-center w-full cursor-pointer ${
            CurrentMenu === "Folders" && "border-b-2"
          }`}
          onClick={() => {
            setCurrentMenu("Folders");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <span className="text-xl mx-2">Папки</span>
        </div>
        <div
          className={`flex justify-center items-center  w-full cursor-pointer ${
            CurrentMenu === "Favourite" && "border-b-2"
          }`}
          onClick={() => {
            setCurrentMenu("Favourite");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span className="text-xl  mx-2">Избранное</span>
        </div>
      </div>
      {CurrentMenu === "Folders" && <Folders />}
      {CurrentMenu === "Favourite" && <Favourite />}

      <div className={`flex justify-center `}>
        <button
          className={`bg-slate-100 shadow-md text-xl text-black rounded-md hover:bg-slate-200 w-2/3 p-2 mt-4 flex items-center justify-center`}
          onClick={() => dispatch(openBacket())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="mx-2">Корзина</span>
        </button>
      </div>
    </div>
  );
}

export default MainBlock;
