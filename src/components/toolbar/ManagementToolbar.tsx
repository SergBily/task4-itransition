import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import BlockIcon from '@mui/icons-material/Block';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import UserService from '../../services/UserService';
import toastPostionBottom from '../../libs/toat-position';
import { getLocalStorage, removeLocalStorage } from '../../libs/localStorage';
import { UserAuthResponse } from '../../models/AuthResponse';
import { getAllUsers } from '../../redux/features/managementSlice';
import { AppDispatch } from '../../redux/Store';
import createToastMessage from '../../libs/toastMessage';

interface ManagementToolbarProps {
  summuaryId: readonly string[];
}

const ManagementToolbar = (props: ManagementToolbarProps) => {
  const [action, setAction] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [action]);

  const { summuaryId } = props;

  const onDelete = async () => {
    const user = (getLocalStorage('user') as UserAuthResponse).id;
    try {
      await UserService.deleteUsers([...summuaryId]);
      toast.success(createToastMessage('delete', [...summuaryId]), toastPostionBottom);
      setAction(!action);
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message, toastPostionBottom);
    }
    if (summuaryId.includes(user)) {
      removeLocalStorage('user');
      removeLocalStorage('token');
      window.location.href = '/login';
    }
  };

  const onBlock = async () => {
    const user = (getLocalStorage('user') as UserAuthResponse).id;
    try {
      await UserService.blockAndUnblockUsers({ summuaryId: [...summuaryId], access: 'blocked' });
      toast.success(createToastMessage('blocked', [...summuaryId]), toastPostionBottom);
      setAction(!action);
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message, toastPostionBottom);
    }
    if (summuaryId.includes(user)) {
      removeLocalStorage('user');
      removeLocalStorage('token');
      window.location.href = '/login';
    }
  };

  const onUnblock = async () => {
    try {
      await UserService.blockAndUnblockUsers({ summuaryId: [...summuaryId], access: 'unblocked' });
      toast.success(createToastMessage('unblocked', [...summuaryId]), toastPostionBottom);
      setAction(!action);
    } catch (e) {
      const error = e as AxiosError;
      toast.error(error.message, toastPostionBottom);
      removeLocalStorage('user');
      removeLocalStorage('token');
      window.location.href = 'registration';
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(summuaryId.length > 0 && {
          bgcolor: (theme) => alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity,
          ),
        }),
      }}
    >
      {summuaryId.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {summuaryId}
          {' '}
          selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          USERS
        </Typography>
      )}
      {summuaryId.length > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={onDelete} id="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="block">
            <IconButton onClick={onBlock} id="block">
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <button
            type="button"
            id="unblock"
            onClick={onUnblock}
            style={{
              border: 0, background: 0, cursor: 'pointer', marginLeft: '10px',
            }}
          >
            Unblock
          </button>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default ManagementToolbar;
