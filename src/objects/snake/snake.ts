// styles
import './snake.scss';

// types
import { CellState, PlayerObject, CellStyles } from '../../types/index';

export class Snake implements PlayerObject {
  public readonly className: CellStyles = CellStyles.snake;
  public readonly width: number;
  public readonly height: number;

  private _state: CellState[][];

  constructor(width = 20, height = 20) {
    this.width = width;
    this.height = height;
  }

  public get state(): CellState[][] {
    return this._state;
  }

  public updateState(state: CellState[][]): void {
    this._state = state;
  }

  // private _createSnake(): void {
  //   const snake: HTMLDivElement = this.htmlElement;
  //   snake.className = this.SNAKE_CLASS;

  //   for (let i = 0; i < this.width; i++) {
  //     for (let j = 0; j < this.height; j++) {
  //       const cell = document.createElement('div');
  //       cell.className = this.SNAKE_CLASS + this.SEGMENT_CLASS;
  //       snake.appendChild(cell);
  //     }
  //   }
  // }
}
