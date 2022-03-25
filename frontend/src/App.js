import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Main from "./pages/main/Main";
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Moreinfo from './pages/moreinfo/Moreinfo'
import Recommend from "./pages/recommend/Recommend";
import Start from "./pages/start/Start";
import Tpo from "./pages/tpo/Tpo";
import RecommendCodi from './pages/recommend_codi/RecommendCodi'
import Mypage from "./pages/mypage/Mypage";
import NotFound from "./pages/notfound/NotFound";
import Search from "./pages/search/Search";
import Category from "./pages/category/Category";

function App() {
  const location = useLocation();
  const [path, setPath] = useState('/')
  // const app = window.document.getElementsByClassName('App')[0]
  
  useEffect(() => {
    // const transition = function(){
    //   app.classList.remove('transition')
    //   setTimeout(() => {
    //     app.classList.add('transition')
    //   }, 1)
    // }
    // if (app){
    //   transition()
    // }
    setPath(location.pathname)
  }, [location])

  return (
    <div className="App" key={path}>
      <Switch>
        <Route path="/" component={Start} exact />
        <Route path="/search/:word" component={Search} />
        <Route path="/main" component={Main} exact />
        <Route path="/tpo" component={Tpo} exact />
        <Route path="/recommend_codi/:tpo" component={RecommendCodi} exact />
        <Route path="/recommend" component={Recommend} exact />
        <Route path="/recommend/:category" component={Category} exact />
        <Route path="/mypage" component={Mypage} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/moreinfo" component={Moreinfo} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
