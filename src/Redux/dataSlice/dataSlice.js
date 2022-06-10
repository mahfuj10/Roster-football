import { StopSharp } from '@mui/icons-material';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  allPlayer: [],
  searchText: '',
  teamName: 'My Team',
  csvData: [],
  selectedFiles: [],
  selectedPlayer: {},
  playerDetails: {},
  condition: Boolean
};


export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {

  }
);

export const counterSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    savePlayers: (state, { payload }) => {
      state.allPlayer = payload;
    },
    saveSearchPlayer: (state, { payload }) => {
      if (state.allPlayer?.length === 0) return;
      state.searchText = payload;
    },
    setTeamName: (state, { payload }) => {
      state.teamName = payload;
    },
    storeCsvData: (state, { payload }) => {
      state.csvData = payload;
    },
    uploadCsvFile: (state, { payload }) => {
      state.selectedFiles = payload;
    },
    setSelectPlayer: (state, { payload }) => {
      state.selectedPlayer = payload;
    },
    deletePlayer: (state, { payload }) => {
      state.allPlayer = state.allPlayer.filter(player => player['Player Name'] !== payload);
    },
    updatePlayerDetails: (state, { payload }) => {
      const findPlayer = state.allPlayer.find(player => player['Minutes Played'] === payload.id);
      if (payload.data?.updatedName !== undefined) {
        findPlayer['Player Name'] = payload.data?.updatedName;
      }
      if (payload.data?.updateJerseyNum !== undefined) {
        findPlayer['Jersey Number'] = payload.data?.updateJerseyNum;
      }
      if (payload.data?.updatedHeight !== undefined) {
        findPlayer['Height'] = payload.data?.updatedHeight;
      }
      if (payload.data.updatedWeight !== undefined) {
        findPlayer['Weight'] = payload.data.updatedWeight;
      }
      if (payload.data.updatedNationality !== undefined) {
        findPlayer['Nationality'] = payload.data.updatedNationality;
      }
      if (payload.data.updatedNationality !== undefined) {
        findPlayer['Position'] = payload.data.updatedPosition;
      }
      if (payload.data.starter !== undefined) {
        findPlayer['Starter'] = payload.data.starter;
      }
    },
    selectPlayerForDetails: (state, { payload }) => {
      state.playerDetails = payload;
    },
    setCondition: (state, { payload }) => {
      state.condition = payload;
    },


  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { savePlayers, updatePlayerDetails, saveSearchPlayer, setTeamName, storeCsvData, uploadCsvFile, setSelectPlayer, deletePlayer, selectPlayerForDetails, setCondition } = counterSlice.actions;


export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;
