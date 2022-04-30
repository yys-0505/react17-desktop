import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isRequesting: false,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleRequestStatus: (state, action) => {
      state.isRequesting = action.payload
    }
  }
})

export const { toggleRequestStatus } = globalSlice.actions;

export const selectIsRequesting = state => state.global.isRequesting

export default globalSlice.reducer