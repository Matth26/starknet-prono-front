import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import pointApi, { PointApi } from './pointApi';

interface PointState {
	points: any[];
	pointStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: PointState = {
	points: [],
	pointStatus: 'idle',
	error: null,
};

export const getPoints = createAsyncThunk<
	PointApi, // return type of the payload creator
	string, // first argument to the payload creator
	{ state: RootState; rejectValue: string }
>('point/getPoints', async (address, { rejectWithValue }) => {
	try {
		return await pointApi.fetchPoints(address);
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue(err.response.data);
	}
});

export const pointSlice = createSlice({
	name: 'point',
	initialState,
	reducers: {
		resetPoint: (state) => {
			state.points = [];
			state.pointStatus = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// getElrondPrice
			.addCase(getPoints.pending, (state) => {
				state.pointStatus = 'loading';
			})
			.addCase(getPoints.fulfilled, (state, action) => {
				state.pointStatus = 'succeeded';
				state.points = action.payload;
			})
			.addCase(getPoints.rejected, (state, action) => {
				state.pointStatus = 'failed';
				if (action.payload) state.error = action.payload;
			});
	},
});

export const { resetPoint } = pointSlice.actions;
export default pointSlice.reducer;
