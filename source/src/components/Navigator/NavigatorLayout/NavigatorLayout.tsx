import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { searchNote } from "../../../redux/navigatorReducer";
import Backet from "../Modals/Backet";
import Replace from "../Modals/Replace";
import Notes from "../Notes";
import logo from "./../assets/logo.png";
import MainBlock from "./MainBlock";
import SearchBlock from "./SearchBlock";

function Navigator() {
  const [CurrentMenu, setCurrentMenu] = useState<"Folders" | "Favourite">(
    "Folders"
  );

  const [SearchMode, setSearchMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  let dispatch = useAppDispatch();

  function onChange(str: string) {
    setInputValue(str);

    if (str !== "") {
      setSearchMode(true);
      dispatch(searchNote({ searchStr: str }));
    } else {
      setSearchMode(false);
    }
  }

  return (
    <div className={`shadow-xl flex `}>
      <div className={`bg-blue-500 `}>
        <div className={`h-[180px]`}>
          <div className={`items-center shadow-md flex justify-center p-2 `}>
            <img src={logo} alt="" className="w-20" />
            <span className="font-medium text-3xl mx-5 font-mono ">
              One-Notes
            </span>
          </div>
          <div className={`flex items-center bg-[#2d77e6] m-3 p-1 rounded-md `}>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              name=""
              id=""
              className="bg-inherit p-2 mx-1 text-lg font-sans"
              placeholder="Поиск..."
              value={inputValue}
              onChange={(e) => onChange(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 hover:stroke-red-500 cursor-pointer transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={() => {
                setInputValue("");
                setSearchMode(false);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        {/* Folders & Notes */}
        {SearchMode ? (
          <SearchBlock />
        ) : (
          <MainBlock
            CurrentMenu={CurrentMenu}
            setCurrentMenu={setCurrentMenu}
          />
        )}
      </div>

      <div className={`bg-slate-50`}>
        <Notes />
      </div>

      <Backet />
      <Replace />
    </div>
  );
}

export default Navigator;
