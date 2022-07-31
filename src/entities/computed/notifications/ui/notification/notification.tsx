import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useStore } from 'effector-react';
import React, { FC, forwardRef, memo } from 'react';

import { $tableProductsTimersNotifications, removeNotification } from '../../model/model';

export const Notifications: FC = memo(() => {
  const tableProductsTimersNotifications = useStore($tableProductsTimersNotifications);
  return (
    <Stack className="notifications" spacing={2} sx={{ width: '100%', position: 'absolute', bottom: 0 }}>
      {tableProductsTimersNotifications.map(({ kind, message, tableId, productId }) => (
        <Alert
          className="notifications__message"
          key={`${tableId}-${productId}-${kind}-${message}`}
          onClose={() => {
            removeNotification({
              kind,
              message,
              tableId,
              productId,
            });
          }}
          severity={`${kind}`}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      ))}
    </Stack>
  );
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
