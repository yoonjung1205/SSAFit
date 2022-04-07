/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
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
import Password from "./pages/password/Password";

function App() {
  const history = useHistory()
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
    if (Object.keys(user).length){
      setUser({})
    }
  }

  const getRec = async function(path){
    let response;
    await CustomAxios({
      method: 'get',
      url: `/api_da/recommend/${path}/${user.id}`,
    })
    .then(res => response = res.data)

    return response
  }
  
  const getRecAll = async function(){
    if (!Object.keys(size).length){
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

  useEffect(() => {
    const pathList = [
      '', 'login', 'signup', 'moreinfo', 'search', 'main', 'tpo',
      'recommend', 'password', 'recommend_codi', 'edit-mypage',
      'edit-password', 'recommend', 'item', 'mypage', 'notfound'
    ]
    const anonymousPathList = [
      '', 'login', 'signup', 'moreinfo', 'password', 'notfound'
    ]
    const path = location.pathname.split('/')[1]

    if (pathList.indexOf(path) === -1){
      history.push('/notfound')
    }

    else if (location.pathname === '/main' && location.search){
      const authorize = history.location.search.replace('?', '').split('&')

      authorize.forEach(token => {
        const temp = token.split('=')
        session.setItem(temp[0], temp[1])
      })
      history.push('/main')
    }
    else if (anonymousPathList.indexOf(path) === -1){
      if (!Object.keys(user).length){
        Swal.fire({
          text: '로그인이 필요합니다.',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: 'orange'
        }).then(() => history.push('/login'))
      }
    }
    else if (location.pathname === '/signup' || location.pathname === '/moreinfo' || location.pathname === '/login'){
      if (Object.keys(user).length){
        history.push('/main')
      }
    }
  }, [location])


  return (
    <div className="App" key={location.pathname}>
      <Switch>

        <Route path="/" component={Start} exact />

        <Route path="/login" component={Login} exact />

        <Route path="/signup" component={Signup} exact />

        <Route path="/moreinfo" component={Moreinfo} exact />

        <Route path="/search" component={Search} exact />
        
        <Route path="/main" component={Main} exact />

        <Route path="/tpo" component={Tpo} exact/>

        <Route path="/recommend/:category" component={Category} exact />

        <Route path="/password" component={Password} exact />

        <Route path="/recommend_codi/:tpo" exact >
          <RecommendCodi user={user} />
        </Route>

        <Route path="/edit-mypage" exact>
          <Edit user={user} setSize={setSize} />
        </Route>
        
        <Route path="/edit-password" exact>
          <EditPassword user={user} />
        </Route>

        <Route path="/recommend" exact >
          <Recommend user={user} recommend={{size: size, color: color, style: style, category: category}} setter={{color: setColor, style: setStyle, category: setCategory}} getter={getRec} />
        </Route>

        <Route path="/item/:id" exact>
          <ItemDetail user={user} setColor={setColor} setStyle={setStyle} setCategory={setCategory} />
        </Route>

        <Route path="/mypage" exact>
          <Mypage user={user} />
        </Route>

        <Route component={NotFound} />

      </Switch>
    </div>
  );
}

export default App;
