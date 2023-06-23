import { createSlice } from "@reduxjs/toolkit";

// import DUMMY_DATA from "./data";

// const initialState = { courses: DUMMY_DATA };

const courseSlice = createSlice({
  name: "courses",
  initialState: { courses: [], myCourses: [], changed: false },
  reducers: {
    addCourse(state, action) {
      const newCourse = action.payload;
      const existingCourse = state.courses.find(
        (course) => course.id === newCourse.id
      );
      state.changed = true;
      if (!existingCourse) {
        state.courses.push(action.payload);
      }
    },
    replaceCourses(state, action) {
      state.courses = action.payload.courses;
    },
    replaceMyCourses(state, action) {
      state.myCourses = action.payload.courses;
    },
    addComment(state, action) {
      const courseIndex = state.courses.findIndex(
        (course) => course.id === action.payload.courseId
      );
      const currentCourse = state.courses[courseIndex];

      const lessonIndex = currentCourse.lessons.findIndex(
        (lesson) => lesson.id === action.payload.lessonId
      );

      const discussion = currentCourse.lessons[lessonIndex].discussion;

      discussion.push(action.payload.commentData);
    },
    addReply(state, action) {
      const courseIndex = state.courses.findIndex(
        (course) => course.id === action.payload.courseId
      );
      const currentCourse = state.courses[courseIndex];

      const lessonIndex = currentCourse.lessons.findIndex(
        (lesson) => lesson.id === action.payload.lessonId
      );
      const discussionIndex = currentCourse.lessons[
        lessonIndex
      ].discussion.findIndex(
        (discussion) => discussion.id === action.payload.discussionId
      );

      const replys =
        currentCourse.lessons[lessonIndex].discussion[discussionIndex].replys;

      replys.push(action.payload.commentData);
    },
    rateCourse(state, action) {
      const courseIndex = state.courses.findIndex(
        (course) => course.id === action.payload.courseId
      );
      const currentCourse = state.courses[courseIndex];

      const existingRaing = currentCourse.rating;
      let currentRating = action.payload.rating;

      const newRating = (existingRaing + currentRating) / 2;
      currentCourse.rating = newRating;
      currentCourse.rated = 1;
    },
    increaseCurrentCourse(state, action) {
      const courseIndex = state.courses.findIndex(
        (course) => course._id === action.payload.courseId
      );

      const currentCourse = state.courses[courseIndex];

      if (currentCourse.completedLessons >= action.payload.currentLesson)
        return;

      currentCourse.completedLessons += 1;
    },
    isChanged(state) {
      state.changed = !state.changed;
    },
  },
});

export const courseActions = courseSlice.actions;

export default courseSlice;
