import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  encrypted: boolean;
  shared: boolean;
  owner: string;
  createdAt: string;
  expiresAt?: string;
}

interface FileState {
  files: File[];
  loading: boolean;
}

const initialState: FileState = {
  files: [],
  loading: false,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setFiles, addFile, removeFile, setLoading } = fileSlice.actions;
export default fileSlice.reducer;