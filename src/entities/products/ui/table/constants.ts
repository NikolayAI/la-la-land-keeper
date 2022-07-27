import { TableCellProps } from '@mui/material/TableCell/TableCell';

export const columns: (TableCellProps & { headerName: string })[] = [
  { headerName: 'Название' },
  { headerName: 'Штучный', align: 'right' },
  { headerName: 'Таймер', align: 'right' },
  { headerName: 'Цена/1шт', align: 'right' },
  { headerName: 'Действия', align: 'center' },
];
