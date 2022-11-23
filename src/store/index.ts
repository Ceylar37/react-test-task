import { configureStore } from '@reduxjs/toolkit'
import {categorySelectionReducer} from "./categorySelection";

export const store = configureStore({
  reducer: {
    categorySelection: categorySelectionReducer
  },
})

