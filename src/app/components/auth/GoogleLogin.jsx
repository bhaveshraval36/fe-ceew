"use client"
import * as React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/app/global_config';

export default function GoogleLogin() {
  const router = useRouter();
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height:"100%"
        }}
      >
        <Typography variant="h3" align="center">
          Welcome to Our App
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 3,
          height:"100%"
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{ mt: 2 }}
          onClick={() => {
            router.push(`${baseUrl}/api/auth/google`)
          }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}
