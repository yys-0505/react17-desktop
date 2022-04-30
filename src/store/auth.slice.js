import { createSlice } from '@reduxjs/toolkit'
import { getUserLocal, setUserLocal } from 'common/js/cache'

const initialState = {
  user: getUserLocal(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = setUserLocal(action.payload)
    },
  },
})

export const authActions = authSlice.actions

export const selectUser = (state) => state.auth.user

export default authSlice.reducer