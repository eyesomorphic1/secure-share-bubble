import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface File {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  encrypted: boolean;
  shared: boolean;
  ownerId: string;
  uploadedBy: string;
  uploadDate: string;
}

interface FileState {
  files: File[];
  selectedFile: File | null;
  loading: boolean;
  error: string | null;
}

const initialState: FileState = {
  files: [],
  selectedFile: null,
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
      state.loading = false;
      state.error = null;
    },
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
    setSelectedFile: (state, action: PayloadAction<File | null>) => {
      state.selectedFile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  setFiles, 
  addFile, 
  removeFile, 
  setSelectedFile, 
  setLoading, 
  setError 
} = fileSlice.actions;

export default fileSlice.reducer;