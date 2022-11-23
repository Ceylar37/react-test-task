import React, {FC, memo} from 'react';
import {FilterName, FilterValue} from "./types";
import {Direction} from "../../types";

import styles from './Field.module.scss';

interface FieldProps {
  label: string;
  directions: Direction[];
  currentDirectionCode: string | null;
  currentFilter: FilterValue | null;

  onDirectionChange: (value: string) => void;
  onFilterChange: (value: FilterValue) => void;
}

const filters: FilterValue[] = [FilterValue.ALL, FilterValue.CRYPTO, FilterValue.CASH, FilterValue.BANK];

const Field: FC<FieldProps> = (props) => {
  const {
    label,
    directions,
    currentDirectionCode,
    currentFilter,
    onFilterChange,
    onDirectionChange,
  } = props
  return (
    <div className={styles.filedWrapper}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.filters}>
        {filters.map(filter =>
          <div
            key={filter}
            className={`${styles.filter} ${currentFilter === filter ? styles.active : ''}`}
            onClick={() => {
              onFilterChange(filter)
            }}
          >
            {FilterName[filter]}
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <input className={styles.input}/>
        <select
          className={styles.select}
          value={currentDirectionCode as string}
          onChange={(event) => {
            onDirectionChange(event.currentTarget.value)
          }}>
          {directions.map(direction =>
            <option key={direction.code} value={direction.code}>
              {direction.name}
            </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default memo(Field);