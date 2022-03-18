import { Switch, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Recommend from "./pages/recommend/Recommend";
import Start from "./pages/start/Start";
import Tpo from "./pages/tpo/Tpo";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Start} exact />
        <Route path="/main" component={Main} exact />
        <Route path="/tpo" component={Tpo} exact />
        <Route path="/recommend" component={Recommend} exact />
        <Route path="/profile" component={Profile} exact />
      </Switch>
    </div>
  );
}

export default App;
