import * as yup from "yup";

export const schemaCreateUser = yup.object({
    username: yup.string().required("Username is required"),
    department_id: yup.string().required("Department is required"),
    role_id: yup.string().required("Role is required"),
    email: yup.string().email(`email("Invalid email format")`).required("Email is required"),
    password:yup.string().required("Password is required"),
  });