
// Create a layout for protected routes: app/(protected-routes)/layout.js
"use client"
import { Box, AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from '../context/ReactQueryProvider';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <>
      <ReactQueryProvider>
        <AppRouterCacheProvider>
          {/* <ThemeProvider theme={theme}> */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Top Navigation Bar */}
            <AppBar position="fixed" elevation={4} sx={{ background: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left Section */}
                <Link href={"/dashboard"} style={{ textDecoration: "none" }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" noWrap component="div" color='primary'>
                      CEEW
                    </Typography>
                  </Box>
                </Link>

                {/* Right Section */}
                <IconButton edge="end" color="inherit" aria-label="menu">
                  <Avatar src={user?.picture} />
                </IconButton>
              </Toolbar>
            </AppBar>

            {/* Page Content */}
            <Box
              className="main-window"
              sx={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                paddingTop: '80px', // Adjust padding to account for AppBar height
                flexGrow: 1,
                height: "calc(100vh - 100px)"
              }}
            >
              {children}
            </Box>
          </Box>
          {/* </ThemeProvider> */}
        </AppRouterCacheProvider>
      </ReactQueryProvider>
      <ToastContainer />
    </>
  );
}
