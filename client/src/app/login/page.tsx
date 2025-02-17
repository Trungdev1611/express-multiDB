'use client';

import api from '@/util/api';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation'
interface LoginFormValues {
    username: string;
    password: string;
}

const schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
}).required();


const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(schema),
    });
    const router = useRouter()
   
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        try {
            const  res = await api.post<{token: string, message: string}>('/auth/login', data);
            localStorage.setItem("token", res.data.token)
            router.push("/users")
            console.log('Logging in with:', data,  res);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <div className=''>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} className='w-1/2  min-w-[400px] max-w-[500px] '>

                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Username
                    </Typography>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        margin="normal"
                        autoComplete='off'
                    />

                    <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
                        Password
                    </Typography>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        margin="normal"
                        autoComplete='off'

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default LoginForm;
