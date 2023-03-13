import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ChatScreen, LoginScreen, RegisterScreen } from "./components";
import { TOKEN } from "./constants";
import { storage } from "./utils";

function App() { 
  const token = storage.get<string>(TOKEN);
  const isLogin = storage.get<boolean>('isLogin');

  return (
    <section className="w-[480px] h-full mx-auto flex flex-col py-4">
      {token ? <ChatScreen /> : isLogin ? <LoginScreen/> : <RegisterScreen/>}
    </section>
  );
}

export default App;