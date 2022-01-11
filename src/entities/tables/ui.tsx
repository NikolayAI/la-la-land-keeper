import React, { useEffect, useRef } from 'react';import { useStore } from 'effector-react';import { IconButton } from '@mui/material';import PlayArrowIcon from '@mui/icons-material/PlayArrow';import PauseIcon from '@mui/icons-material/Pause';import { tablesModel } from '.';import { IStopProductTableTimerParams } from '../../features/tableProduct/stopTableProductTimer';import { IPlayTableProductTimerParams } from '../../features/tableProduct/playTableProductTimer';import {  ISetTableProductTimerParams,  TableProductTimerStatuses} from '../../shared/api';interface IProductTimer {  tableId: string;  productId: string;  timerCount: number;  minutesLimit: number;  productUnits: number;  handleSetTimer: (payload: ISetTableProductTimerParams) => void;  handleStopTimer: (payload: IStopProductTableTimerParams) => void;  handlePlayTimer: (payload: IPlayTableProductTimerParams) => void;}interface ITableProductTimerRef {  interval: NodeJS.Timeout | null;  value: number;  isTimerPlay: boolean;}export const TableProductTimer: React.FC<IProductTimer> = ({  tableId,  productId,  timerCount,  minutesLimit,  productUnits,  handleSetTimer,  handleStopTimer,  handlePlayTimer,}) => {  const { timerStatus } = useStore(tablesModel.$tables)[tableId].products[productId];  const ref = useRef<ITableProductTimerRef>({    interval: null,    value: 0,    isTimerPlay: true  });  const isTimerPlay = timerStatus === TableProductTimerStatuses.PLAY;  ref.current.value = timerCount;  ref.current.isTimerPlay = isTimerPlay;  useEffect(() => {    if (!ref.current.isTimerPlay) {      if (ref.current.interval) {        clearInterval(ref.current.interval);        ref.current.interval = null;      }    }    if (ref.current.isTimerPlay) {      if (!ref.current.interval) {        ref.current.interval = setInterval(() => {          handleSetTimer({            tableId,            productId,            value: ++ref.current.value          });        }, 1000);      }    }    return () => {      if (ref.current.interval) {        clearInterval(ref.current.interval);        ref.current.interval = null;      }    };  }, [timerStatus]);  const handlePause = () => {    handleStopTimer({      tableId,      productId,      value: TableProductTimerStatuses.STOP,    });  };  const handlePlay = () => {    handlePlayTimer({      tableId,      productId,      value: TableProductTimerStatuses.PLAY,    });  };  return (    <>      <IconButton color="primary" size="small" sx={{ cursor: 'default' }}>        {`${timerCount}`}      </IconButton>      <IconButton color="default" size="small" sx={{ cursor: 'default' }}>        / {minutesLimit * productUnits}      </IconButton>      {        isTimerPlay ? (          <IconButton size="small" onClick={handlePause}>            <PauseIcon fontSize="small" />          </IconButton>        ) : (          <IconButton size="small" onClick={handlePlay}>            <PlayArrowIcon fontSize="small" />          </IconButton>        )      }    </>  );};