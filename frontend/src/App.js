import { Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Start from "./pages/Start";

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
      </Switch>
    </div>
  );
}

export default App;
