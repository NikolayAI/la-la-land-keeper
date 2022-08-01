import MenuIcon from '@mui/icons-material/Menu';
import { Box, Toolbar } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

import { SettingUI } from '@/features/setting';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface IHeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export const Header: FC<IHeaderProps> = ({ open = false, handleDrawerOpen }) => {
  return (
    <AppBar className="header" position="fixed" sx={{ marginBottom: 2 }} open={open}>
      <Toolbar className="header__toolbar">
        <Box className="header__actions" sx={{ display: 'flex', width: '100%' }}>
          <IconButton
            className="header__button header__button_menu"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box className="header__switch header__switch_theme" sx={{ marginLeft: 'auto' }}>
            <SettingUI.ColorThemeSwitch />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
