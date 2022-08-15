import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCurrentNote } from "../../../redux/navigatorReducer";

function SearchBlock() {
  let searchResult = useAppSelector((state) => state.navigator.searchResult);
  let resultArray = searchResult?.map((result) => {
    return <Item key={result.id} name={result.name} id={result.id} />;
  });

  return (
    <div className={`h-full`}>
      <div className={`m-2 text-xl`}>Результат поиска</div>
      {resultArray?.length === 0 && (
        <div className={`text-center m-4 `}>Ничего не найдено</div>
      )}
      <div className={`overflow-y-scroll h-2/3`}>
      {resultArray}
      </div>
    </div>
  );
}

function Item(props: {
  name: string | undefined;
  key: string | undefined;
  id: string | undefined;
}) {
  let dispatch = useAppDispatch();
  let currentNote = useAppSelector((state) => state.navigator.currentFile);

  enum styles {
    unactive = `bg-slate-50 text-black m-10 w-52 ml-4 my-4 cursor-pointer p-2 rounded-md hover:translate-x-2 transition z-5 mount`,
    active = `bg-green-500  text-black m-10 w-52 ml-4 my-4 cursor-pointer p-2 rounded-md hover:translate-x-2 translate-x-2  transition z-5 mount`,
  }

  return (
    <div
      onClick={() => dispatch(setCurrentNote(props.id))}
      className={props.id === currentNote?.id ? styles.active : styles.unactive}
    >
      {props.name}
    </div>
  );
}

export default SearchBlock;
