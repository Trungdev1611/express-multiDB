import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Tên đăng nhập là bắt buộc")
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
    .max(20, "Tên đăng nhập không được vượt quá 20 ký tự"),

  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),

  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(30, "Mật khẩu không được vượt quá 30 ký tự"),
  
});


export type RegisterData = yup.InferType<typeof registerSchema>;