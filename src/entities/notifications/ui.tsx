import React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { INotification } from './types';

interface INotificationProps {
  notifications: INotification[];
  handleCloseNotification: (payload: INotification) => void;
}

export const Notifications: React.FC<INotificationProps> = React.memo(({
  handleCloseNotification,
  notifications,
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%', position: 'absolute', bottom: 0 }}>
      {
        notifications.map(({ kind, message, tableId, productId }) => (
          <Alert
            key={`${tableId}-${productId}-${kind}-${message}`}
            onClose={() => handleCloseNotification({
              kind,
              message,
              tableId,
              productId
            })}
            severity={`${kind}`}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        ))
      }
    </Stack>
  );
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
