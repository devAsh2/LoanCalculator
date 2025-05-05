import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Switch, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import type {Theme} from '@mui/material';
import { Menu as MenuIcon, Sun, Moon } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Exchange Rates (Live)', href: '/exchange-rates' },
  { name: 'About', href: '/about' },
  { name: 'Error Page', href: '/error-example' },
];

const Header: React.FC = () => {
  const { mode, toggleColorMode } = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {navigation.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.href}
                onClick={() => toggleDrawer(false)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sun size={20} />
          <Switch
            checked={mode === 'dark'}
            onChange={toggleColorMode}
            color="default"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
          <Moon size={20} />
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="sticky" sx={{ transition: 'all 0.3s ease' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            letterSpacing: 0.5
          }}
        >
          Loan Calculator
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            {mobileMenu}
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.href}
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Sun size={20} />
              <Switch
                checked={mode === 'dark'}
                onChange={toggleColorMode}
                color="default"
                inputProps={{ 'aria-label': 'toggle dark mode' }}
              />
              <Moon size={20} />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;