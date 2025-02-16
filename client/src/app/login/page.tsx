'use client';

import api from '@/util/api';
import {  Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        try {
            await api.post('/auth', data);
            console.log('Logging in with:', data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
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
    
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        {...register('username', { required: 'Username is required' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        margin="normal"
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        margin="normal"
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
        </Container>
    );
};

export default LoginForm;
