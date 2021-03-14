// styles
import './snake.scss';

// types
import { PlayerObject, CellStyle, Position } from '../../types/index';

// libs
import * as Deque from 'double-ended-queue';

export class Snake implements PlayerObject {
  public readonly className: CellStyle = CellStyle.snake;
  public readonly width: number;
  public readonly height: number;

  private _positionDeque: Deque<Position>;

  constructor(width = 20, height = 20) {
    this.width = width;
    this.height = height;
    this._positionDeque = new Deque<Position>([
      { x: 4, y: 4 },
      { x: 4, y: 5 },
    ]);
  }

  public get positionDeque(): Deque<Position> {
    return this._positionDeque;
  }

  public updatePosition(position: Deque<Position>): void {
    this._positionDeque = position;
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
