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
import jwtDecode from "jwt-decode";
import axios from 'axios'
import {DA_URL} from './Request'

function App() {
  console.log('나 재 랜더링되는 중')
  const location = useLocation();
  const [user, setUser] = useState({})
  const [size, setSize] = useState({})
  const [color, setColor] = useState({})
  const [style, setStyle] = useState({})
  const [category, setCategory] = useState({})
  
  const session = window.sessionStorage
  try {
    const token = session.getItem('access-token-jwt')
    session.setItem('userInfo', JSON.stringify(jwtDecode(token)))
    if (!Object.keys(user).length){setUser(jwtDecode(token))}
  }
  catch {
    console.log('사용자 인증 정보가 없습니다.')
  }

  const getRec = async function(path){
    let response;
    await axios({
      method: 'get',
      baseURL: DA_URL,
      url: `/recommend/${path}/${user.id}`
    })
    .then(res => response = res.data)
    .catch(err => console.log(err))

    return response
  }


  const getRecAll = async () => {
    const local = window.localStorage

    if (!Object.keys(size).length){
      console.log('사이즈?')
      if (!local.getItem('size-rec')){
        local.setItem('size-rec', JSON.stringify(await getRec('size')))
      }
      setSize(JSON.parse(local.getItem('size-rec')))
    }
  }
  

  useEffect(() => {
    if (Object.keys(user).length){
      getRecAll()
    }
  }, [])


  return (
    <div className="App" key={location.pathname}>
      <Switch>
        <Route path="/" component={Start} exact />
        <Route path="/search" component={Search} />
        <Route path="/edit-mypage" component={Edit} />
        <Route path="/edit-password" component={EditPassword} />
        <Route path="/main" component={Main} exact />
        <Route path="/tpo" component={Tpo} exact />
        <Route path="/recommend_codi/:tpo" component={RecommendCodi} exact />
        <Route path="/recommend" exact>
          <Recommend recommend={{size: size, color: color, style: style, category: category}} setter={{color: setColor, style: setStyle, category: setCategory}} getter={getRec} />
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
