import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import HeaderComp from "./Components/Public/HeaderComp";
import LecturesPage from "./Pages/Teacher/LecturesPage";
import StuLecturePage from "./Pages/Student/LecturesPage";
import PageTitle from "./Components/Public/PageTitle";
import DetailsPage from "./Pages/Teacher/DetailsPage";
import FooterComp from "./Components/Public/FooterComp";
import ReadQrPage from "./Pages/Student/ReadQrPage";
import InfoPage from "./Pages/Teacher/InfoPage";
import StudentInfoPage from "./Pages/Student/InfoPage";
import InstructorRegisterPage from "./Pages/Auth/InstructorRegisterPage";
import StudentRegisterPage from "./Pages/Auth/StudentRegisterPage";
import LoginPage from "./Pages/Auth/LoginPage";
import NotFound from "./Pages/NotFound";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import { NotifyContainer } from "./Components/Public/notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { InitiateAuth } from "./redux/action/AuthAction";
import CreateLecturePage from "./Pages/Teacher/CreateLecturePage";
import ForgetPasswordPage from "./Pages/Auth/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";

function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitiateAuth())
  } , [])
  return (
    <BrowserRouter>
      <div className="flex-1 w-full">
        <HeaderComp/>
        <NotifyContainer/>
        <PageTitle/>
        <Routes>
          {/* public  */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<AboutUsPage/>} />
          <Route path="/contact" element={<ContactUsPage/>} />
          <Route path="/*" element={<NotFound/>}/>
          <Route path="/qr" element={<ReadQrPage/>} />

          {/* instructor */}
          {
            state.Auth.role === 1 ? (
              <>
                <Route path="/lectures/instructor" element={<LecturesPage/>} />
                <Route path="/lecture/create" element={<CreateLecturePage/>} />
                <Route path="/details/:id" element={<DetailsPage/>} />
                <Route path="/info/instructor" element={<InfoPage/>} />
              </>
            ) : null
          }

          {/* student */}
          {
            state.Auth.role === 2 ? (
              <>
                <Route path="/lectures/student" element={<StuLecturePage/>} />
                <Route path="/qr/read" element={<ReadQrPage/>} />
                <Route path="/info/student" element={<StudentInfoPage/>} />
              </>
            ) : null
          }

          {/* auth */}
          {
            !state.Auth.token ? (
              <>
                <Route path="/auth/register/instructor" element={<InstructorRegisterPage/>} />
                <Route path="/auth/register/student" element={<StudentRegisterPage/>} />
                <Route path="/auth/login" element={<LoginPage/>} />
                <Route path="/auth/forgetpassword" element={<ForgetPasswordPage/>} />
                <Route path="/auth/resetpassword" element={<ResetPasswordPage/>} />
              </>
            ) : null
          }
        </Routes>
      </div>
      <FooterComp/>
    </BrowserRouter>
  );
}

export default App;
