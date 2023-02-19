import "./App.css";
import { SetupPageProvider } from "./pages/Setup/contexts/setupPage";
import { SetupPage } from "./pages/Setup/SetupPage";

function App() {
  return (
    <div className="app">
      <SetupPageProvider>
        <SetupPage />
      </SetupPageProvider>
    </div>
  );
}

export default App;
