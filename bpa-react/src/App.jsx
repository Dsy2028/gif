import { BrowserRouter, Routes, Route ,useLocation} from 'react-router-dom';
import Index from './pages/Index';
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
import HarderQuestions from './pages/HarderQuestions';
import TeacherProfile from './components/TeacherProfile';
import Intro from './pages/Intro';
import Recap from './pages/Recap'
import Privacy from './pages/Privacy'
import Userguide from './pages/Userguide';
import Workcited from './pages/Workcited';
import TeachRoute from './components/TeachRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminAdd from './pages/AdminAdd';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import Contact from './pages/contact';
//import './App.css';
//import ImageSlider from './components/ImageSlider';
//import { SliderData } from './components/SliderData';

//function App() {
  //return <ImageSlider slides={SliderData} />;
//}
export default function App() {

  

  const paths = ['/dashboard', '/classes', '/calender', '/prof', '/admin-dashboard', '/admin-add', '/admin-users', '/admin-courses'];

  return (
    <BrowserRouter>
      {!paths.some(path => location.pathname.includes(path)) && <Nav />}
      <Routes>
        <Route path="/prof/:teacherId" element={<TeacherProfile />} />
        <Route path="/:topicId/:flashCardId/review" element={<FlashCard />} />
        <Route path="/:topicId/:recapId/recap" element={<Recap />} />
        <Route path="/" element={<Index />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route element={<PrivRoute/>} >
       <Route path="/profile/:studentId" element={<Profile/>}/>
       </Route>
        <Route path="/intro/:topicId/:introId" element={<Intro />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        <Route path="/admin-add" element={<AdminAdd />}/>
        <Route path="/:courses/:courseName/:lessonName/:quiz" element={<Quiz />} />
        <Route path="/practice/:topicId/questions/:questionId" element={<TestComponents />} />
        <Route path="/practice/:topicId/harderQuestions/:harderQuestionsId" element={<HarderQuestions />} />
        <Route path="/courses/:courseName/:lessonName" element={<Topic />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/:topicId/quiz" element={<Quiz />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseName" element={<TopicSkills/>}/>
        <Route path="/help" element={<Help />} />
        {/*<Route element={<TeachRoute/>} >*/}
        <Route path="/dashboard/:teacherId" element={<Dashboard />} />
        {/*</Route>*/}
        <Route path="/classes/:teacherId" element={<Classes />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/about" element ={<About />} />
        <Route path="/Chat" element ={<Chat />} />
        <Route path ="/inbox" element ={<Inbox />}/>
        <Route path='privacy' element={<Privacy/>}/>
        <Route path='/userguide' element={<Userguide/>}/>
        <Route path ='/workcited' element = {<Workcited/>}/>
        <Route path="/admin-courses" element={<AdminCourses />} />
      </Routes>
    </BrowserRouter>
  );
}