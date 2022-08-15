import EditorLayout from "./components/Editor/EditorLayout";
import NavigatorLayout from "./components/Navigator/NavigatorLayout/NavigatorLayout";

function App() {
  return (
    <>
      <div className="bg-white w-screen h-screen flex ">
        <NavigatorLayout />
        <EditorLayout />
      </div>
    </>
  );
}

export default App;
