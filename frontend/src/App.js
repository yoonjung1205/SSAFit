import { Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Recommend from "./pages/Recommend";
import Start from "./pages/Start";
import Tpo from "./pages/Tpo";

function App() {
  const html = document.querySelector('html')
  window.addEventListener('resize', event => {
    const w = event.target.innerWidth;
    const h = event.target.innerHeight;
    
    const rem = 16 - (16/9 - w/h)
    html.style.fontSize = `${rem}px`
  })


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
