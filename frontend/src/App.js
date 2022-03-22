import { Switch, Route, useLocation } from "react-router-dom";
import './App.scss'
import Main from "./pages/main/Main";
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Recommend from "./pages/recommend/Recommend";
import Start from "./pages/start/Start";
import Tpo from "./pages/tpo/Tpo";
import { useState, useEffect } from "react";
import Mypage from "./pages/mypage/Mypage";

function App() {
  const [path, setPath] = useState('/')
  const location = useLocation();

  useEffect(() => {
    console.log(location)
    setPath(location.pathname)
  }, [location])

  return (
    <div className="App" key={path}>
      <Switch>
        <Route path="/" component={Start} exact />
        <Route path="/main" component={Main} exact />
        <Route path="/tpo" component={Tpo} exact />
        <Route path="/recommend" component={Recommend} exact />
        <Route path="/mypage" component={Mypage} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
