import "./App.css";
import Routings from "./routes/routes";
import Toast from "./components/toast/toast";
import { showToast } from "./components/toast/toast";

function App() {
  return (
    <>
      <Routings></Routings>
      <Toast />
      <button
        onClick={() => {
          showToast("Success", "fail");
        }}
      >
        test
      </button>
    </>
  );
}

export default App;
