import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Index from './pages/index';
import Signup from './pages/signup';
import LogIn from './pages/LogIn';
import Nav from './components/Nav';
import Profile from './pages/Profile';
import PrivRoute from './components/PrivRoute';
import Quiz from './pages/Quiz';
import TestComponents from './pages/TestComponents';
import Terms from './pages/Terms';
import Courses from './pages/Courses'
export default function App() {
  return(
  <BrowserRouter>
  <Nav/>
  <Routes>
    <Route path="/" element={<Index/>}/>
    <Route path="/sign-up" element={<Signup/>}/>
    <Route path="/log-in" element={<LogIn/>}/>
    <Route element={<PrivRoute/>} >
    <Route path="/profile" element={<Profile/>}/>
    </Route>
    <Route path="/quiz" element={<Quiz/>}/>
    <Route path="/test" element={<TestComponents/>}/>
    <Route path="/quiz/math" render={() => <Quiz type="math" />} />
      <Route path="/quiz/science" render={() => <Quiz type="science" />} />
      <Route path="/terms" element={<Terms/>}></Route>
      <Route path="/courses" element={<Courses/>}></Route>

  </Routes>
  </BrowserRouter>
  )
}
