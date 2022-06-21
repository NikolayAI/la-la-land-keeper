import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';

interface IEditableText {
  text: string;
  setTableName: (text: string) => void;
  isLoading: boolean;
  role: string;
}

export const EditableText: FC<IEditableText> = ({ text, setTableName, isLoading, role }) => {
  const [editableText, setEditableText] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setEditableText(text);
  }, [text]);

  const handleTitleClick = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) setTableName(editableText);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableText(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log('HELLO: ', e.code);
    console.log('HELLO: ', e.key);
    if (e.code === 'Enter') handleTitleClick();
  };

  return (
    <>
      {isEditMode ? (
        <TextField
          inputProps={{ role: `editable-text-field-${role}` }}
          color="primary"
          size="small"
          autoComplete=""
          value={editableText}
          onChange={handleTitleChange}
          onKeyUp={handleKeyPress}
          focused
          autoFocus
        />
      ) : (
        <Box
          role={`editable-text-value-${role}`}
          sx={{
            display: 'inline-block',
            opacity: isLoading ? 0.5 : 1.0,
          }}
        >
          {editableText}
        </Box>
      )}
      <IconButton role={`editable-text-button-${role}`} color="inherit" disabled={isLoading} onClick={handleTitleClick}>
        {isEditMode ? <DoneIcon /> : <EditIcon />}
      </IconButton>
    </>
  );
};
