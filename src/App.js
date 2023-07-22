import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import { Footer } from "./components/Layout/Footer";
import { MainNaviagtion } from "./components/Layout/MainNaviagtion";
import { AuthProvider } from "./context/AuthProvider";

import RequireAuth from "./pages/RequireAuth";
import Alert from "./components/UI/Alert";
import { PersistLogin } from "./pages/PersistLogin";

const Home = React.lazy(() => import("./pages/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const NotFound = React.lazy(() => import("./pages/NotFoundPage"));
const CourseDetail = React.lazy(() => import("./pages/CourseDetailPage"));
const NewCourse = React.lazy(() => import("./pages/NewCoursePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const MyCoursePage = React.lazy(() => import("./pages/MyCoursePage"));
const CourseOverview = React.lazy(() => import("./pages/CourseOverviewPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));  



function App() {
  const alert = useSelector((state) => state.ui.Alert);

  return (
    <div className="App">
      <MainNaviagtion />
      <Suspense
        fallback={
            <p>...Loading</p>
        }
      >
        <Alert
          status={alert?.status}
          title={alert?.title}
          message={alert?.message}
        />
        <Routes>
          <Route path="/course-overview/:id" element={<CourseOverview />} />
          <Route path="/user" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
         
            <Route element={<PersistLogin/>}>
              <Route path="/" element={<Home />} />
              {/* <Route path="/" element={<Navigate to="/home" />} />   */}
              <Route element={<RequireAuth allowedRole={["student"]}/>}>
                <Route
                  path="/:courseName/:id/:lesson/*"
                  element={<CourseDetail /> } 
                />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route element={<RequireAuth allowedRole={["Instructor"]}/>}>
                <Route path="/new-course" element={<NewCourse />} />
                <Route path="/my-course/*" element={<MyCoursePage />} />
              </Route>
            </Route>
      

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
