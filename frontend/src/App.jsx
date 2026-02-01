import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Payment from "./compenents/courses/Payment";
import Course from "./compenents/courses/Course";
import PreviewCourse from "./compenents/courses/PreviewCourse";
import Quiz from "./compenents/courses/Quiz";
import StudentDashboard from "./compenents/studentDashboard/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./compenents/scrolltotop";
import NotFound from "./pages/NotFound";
import Footer from "./compenents/Footer";

function App() {
  const location = useLocation();
  const hidefooter = location.pathname.startsWith('/admindashboard')
  return (
    <>
    <div className="flex flex-col bg-gradient-to-t from-[#DAE6FF]/20 to-[#ffffff]/100">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/PreviewCourse" element={<PreviewCourse/>}/>
        <Route path="/Course" element={<Course/>}/>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {!hidefooter && <button className="mb-40"></button>}
    </div>
    {!hidefooter && <Footer />}
    </>
  )
}

export default App;

