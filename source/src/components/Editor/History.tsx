import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeFromHistory,
  setNoteFromHistory,
} from "../../redux/navigatorReducer";

function History() {
  let historyItems = useAppSelector((state) => state.navigator.history);
  let currentNote = useAppSelector((state) => state.navigator.currentFile);
  let arrayOfhistoryItems = historyItems.map((item) => {
    if (item.id === currentNote?.id) {
      return <Item name={item.name} id={item.id} active={true} key={item.id} />;
    } else {
      return <Item name={item.name} id={item.id} active={false} key={item.id} />;
    }
  });

  return (
    <div
      className={`bg-slate-50 shadow-inner h-full flex items-center overflow-auto overflow-y-hidden w-full absolute`}
      style={{ scrollbarWidth: "none" }}
    >
      {arrayOfhistoryItems}
    </div>
  );
}

function Item({
  name,
  id,
  active,
}: {
  name: string | undefined;
  id: string | undefined;
  active: boolean;
}) {
  let dispatch = useAppDispatch();

  return (
    <div
      className={`${
        active && "bg-green-500"
      } text-white bg-blue-500 p-1 px-2 m-2 rounded-md hover:bg-green-500 transition cursor-pointer mount`}
    >
      <div className={`flex justify-between items-center`}>
        <span
          className="truncate mx-2 max-w-[120px]"
          onClick={() => {
            dispatch(setNoteFromHistory({ id: id }));
          }}
        >
          {name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:stroke-red-500 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => dispatch(removeFromHistory({ id: id }))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}

export default History;
