import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import { Footer } from "./components/Layout/Footer";
import { MainNaviagtion } from "./components/Layout/MainNaviagtion";


import { Roller } from "react-awesome-spinners";

// import { Roller } from "react-awesome-spinners";

import RequireAuth from "./pages/RequireAuth";
import Alert from "./components/UI/Alert";

const Home = React.lazy(() => import("./pages/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const NotFound = React.lazy(() => import("./pages/NotFoundPage"));
const CourseDetail = React.lazy(() => import("./pages/CourseDetailPage"));
const NewCourse = React.lazy(() => import("./pages/NewCoursePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const MyCoursePage = React.lazy(() => import("./pages/MyCoursePage"));
const CourseOverview = React.lazy(() => import("./pages/CourseOverviewPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

function App() {
  const alert = useSelector((state) => state.ui.Alert);

  return (
    <div className="App">
      <MainNaviagtion />
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Roller color="lightgray" />

            {/* <Roller color="lightgray" /> */}
            <p>...ƒ</p>

          </div>
        }
      >
        <Alert
          status={alert?.status}
          title={alert?.title}
          message={alert?.message}
        />
        <Routes>
          <Route path="/home" element={<Home />} />
          
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/course-overview/:id" element={<CourseOverview />} />
          <Route path="/user" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route element={<RequireAuth />}>
            <Route
              path="/course/:courseName/:lesson/:id/*"
              element={<CourseDetail />}
            />
            <Route path="/new-course" element={<NewCourse />} />
            <Route path="/my-course/*" element={<MyCoursePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
