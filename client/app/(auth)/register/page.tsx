"use client"
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material';
import React from 'react'
import { RegisterData, registerSchema } from './type';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axiosInstance';
export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data: RegisterData) => {
        try {
            console.log(data);
            let res = axiosInstance.post("/")
        } catch (error) {
            
        }
      
    };


    return <Box className="flex justify-center items-center h-screen">
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
        >
            <TextField
                label="Tên đăng nhập"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                fullWidth
            />

            <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
            />

            <TextField
                label="Mật khẩu"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
            />

            <Button type="submit" variant="contained" color="primary">
                Đăng ký
            </Button>
        </Box>
    </Box>

}
