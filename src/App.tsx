import React, {useEffect} from 'react';
import './styles/global.scss';
import Field from "./components/Field";
import {useAppDispatch, useTypedSelector} from "./store/hooks";
import {fetchDirections, fetchFilters} from "./store/categorySelection/thunks";
import Loader from "./components/Loader";
import {
  setCurrentDirectionCodeFrom,
  setCurrentDirectionCodeTo,
  setCurrentFilterFrom,
  setCurrentFilterTo
} from "./store/categorySelection";

function App() {

  const dispatch = useAppDispatch();

  const categorySelectionState = useTypedSelector(state => state.categorySelection)

  useEffect(() => {
    dispatch(fetchDirections())
    dispatch(fetchFilters())
  }, [])


  if (categorySelectionState.directions.length === 0 || categorySelectionState.filters.length === 0) {
    return (
      <div className="appWrapper">
        <Loader/>
      </div>
    )
  }

  return (
    <div className="appWrapper">
      <form>
        <Field
          label={'Отдаёте'}
          directions={categorySelectionState.filteredDirectionsFrom}
          currentDirectionCode={categorySelectionState.currentDirectionCodeFrom}
          currentFilter={categorySelectionState.currentFilterFrom}
          onDirectionChange={(value) => {
            dispatch(setCurrentDirectionCodeFrom(value))
          }}
          onFilterChange={(value) => {
            dispatch(setCurrentFilterFrom(value))
          }}
        />
        <Field
          label={'Отдаёте'}
          directions={categorySelectionState.filteredDirectionsTo}
          currentDirectionCode={categorySelectionState.currentDirectionCodeTo}
          currentFilter={categorySelectionState.currentFilterTo}
          onDirectionChange={(value) => {
            dispatch(setCurrentDirectionCodeTo(value))
          }}
          onFilterChange={(value) => {
            dispatch(setCurrentFilterTo(value))
          }}
        />
      </form>
    </div>
  );
}

export default App;
