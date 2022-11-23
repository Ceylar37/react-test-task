import {Direction} from "../../types";
import {FilterValue} from "../../components/Field";

export interface Filter {
  from: Direction;
  to: Direction[]
}

export interface CategorySelectionState {
  directions: Direction[];
  filters: Filter[];
  filteredDirectionsFrom: Direction[];
  filteredDirectionsTo: Direction[];
  currentFilterFrom: FilterValue;
  currentFilterTo: FilterValue;
  currentDirectionCodeFrom: string;
  currentDirectionCodeTo: string;
}

export type SetDirectionsPayload = Direction[]

export type SetFiltersPayLoad = Filter[]