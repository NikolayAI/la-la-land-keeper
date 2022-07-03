import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton } from '@mui/material';
import { Identifier } from 'dnd-core';
import { useStore } from 'effector-react';
import React, { FC, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

import { TableIdType, TablesType } from '@/shared';
import { tablesModel, TablesUI } from '@/entities/tables';
import { tableModel, TableUI } from '@/features/table';
import { tableProductModel, TableProductUI } from '@/features/table-product';

import { ProductCardList } from '../product-card';

interface ITableProps {
  tables: TablesType;
  tableId: TableIdType;
  index: number;
}

export const Table: FC<ITableProps> = ({ tables, tableId, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<ITableProps, void, { handlerId: Identifier | null }>({
    accept: 'table',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: ITableProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragItemIndex = item.index;
      const hoverItemIndex = index;

      // Don't replace items with themselves
      if (dragItemIndex === hoverItemIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragItemIndex < hoverItemIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragItemIndex > hoverItemIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      tableModel.dragAndDrop({ dragItemIndex, hoverItemIndex });

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverItemIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'table',
    item: () => {
      return { tableId, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <TablesUI.Table
        key={tableId}
        tableId={tableId}
        tables={tables}
        SetTableNameSlot={<TableUI.SetNameField tableId={tableId} tableName={tables?.[tableId]?.name} />}
        ClearTableSlot={<TableUI.ClearBtn tableId={tableId} />}
        RemoveTableSlot={<TableUI.RemoveBtn tableId={tableId} />}
        AddProductToTableSlot={
          <>
            <IconButton
              role={`add-product-to-table-button-${tableId}`}
              color="inherit"
              disabled={useStore(tableProductModel.$isAddLoading)?.[tableId]}
              onClick={(event) =>
                tableProductModel.setAddAnchorEl({
                  tableId,
                  element: event.currentTarget,
                })
              }
            >
              <AddIcon />
            </IconButton>
            <TableProductUI.AddMenu tableId={tableId} />
          </>
        }
        ProductCardListSlot={<ProductCardList products={tables?.[tableId]?.products} tableId={tableId} />}
      />
    </div>
  );
};

export const TablesList: FC = () => {
  const tables = useStore(tablesModel.$tables);
  const tablesIds = useStore(tablesModel.$tablesIds);

  return (
    <Grid container spacing={0}>
      {tablesIds.map((tableId, index) => (
        <Table key={tableId} tables={tables} tableId={tableId} index={index} />
      ))}
    </Grid>
  );
};
