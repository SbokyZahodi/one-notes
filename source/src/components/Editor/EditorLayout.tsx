import Editor from "./Editor";
import History from "./History";

function EditorLayout() {
  return (
    <div className={`w-full h-full`}>
      <div className={`h-[95%]`}>
        <Editor />
      </div>
      <div className={`h-[5%] relative w-full`}>
        <History />
      </div>
    </div>
  );
}
export default EditorLayout;
