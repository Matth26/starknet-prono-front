import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import matchApi, { MatchApi } from './matchApi';

interface MatchState {
	matches: any[];
	matchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: MatchState = {
	matches: [],
	matchStatus: 'idle',
	error: null,
};

export const getMatches = createAsyncThunk<
	MatchApi, // return type of the payload creator
	void, // first argument to the payload creator
	{ state: RootState; rejectValue: string }
>('prono/getMatches', async (_, { rejectWithValue }) => {
	try {
		return await matchApi.fetchMatches();
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		resetMatch: (state) => {
			state.matches = [];
			state.matchStatus = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// getElrondPrice
			.addCase(getMatches.pending, (state) => {
				state.matchStatus = 'loading';
			})
			.addCase(getMatches.fulfilled, (state, action) => {
				state.matchStatus = 'succeeded';
				state.matches = action.payload;
			})
			.addCase(getMatches.rejected, (state, action) => {
				state.matchStatus = 'failed';
				if (action.payload) state.error = action.payload;
			});
	},
});

export const { resetMatch } = matchSlice.actions;
export default matchSlice.reducer;
