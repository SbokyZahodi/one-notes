import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteMultiple,
  openBacket,
  removeFileFromBacket,
  restoreFile,
  restoreMultiple,
  setActive,
  setAllActive,
} from "../../../redux/navigatorReducer";

function Backet() {
  let dispatch = useAppDispatch();
  let backetFiles = useAppSelector((state) => state.navigator.Backet);
  let isModalOpen = useAppSelector((state) => state.navigator.isBacketOpen);

  let filesInBacket = backetFiles.map((file) => {
    return (
      <Item
        key={file.id}
        id={file.id}
        name={file.name}
        active={file.active ? true : false}
      />
    );
  });

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={`fixed w-full h-full flex items-center justify-center`}>
      <div className={`bg-blue-500 w-[400px] h-[600px] rounded-md shadow-xl `}>
        <div className={`flex justify-between items-center text-2xl p-2`}>
          <span>Корзина</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 cursor-pointer hover:stroke-red-500 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => dispatch(openBacket())}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <button className="flex justify-center m-2 bg-slate-100 text-black p-1 rounded hover:bg-slate-200 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6px-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span className="px-5" onClick={() => dispatch(setAllActive())}>
            Выбрать всё
          </span>
        </button>
        <div className={`h-[73%] overflow-y-scroll scroll-smooth`}>
          {/* Items */}
          {filesInBacket}
        </div>
        <div className={`flex justify-center mt-2`}>
          <button
            className={`mx-2 bg-slate-200 text-black rounded p-1 py-2 w-1/2 flex justify-center hover:bg-red-500 transition `}
            onClick={() => dispatch(deleteMultiple())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
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
            <span className="mx-2">Удалить</span>
          </button>
          <button
            className={`mx-2 bg-slate-200 text-black rounded p-1 py-2 w-1/2 flex justify-center hover:bg-green-400 transition `}
            onClick={() => dispatch(restoreMultiple())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="w-6 h-6 "
              width="50"
              height="50"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.896 8.896 0 0 0 13 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9Z"
              />
            </svg>
            <span className="mx-2">Восстановить</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Item({
  id,
  name,
  active,
}: {
  id: string | undefined;
  name: string | undefined;
  active: boolean;
}) {
  let dispatch = useAppDispatch();

  enum styles {
    active = "flex items-center justify-between p-2 bg-green-400 text-black m-6 mx-8 rounded-md  transition",
    unactive = "flex items-center justify-between p-2 bg-slate-50 text-black m-6 mx-8 rounded-md hover:bg-slate-200 transition",
  }

  return (
    <div className={active ? styles.active : styles.unactive}>
      <div className={`flex items-center`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mx-2 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => {
            dispatch(setActive({ id: id }));
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="">{name}</span>
      </div>
      <div className={`flex items-center `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-8 w-8 cursor-pointer mx-1"
          role="img"
          strokeWidth={1}
          width="50"
          height="50"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          onClick={() => dispatch(restoreFile({ fileId: id }))}
        >
          <path
            fill="currentColor"
            d="M11 16h2v-4.15l1.6 1.55L16 12l-4-4l-4 4l1.4 1.4l1.6-1.55Zm-4 5q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 cursor-pointer mx-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          onClick={() => dispatch(removeFileFromBacket({ id: id }))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
}

export default Backet;
