// styles
import './board.scss';

// types
import { CellState, PlayerObject, EatableItem, CellStyle } from '../../types/index';

export class Board<P extends PlayerObject, E extends EatableItem> {
  public readonly CLASS_NAME: string = 'board';
  public readonly width: number;
  public readonly height: number;
  public readonly cellSize: number;
  public readonly htmlElement: HTMLDivElement = document.createElement('div');

  private readonly playerObject: P;
  private readonly eatableItem: E;

  constructor(width = 20, height = 20, cellSize = 20, playerObject: P, eatableItem: E, state: CellState[][]) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;

    this.playerObject = playerObject;
    this.eatableItem = eatableItem;

    this._setProperties(cellSize);
    this._createBoard(state);
  }

  public updateBoard(state: CellState[][]): void {
    const cells = this.htmlElement.children;
    const flatState = state.flat();

    if (cells.length !== flatState.length) {
      throw new Error('State length is not equal to DOM cells');
    }

    for (let i = 0; i < flatState.length; i++) {
      cells[i].className = this._getClassForCellState(flatState[i]);
    }
  }

  private _createBoard(state?: CellState[][]): void {
    if (!!state) {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          const cell = document.createElement('div');
          cell.className = this._getClassForCellState(state[i][j]);
          this.htmlElement.appendChild(cell);
        }
      }
    } else {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          const cell = document.createElement('div');
          cell.className = this.playerObject.className;
          this.htmlElement.appendChild(cell);
        }
      }
    }
  }

  private _getClassForCellState(cellState: CellState): CellStyle {
    // TODO: refactor
    switch (cellState) {
      case CellState.EMPTY:
        return CellStyle.empty;

      case CellState.SNAKE:
      case CellState.SNAKE_HEAD:
      case CellState.SNAKE_TAIL:
        return this.playerObject.className;

      case CellState.APPLE:
        return this.eatableItem.className;

      default:
        return CellStyle.empty;
    }
  }

  private _setProperties(cellSize: number): void {
    this.htmlElement.className = this.CLASS_NAME;
    this.htmlElement.style.gridTemplateColumns = `repeat(${this.width}, ${this.cellSize}px)`;
    this.htmlElement.style.width = `${cellSize * this.width}px`;
    this.htmlElement.style.height = `${cellSize * this.height}px`;
  }
}
