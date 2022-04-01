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
import CustomAxios from './CustomAxios'

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
    const userInfo = JSON.parse(session.getItem('userInfo'))
    
    Object.keys(userInfo).forEach(key => {
      if (user[key] !== userInfo[key]){
        return setUser(userInfo)
      }
    })
  }
  catch {
    console.log('사용자 인증 정보가 없습니다.')
    session.clear()
  }

  const getRec = async function(path){
    let response;
    await CustomAxios({
      method: 'get',
      url: `/api_da/recommend/${path}/${user.id}`,
    })
    .then(res => response = res.data)
    .catch(err => console.log(err))

    return response
  }
  
  const getRecAll = async function(){
    if (!Object.keys(size).length){
      console.log('사이즈?')
      if (!session.getItem('size-rec')){
        try {
          const res = await getRec('size')
          session.setItem('size-rec', JSON.stringify(res))
        }
        catch{}
      }
      setSize(JSON.parse(session.getItem('size-rec')))
    }
  }


  useEffect(() => {
    if (Object.keys(user).length){
      getRecAll()
    }
  })


  return (
    <div className="App" key={location.pathname}>
      <Switch>
        <Route path="/" component={Start} exact />

        <Route path="/main" component={Main} exact />

        <Route path="/login" component={Login} exact />

        <Route path="/signup" component={Signup} exact />

        <Route path="/moreinfo" component={Moreinfo} exact />

        <Route path="/search" component={Search} exact />
        
        <Route path="/edit-mypage" exact>
          <Edit user={user} setUser={setUser} />
        </Route>
        
        <Route path="/edit-password" exact>
          <EditPassword user={user} setUser={setUser} />
        </Route>
        
        <Route path="/tpo" exact >
          <Tpo  user={user} setUser={setUser} />
        </Route>

        <Route path="/recommend_codi/:tpo">
          <RecommendCodi user={user} setUser={setUser} />
        </Route>

        <Route path="/recommend" exact >
          <Recommend recommend={{size: size, color: color, style: style, category: category}} setter={{color: setColor, style: setStyle, category: setCategory}} getter={getRec} />
        </Route>

        <Route path="/item/:id" exact>
          <ItemDetail user={user} setUser={setUser} />
        </Route>

        <Route path="/recommend/:category" exact>
          <Category user={user} setUser={setUser} />
        </Route>

        <Route path="/mypage" exact>
          <Mypage user={user} setUser={setUser} />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
