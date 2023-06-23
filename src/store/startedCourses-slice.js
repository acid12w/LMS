import { createSlice } from "@reduxjs/toolkit";

const startedCoursesSlice = createSlice({
  name: "startedCourses",
  initialState: { courses: [] },
  reducers: {
    addStartedCourse(state, action) {
      const newCourse = action.payload;
      const existingCourse = state.courses.find(
        (course) => course.id === newCourse.id
      );
      if (!existingCourse) {
        state.courses.push(action.payload);
      }
    },
  },
});
export const staredCoursesActions = startedCoursesSlice.actions;

export default startedCoursesSlice;
