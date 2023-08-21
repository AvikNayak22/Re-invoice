import { StateProvider } from "./context/stateContext";
import Application from "./components/Application";

function App() {
  return (
    <StateProvider>
      <div className="App">
        <Application />
      </div>
    </StateProvider>
  );
}

export default App;
