import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Menu as MuiMenu,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export type MenuProps = React.PropsWithChildren;

export const Menu = ({ children }: MenuProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <MuiMenu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {[].map(page => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </MuiMenu>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {/* <Link color="inherit">Login</Link> */}
        </Box>
      </AppBar>
      {children}
    </>
  );
};
