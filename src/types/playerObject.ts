import { CellState, CellStyles } from './index';

export interface PlayerObject {
  readonly width: number;
  readonly height: number;
  readonly className: CellStyles;
  state: CellState[][];
  updateState(state: CellState[][]): void;
}
