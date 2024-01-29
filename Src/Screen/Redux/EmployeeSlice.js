// slices/employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basicInfo: { firstName: "", lastName: "", phone: "", gender: "", dob: "" },
  skills: { skillName: "", experience: "", skillLevel: "" },
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      console.log("hi", action);
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    setSkills: (state, action) => {
      console.log("hi2", action);

      state.skills = { ...state.skills, ...action.payload };
    },
  },
});

export const { setBasicInfo, setSkills } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
