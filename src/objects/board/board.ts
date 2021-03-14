// styles
import './board.scss';

// types
import { CellState, PlayerObject, EatableItem } from '../../types/index';

export class Board<P extends PlayerObject, E extends EatableItem> {
  public readonly CLASS_NAME: string = 'board';
  public readonly EMPTY_CLASS: string = 'empty';
  public readonly width: number;
  public readonly height: number;
  public readonly cellSize: number;
  public readonly htmlElement: HTMLDivElement = document.createElement('div');

  constructor(width = 20, height = 20, cellSize = 20, playerObject: P, eatableItem: E, state: CellState[][]) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this._setProperties(cellSize);
    this._createBoard(playerObject, eatableItem, state);
  }

  private _createBoard(playerObject: P, eatableItem: E, state?: CellState[][]): void {
    if (!!state) {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          const cell = document.createElement('div');

          switch (state[i][j]) {
            case CellState.EMPTY:
              cell.className = this.EMPTY_CLASS;
              break;

            case CellState.SNAKE:
            case CellState.SNAKE_HEAD:
            case CellState.SNAKE_TAIL:
              cell.className = playerObject.className;
              break;

            case CellState.APPLE:
              cell.className = eatableItem.className;
              break;

            default:
              cell.className = this.EMPTY_CLASS;
          }

          this.htmlElement.appendChild(cell);
        }
      }
    } else {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          const cell = document.createElement('div');
          cell.className = playerObject.className;
          this.htmlElement.appendChild(cell);
        }
      }
    }
  }

  private _setProperties(cellSize: number): void {
    this.htmlElement.className = this.CLASS_NAME;
    this.htmlElement.style.gridTemplateColumns = `repeat(${this.width}, ${this.cellSize}px)`;
    this.htmlElement.style.width = `${cellSize * this.width}px`;
    this.htmlElement.style.height = `${cellSize * this.height}px`;
  }
}
