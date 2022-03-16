import { Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Start from "./pages/Start";

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Start} exact />
        <Route path="/main" component={Main} exact />
      </Switch>
    </div>
  );
}

export default App;
