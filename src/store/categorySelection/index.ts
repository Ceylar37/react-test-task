import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategorySelectionState, SetDirectionsPayload, SetFiltersPayLoad} from "./types";
import {FilterValue} from "../../components/Field";
import {filtersArrays} from "../../types";


const initialState: CategorySelectionState = {
  directions: [],
  filters: [],
  filteredDirectionsFrom: [],
  filteredDirectionsTo: [],
  currentDirectionCodeFrom: '',
  currentDirectionCodeTo: '',
  currentFilterTo: FilterValue.ALL,
  currentFilterFrom: FilterValue.ALL,
}

const shouldDirectionsFromUpdate = (action: PayloadAction<any>) => {
  return ['categorySelection/setCurrentFilterFrom', 'categorySelection/setDirections'].includes(action.type)
}

const shouldDirectionsToUpdate = (action: PayloadAction<any>) => {
  return [
    'categorySelection/setCurrentFilterTo',
    'categorySelection/setDirections',
    'categorySelection/setCurrentDirectionCodeFrom',
    'categorySelection/setCurrentFilterFrom'
  ].includes(action.type)
}

const categorySelectionSlice = createSlice({
  name: 'categorySelection',
  initialState,
  reducers: {
    setDirections: (state, action: PayloadAction<SetDirectionsPayload>) => {
      state.directions = action.payload
    },
    setFilters: (state, action: PayloadAction<SetFiltersPayLoad>) => {
      state.filters = action.payload
    },
    setCurrentDirectionCodeFrom: (state, action: PayloadAction<string>) => {
      state.currentDirectionCodeFrom = action.payload
    },
    setCurrentDirectionCodeTo: (state, action: PayloadAction<string>) => {
      state.currentDirectionCodeTo = action.payload
    },
    setCurrentFilterFrom: (state, action: PayloadAction<FilterValue>) => {
      state.currentFilterFrom = action.payload
    },
    setCurrentFilterTo: (state, action: PayloadAction<FilterValue>) => {
      state.currentFilterTo = action.payload
    }
  },
  extraReducers: builder => {
    builder.addMatcher(shouldDirectionsFromUpdate, state => {
      if (state.currentFilterFrom === FilterValue.ALL) {
        state.filteredDirectionsFrom = state.directions
      } else {
        state.filteredDirectionsFrom = state.directions.filter(
          direction => filtersArrays[state.currentFilterFrom as keyof typeof filtersArrays]
            .includes(direction.code)
        )
      }

      if (!state.filteredDirectionsFrom.some(
        filteredDirection => filteredDirection.code === state.currentDirectionCodeFrom
      )) {
        state.currentDirectionCodeFrom = state.filteredDirectionsFrom[0].code
      }
      state.currentFilterTo = FilterValue.ALL
    })

    builder.addMatcher(shouldDirectionsToUpdate, state => {
      const enabledDirections = state.filters.find(filter => filter.from.code === state.currentDirectionCodeFrom)!.to
      if (state.currentFilterTo === FilterValue.ALL) {
        state.filteredDirectionsTo = enabledDirections
      } else {
        state.filteredDirectionsTo = enabledDirections.filter(
          direction => filtersArrays[state.currentFilterTo as keyof typeof filtersArrays]
            .includes(direction.code)
        )
      }

      if (state.filteredDirectionsTo.length === 0) {
        state.currentDirectionCodeTo = ''
        return
      }

      if (!state.filteredDirectionsTo.some(
        filteredDirection => filteredDirection.code === state.currentDirectionCodeTo
      )) {
        state.currentDirectionCodeTo = state.filteredDirectionsTo[0].code
      }
    })
  }
})

export const {reducer: categorySelectionReducer} = categorySelectionSlice
export const {
  setDirections,
  setFilters,
  setCurrentDirectionCodeTo,
  setCurrentFilterTo,
  setCurrentFilterFrom,
  setCurrentDirectionCodeFrom
} = categorySelectionSlice.actions