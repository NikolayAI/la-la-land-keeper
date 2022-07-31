import { TableCellProps } from '@mui/material/TableCell/TableCell';

export const defaultProduct = {
  id: '',
  name: '',
  price: 0,
  isPiece: true,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
};
export const columns: (TableCellProps & { headerName: string })[] = [
  { headerName: 'Название' },
  { headerName: 'Штучный', align: 'right' },
  { headerName: 'Таймер', align: 'right' },
  { headerName: 'Цена/1шт', align: 'right' },
  { headerName: 'Действия', align: 'center' },
];
