import { configureStore } from "@reduxjs/toolkit";
import EmployeeApi from "./EmployeeApi";
import EmployeeReducer from "./EmployeeSlice";
const Store = configureStore({
  reducer: {
    [EmployeeApi.reducerPath]: EmployeeApi.reducer,
    EmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(EmployeeApi.middleware),
});

export default Store;
