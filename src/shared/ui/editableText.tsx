import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useState
} from 'react';
import { IconButton, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';

interface IEditableText {
  text: string;
  setTableTitle: (text: string) => void;
  role?: string;
}

export const EditableText: FC<IEditableText> = ({
  text,
  setTableTitle,
  role,
}) => {
  const [editableText, setEditableText] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setEditableText(text);
  }, [text]);

  const handleTitleClick = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) setTableTitle(editableText);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableText(e.currentTarget.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') handleTitleClick();
  };

  return (
    <>
      {
        isEditMode
          ? <TextField
            role={`${role}-field`}
            color="primary"
            size="small"
            autoComplete=""
            value={editableText}
            onChange={handleTitleChange}
            onKeyUp={handleKeyPress}
            focused
            autoFocus
          /> : editableText
      }
      <IconButton
        role={`${role}-button`}
        color="inherit"
        onClick={handleTitleClick}
      >
        {isEditMode ? <DoneIcon /> : <EditIcon />}
      </IconButton>
    </>
  );
};