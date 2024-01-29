import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://dummy.restapiexample.com";

export const EmployeeApi = createApi({
  reducerPath: "EmployeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: () => `/api/v1/employees`,
    }),
    createEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: "/api/v1/create",
        method: "POST",
        body: newEmployee,
      }),
    }),
    updateEmployee: builder.mutation({
      query: ({ id, updatedEmployee }) => ({
        url: `/api/v1/update/${id}`,
        method: "PUT",
        body: updatedEmployee,
      }),
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} = EmployeeApi;

export default EmployeeApi;
