import { Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Recommend from "./pages/Recommend";
import Start from "./pages/Start";
import Tpo from "./pages/Tpo";

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
