import { createSlice } from "@reduxjs/toolkit";

const favoriteCoursesSlice = createSlice({
  name: "favoriteCourses",
  initialState: { courses: [] },
  reducers: {
    addFavoriteCourse(state, action) {
      const newCourse = action.payload;
      const existingCourse = state.courses.find(
        (course) => course.id === newCourse.id
      );
      if (!existingCourse) {
        state.courses.push(newCourse);
        return;
      }
      let newCourseArr;
      if (existingCourse) {
        newCourseArr = state.courses.filter(
          (course) => course.id !== newCourse.id
        );
        return { courses: newCourseArr || [] };
      }
    },
  },
});
export const favoriteCoursesSliceActions = favoriteCoursesSlice.actions;

export default favoriteCoursesSlice;
