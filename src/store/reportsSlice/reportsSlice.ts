/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserReport } from '../../shared/types/user/user-reports.type';
import { userReportsService } from '../../services/userReportsService';

type ReportsState = {
  reports: UserReport[];
  loading: boolean;
  error: string | null;
};

const initialState: ReportsState = {
  reports: [],
  loading: false,
  error: null,
};

export const fetchReportsThunk = createAsyncThunk<
  UserReport[],
  number,
  { rejectValue: string }
>('reports/fetchReports', async (userId: number, { rejectWithValue }) => {
  try {
    const reports = await userReportsService.getUserReports(userId);

    return reports;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch user reports',
    );
  }
});

export const updateReportThunk = createAsyncThunk<
  UserReport,
  { reportId: number; patch: Partial<UserReport> },
  { rejectValue: string }
>('reports/updateReport', async ({ reportId, patch }, { rejectWithValue }) => {
  try {
    return await userReportsService.updateUserReports(reportId, patch);
  } catch (error) {
    return rejectWithValue('Failed to update report');
  }
});

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReportsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReportsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed';
      })

      // update
      .addCase(updateReportThunk.fulfilled, (state, action) => {
        const index = state.reports.findIndex(r => r.id === action.payload.id);

        if (index !== -1) {
          state.reports[index] = action.payload;
        }
      })
      .addCase(updateReportThunk.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update report';
      });
  },
});

export default reportsSlice.reducer;
