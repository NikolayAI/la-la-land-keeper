import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React, { FC, ReactNode, useState } from 'react';

import { Drawer, DrawerHeader } from '@/widgets/drawer';
import { Header } from '@/widgets/header';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className="layout" sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box className="layout__header-margin-container" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader className="layout__header-margin" />
        {children}
      </Box>
    </Box>
  );
};
