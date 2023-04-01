
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Appbar from './components/appbar/Appbar'
import { usecontext } from './components/store/contextApi'
import HOME from './pages/HOME'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Settings from './pages/Settings'
import SinglePostPage from './pages/SinglePostPage'
import WritePage from './pages/WritePage'

function App() {
const {user} = usecontext()
console.log(user);
  return (
    <BrowserRouter>
    <div className="App w-full min-h-screen relative">
   
     <Appbar/>

     <Routes>
        <Route path='/' element={ <HOME/>}/>
        <Route path='/login'  element={user? <HOME/>:<Login/>}/>
        <Route path='/register'  element={user? <HOME/> :<Logout/>}/>
        <Route path='/writepost'  element={user? <WritePage/>:<Logout/>}/>
        <Route path='/settings'  element={user?<Settings/>:<Logout/>}/>
        <Route path='/post/:id'  element={<SinglePostPage/>}/>
     </Routes>
   
   
    </div>
    </BrowserRouter>
  )
}

export default App
