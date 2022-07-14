import MenuIcon from '@mui/icons-material/Menu';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Toolbar } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

import { productModel, ProductUI } from '@/features/product';
import { SettingUI } from '@/features/setting';
import { TableUI } from '@/features/table';

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
    <AppBar position="fixed" sx={{ marginBottom: 2 }} open={open}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            '& button:not(:first-child)': { marginRight: '1rem', border: `1px solid #fff` },
          }}
        >
          <IconButton
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
          <TableUI.CreateBtn />
          <LoadingButton
            role="open-create-product-form-header-button"
            variant="contained"
            loading={useUnit(productModel.$isCreateLoading)}
            onClick={() => {
              productModel.openCreateForm();
            }}
          >
            Создать товар
          </LoadingButton>
          <LoadingButton
            role="open-remove-product-form-button"
            variant="contained"
            loading={useUnit(productModel.$isRemoveLoading)}
            onClick={(event) => {
              productModel.setRemoveAnchorEl(event.currentTarget);
            }}
          >
            Удалить товар
          </LoadingButton>
          <ProductUI.RemoveMenu />
          <Box sx={{ marginLeft: 'auto' }}>
            <SettingUI.ColorThemeSwitch />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
