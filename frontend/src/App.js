import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Main from "./pages/main/Main";
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Moreinfo from './pages/moreinfo/Moreinfo'
import Recommend from "./pages/recommend/Recommend";
import ItemDetail from './pages/itemdetail/ItemDetail'
import Start from "./pages/start/Start";
import Tpo from "./pages/tpo/Tpo";
import RecommendCodi from './pages/recommend_codi/RecommendCodi'
import Mypage from "./pages/mypage/Mypage";
import NotFound from "./pages/notfound/NotFound";
import Search from "./pages/search/Search";
import Category from "./pages/category/Category";
import Edit from "./pages/edit/Edit";
import EditPassword from "./pages/edit/EditPassword";
import axios from "axios";
import { DA_URL } from './Request'
import jwtDecode from 'jwt-decode'

function App() {
  const location = useLocation();
  const [path, setPath] = useState('/')
  const [rec, setRec] = useState({})
  
  const session = window.sessionStorage
  let userInfo;
  try {
    const token = session.getItem('access-token-jwt')
    session.setItem('userInfo', JSON.stringify(jwtDecode(token)))
    userInfo = jwtDecode(token)
    console.log(userInfo)
  }
  catch {
    console.log('사용자 인증 정보가 없습니다.')
  }

  if (userInfo){
    axios({
      method: 'get',
      baseURL: DA_URL,
      url: `/recommend/size/${userInfo.id}`
    })
    .then(res => setRec(res.data))
    .catch(err => console.log(err))
  }
  
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
        <Route path="/search" component={Search} />
        <Route path="/edit-mypage" component={Edit} />
        <Route path="/edit-password" component={EditPassword} />
        <Route path="/main" component={Main} exact />
        <Route path="/tpo" component={Tpo} exact />
        <Route path="/recommend_codi/:tpo" component={RecommendCodi} exact />
        <Route path="/recommend" exact>
          <Recommend rec={rec} />
        </Route>
        <Route path="/item/:id" component={ItemDetail} exact />
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
