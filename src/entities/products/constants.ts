import { TableProductTimerStatuses } from '@/shared';

export const defaultProduct = {
  id: '',
  title: '',
  price: 0,
  isPiece: true,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
};

export const backgroundColors = {
  [TableProductTimerStatuses.play]: 'inherit',
  [TableProductTimerStatuses.stop]: '#ed6c02',
};
