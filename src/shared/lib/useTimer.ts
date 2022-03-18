import { useEffect, useRef } from 'react';import { dateToSeconds } from './formatDate';import { getLocalStorage, setLocalStorage } from './localStorage';import {  ISetTablesProductsTimersParams,  TableProductTimerStatuses} from '../api';const tablesProductsTimersKey = 'tablesProductsTimers';interface IUseTimer {  tableId: string;  productId: string;  createdAt: string | Date,  isTimerPlay: boolean;  timerStatus: TableProductTimerStatuses;  interval: number;  setTimer: (payload: ISetTablesProductsTimersParams) => void;}export interface ITableProductTimerRef {  intervalId: NodeJS.Timeout | null;  isTimerPlay: boolean;  pausedAt: Date | null;  pausedTimerCount: number;}export const useTimer = ({  tableId,  productId,  createdAt,  isTimerPlay,  timerStatus,  interval,  setTimer,}: IUseTimer) => {  const ref = useRef<ITableProductTimerRef>({    intervalId: null,    isTimerPlay: false,    pausedAt: null,    pausedTimerCount: 0,  });  ref.current.isTimerPlay = isTimerPlay;  const updateStorage = () => {    setLocalStorage({      key: tablesProductsTimersKey,      value: {        [tableId]: {          [productId]: {            pausedAt: ref.current.pausedAt,            pausedTimerCount: ref.current.pausedTimerCount,          }        }      }    });  };  const calculateTimerCount = () => {    return dateToSeconds(Number(new Date()) + Number(new Date(createdAt)) - ref.current.pausedTimerCount);  };  const calculatePausedTimerCount = () => {    const pausedAt = ref.current.pausedAt ? ref.current.pausedAt : 0;    // @ts-ignore    ref.current.pausedTimerCount = ref.current.pausedTimerCount + (new Date() - new Date(pausedAt));  };  const setTimerCount = () => {    setTimer({      tableId,      productId,      value: calculateTimerCount(),    });  };  useEffect(() => {    const timers = getLocalStorage({ key: tablesProductsTimersKey });    ref.current.pausedAt = timers[tableId]?.[productId]?.pausedAt ?? null;    ref.current.pausedTimerCount = timers[tableId]?.[productId]?.pausedTimerCount ?? 0;    calculatePausedTimerCount();    setTimerCount();  }, []);  useEffect(() => {    if (!ref.current.isTimerPlay) {      ref.current.pausedAt = new Date();      calculatePausedTimerCount();      updateStorage();    }    if (ref.current.isTimerPlay) {      calculatePausedTimerCount();      updateStorage();      if (!ref.current.intervalId) {        ref.current.intervalId = setInterval(() => {          setTimerCount();        }, interval);      }    }    return () => {      if (ref.current.intervalId) {        clearInterval(ref.current.intervalId);        ref.current.intervalId = null;      }    };  }, [timerStatus]);};