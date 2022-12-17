import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import pronoApi, { Bet, PronoApi } from './pronoApi';

interface PronoState {
  pronos: Bet[];
  pronosToSave: Bet[];
  scoreHasChanged: boolean;
  pronoStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  pronoError: string | null;
}

const initialState: PronoState = {
  pronos: [],
  pronosToSave: [],
  scoreHasChanged: false,
  pronoStatus: 'idle',
  pronoError: null,
};

export const getUserProno = createAsyncThunk<
  PronoApi, // return type of the payload creator
  string, // first argument to the payload creator
  { state: RootState; rejectValue: string }
>('prono/getUserProno', async (address, { rejectWithValue }) => {
  try {
    return await pronoApi.getProno(address);
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const pronoSlice = createSlice({
  name: 'prono',
  initialState,
  reducers: {
    resetProno: (state) => {
      state.pronos = [];
      state.pronosToSave = [];
      state.scoreHasChanged = false;
      state.pronoStatus = 'idle';
      state.pronoError = null;
    },
    addPronoToSave: (state, action: PayloadAction<Bet>) => {
      const index = state.pronosToSave.findIndex(
        (p) => p.match_id === action.payload.match_id
      );
      if (index !== -1) state.pronosToSave[index] = action.payload;
      else state.pronosToSave.push(action.payload);
    },
    resetPronoToSave: (state) => {
      state.pronosToSave = [];
    },
    resetScoreHasChanged: (state) => {
      state.scoreHasChanged = false;
    },
    setScoreHasChanged: (state) => {
      console.log('setScoreHasChanged');
      state.scoreHasChanged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // getUserProno
      .addCase(getUserProno.pending, (state) => {
        state.pronoStatus = 'loading';
      })
      .addCase(getUserProno.fulfilled, (state, action) => {
        state.pronoStatus = 'succeeded';
        state.pronos = action.payload;
      })
      .addCase(getUserProno.rejected, (state, action) => {
        state.pronoStatus = 'failed';
        if (action.payload) state.pronoError = action.payload;
      });
  },
});

export const {
  resetProno,
  addPronoToSave,
  resetPronoToSave,
  resetScoreHasChanged,
  setScoreHasChanged,
} = pronoSlice.actions;
export default pronoSlice.reducer;
