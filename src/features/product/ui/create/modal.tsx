import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MaterialModal from '@mui/material/Modal';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

import { $isModalOpen, closeCreateForm, create, $product, setProperty } from '../../model/create/model';

interface IModalProps {
  className?: string;
}

export const Modal: FC<IModalProps> = ({ className }) => {
  const isOpen = useStore($isModalOpen);
  const product = useStore($product);
  return (
    <div>
      <MaterialModal
        className={`create-product-modal ${className}`}
        open={isOpen}
        onClose={() => closeCreateForm()}
        aria-labelledby="modal-modal-label"
        aria-describedby="modal-modal-description"
        title="modal-modal-title"
      >
        <Box className="create-product-modal__content" sx={style}>
          <Typography className="create-product-modal__input-title" variant="subtitle1" gutterBottom component="div">
            Введите название товара
          </Typography>
          <TextField
            className="create-product-modal__input create-product-modal__input_name"
            value={product.name}
            variant="outlined"
            type="text"
            label="Название товара"
            sx={{ paddingBottom: 2 }}
            autoComplete="off"
            onChange={({ target: { value } }) => {
              setProperty({
                key: 'name',
                value: value,
              });
            }}
            fullWidth
          />
          <Typography className="create-product-modal__input-title" variant="subtitle1" gutterBottom component="div">
            Введите цену за 1 ед. товара, руб
          </Typography>
          <NumberFormat
            className="create-product-modal__input create-product-modal__input_price"
            customInput={TextField}
            value={product.price === 0 ? '' : product.price}
            rows={1}
            variant="outlined"
            label="Цена за 1 ед. товара, руб"
            sx={{ paddingBottom: 2 }}
            autoComplete="off"
            onValueChange={({ value }: NumberFormatValues) => {
              setProperty({
                key: 'price',
                value: Number(value),
              });
            }}
            fullWidth
          />
          <FormControlLabel
            className="create-product-modal__input create-product-modal__input_is-price"
            checked={product.isPiece}
            control={<Checkbox />}
            label="Штучный товар"
            onChange={(_, checked) => {
              setProperty({
                key: 'isPiece',
                value: checked,
              });
            }}
          />
          <FormControlLabel
            className="create-product-modal__input create-product-modal__input_need-timer"
            checked={product.needTimer}
            control={<Checkbox />}
            label="Нужен таймер товара"
            sx={{ paddingBottom: 2 }}
            onChange={(_, checked) => {
              setProperty({
                key: 'needTimer',
                value: checked,
              });
            }}
          />
          {product.needTimer && (
            <NumberFormat
              className="create-product-modal__input create-product-modal__input_timer"
              customInput={TextField}
              value={product.eachProductUnitMinutesTimer === 0 ? '' : product.eachProductUnitMinutesTimer}
              variant="outlined"
              label="Таймер для 1 ед. товара, мин"
              sx={{ paddingBottom: 2 }}
              autoComplete="off"
              helperText="Введите количество минут, которые будет отсчитывать таймер для каждой единицы товара. Пример: если ввести цифру 90, то у товара, у которого указано количество единиц 2шт будет отсчитываться таймер 180 минут"
              onValueChange={({ value }: NumberFormatValues) => {
                setProperty({
                  key: 'eachProductUnitMinutesTimer',
                  value: Number(value),
                });
              }}
              fullWidth
            />
          )}
          <Box className="create-product-modal__actions" display="flex" justifyContent="end" onClick={() => create()}>
            <Button className="create-product-modal__button create-product-modal__button_create" variant="outlined">
              Создать
            </Button>
          </Box>
        </Box>
      </MaterialModal>
    </div>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};
