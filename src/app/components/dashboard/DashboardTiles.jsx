"use client"
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const services = [
  { name: 'CEEW Chat', link: '/ceew-chat' },
  { name: 'Translation', link: '/translation' },
  { name: 'Data Analytics', link: '/data-analytics' },
];

const DashboardTiles = () => {
  const router = useRouter();

  const handleNavigation = (link) => {
    router.push(link);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={1}
              sx={{ padding: 2, cursor: 'pointer', textAlign: 'center' }}
              onClick={() => handleNavigation(service.link)}
            >
              <Typography variant="h6">{service.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardTiles;
