import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import scoreBoardApi, { ScoreBoardApi } from './scoreBoardApi';

interface PronoState {
	scores: any[];
	scoreStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: PronoState = {
	scores: [],
	scoreStatus: 'idle',
	error: null,
};

export const getScoreBoard = createAsyncThunk<
	ScoreBoardApi, // return type of the payload creator
	void, // first argument to the payload creator
	{ state: RootState; rejectValue: string }
>('scoreBoard/getScoreBoard', async (_, { rejectWithValue }) => {
	try {
		return await scoreBoardApi.fetchScoreBoard();
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const scoreBoardSlice = createSlice({
	name: 'scoreBoard',
	initialState,
	reducers: {
		resetScore: (state) => {
			state.scores = [];
			state.scoreStatus = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// getScoreBoard
			.addCase(getScoreBoard.pending, (state) => {
				state.scoreStatus = 'loading';
			})
			.addCase(getScoreBoard.fulfilled, (state, action) => {
				state.scoreStatus = 'succeeded';
				state.scores = action.payload;
			})
			.addCase(getScoreBoard.rejected, (state, action) => {
				state.scoreStatus = 'failed';
				if (action.payload) state.error = action.payload;
			});
	},
});

export const { resetScore } = scoreBoardSlice.actions;
export default scoreBoardSlice.reducer;
