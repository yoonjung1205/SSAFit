import { Switch, Route } from "react-router-dom";
import './App.scss'
import Main from "./pages/main/Main";
import Login from './pages/login/Login'
import Recommend from "./pages/recommend/Recommend";
import Start from "./pages/start/Start";
import Tpo from "./pages/tpo/Tpo";
import Mypage from "./pages/mypage/Mypage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Start} exact />
        <Route path="/main" component={Main} exact />
        <Route path="/tpo" component={Tpo} exact />
        <Route path="/recommend" component={Recommend} exact />
        <Route path="/mypage" component={Mypage} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
