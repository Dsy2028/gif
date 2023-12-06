import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/flashcard" element={<FlashCard />} />
        <Route path="/" element={<Index />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route
          path="/profile"
          element={
            <PrivRoute>
              <Profile />
            </PrivRoute>
          }
        />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/test" element={<TestComponents />} />
        <Route path="/quiz/math" element={<Quiz type="math" />} />
        <Route path="/quiz/science" element={<Quiz type="science" />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/courses/:topicName"
          element={
            <TopicSkills>
              <Route path="/question/:_id" element={<Skills />} />
            </TopicSkills>
          }
        />
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
