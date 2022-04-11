import React from 'react';
import { useStore } from 'effector-react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';

import {
  $isOpenCreateProductModal,
  closeCreateProductModal,
  createProduct,
} from './model';
import { productsModel } from 'entities/products';

export const CreateProductModal: React.FC = () => {
  const isOpen = useStore($isOpenCreateProductModal);
  const product = useStore(productsModel.$product);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => closeCreateProductModal()}
        aria-labelledby="modal-modal-label"
        aria-describedby="modal-modal-description"
        title="modal-modal-title"
      >
        <Box sx={style}>
          <Typography variant="subtitle1" gutterBottom component="div">
            Введите название товара
          </Typography>
          <TextField
            value={product.title}
            variant="outlined"
            type="text"
            label="Название товара"
            sx={{ paddingBottom: 2 }}
            autoComplete="off"
            onChange={({ target: { value } }) => {
              productsModel.setProductProperty({
                key: 'title',
                value: value,
              });
            }}
            fullWidth
          />
          <Typography variant="subtitle1" gutterBottom component="div">
            Введите цену за 1 ед. товара, руб
          </Typography>
          <NumberFormat
            customInput={TextField}
            value={product.price === 0 ? '' : product.price}
            rows={1}
            variant="outlined"
            label="Цена за 1 ед. товара, руб"
            sx={{ paddingBottom: 2 }}
            autoComplete="off"
            onValueChange={({ value }: NumberFormatValues) => {
              productsModel.setProductProperty({
                key: 'price',
                value: Number(value),
              });
            }}
            fullWidth
          />
          <FormControlLabel
            checked={product.isPiece}
            control={<Checkbox />}
            label="Штучный товар"
            onChange={(_, checked) => {
              productsModel.setProductProperty({
                key: 'isPiece',
                value: checked,
              });
            }}
          />
          <FormControlLabel
            checked={product.needTimer}
            control={<Checkbox />}
            label="Нужен таймер товара"
            sx={{ paddingBottom: 2 }}
            onChange={(_, checked) => {
              productsModel.setProductProperty({
                key: 'needTimer',
                value: checked,
              });
            }}
          />
          {product.needTimer && (
            <NumberFormat
              customInput={TextField}
              value={
                product.eachProductUnitMinutesTimer === 0
                  ? ''
                  : product.eachProductUnitMinutesTimer
              }
              variant="outlined"
              label="Таймер для 1 ед. товара, мин"
              sx={{ paddingBottom: 2 }}
              autoComplete="off"
              helperText="Введите количество минут, которые будет отсчитывать таймер для каждой единицы товара. Пример: если ввести цифру 90, то у товара, у которого указано количество единиц 2шт будет отсчитываться таймер 180 минут"
              onValueChange={({ value }: NumberFormatValues) => {
                productsModel.setProductProperty({
                  key: 'eachProductUnitMinutesTimer',
                  value: Number(value),
                });
              }}
              fullWidth
            />
          )}
          <Box
            display="flex"
            justifyContent="end"
            onClick={() => createProduct()}
          >
            <Button variant="outlined">Создать</Button>
          </Box>
        </Box>
      </Modal>
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
