import { BrowserRouter, Routes, Route ,useLocation} from 'react-router-dom';
import Index from './pages/index';
import Signup from './pages/signup';
import LogIn from './pages/LogIn';
import Nav from './components/Nav';
import Profile from './pages/Profile';
import PrivRoute from './components/PrivRoute';
import Quiz from './pages/Quiz';
import TestComponents from './pages/TestComponents';
import Terms from './pages/Terms';
import Courses from './pages/Courses';
import TopicSkills from './components/TopicSkills';
import Skills from './pages/Skills';
import Help from './pages/Help';
import Dashboard from './pages/Dashboard';
import FlashCard from './pages/FlashCard';
import Classes from './pages/Classes';
import Calender from './pages/Calender';
import Topic from './pages/Topic';
import About from './pages/About';
import Chat from './pages/Chat'
import Inbox from'./pages/Inbox';
export default function App() {
  
  return (
    <BrowserRouter>
      {location.pathname !== '/dashboard' && location.pathname !== '/classes' && location.pathname !== '/calender' &&  <Nav />}
      <Routes>
        <Route path="/:topicId" element={<FlashCard />} />
        <Route path="/" element={<Index />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route element={<PrivRoute/>} >
       <Route path="/profile" element={<Profile/>}/>
       </Route>
        <Route path="/:courses/:courseName/:lessonName/:quiz" element={<Quiz />} />
        <Route path="/:topicId/questions/:questionId" element={<TestComponents />} />
        <Route path="/:topicId/harderQuestions/:harderQuestionsId" element={<HarderQuestions />} />
        <Route path="/courses/:courseName/:lessonName" element={<Topic />} />
        <Route path="/quiz/math" element={<Quiz type="math" />} />
        <Route path="/quiz/science" element={<Quiz type="science" />} /> 
        <Route path="/terms" element={<Terms />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:topicName" element={<TopicSkills/>}/>
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/about" element ={<About />} />
        <Route path="/Chat" element ={<Chat />} />
        <Route path ="/inbox" element ={<Inbox />}/>
      </Routes>
    </BrowserRouter>
  );
}