import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './global.slice'
import authReducer from './auth.slice'

const rootReducer = {
  global: globalReducer,
	auth: authReducer,
}

export const store = configureStore({
  reducer: rootReducer
})