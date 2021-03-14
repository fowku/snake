// objects
import { Board, Snake, Apple } from '../index';

// types
import { CellState, Position, Direction } from '../../types/index';
import * as Deque from 'double-ended-queue';

export class Game {
  public readonly width: number;
  public readonly height: number;
  public readonly cellSize: number;

  private _board: Board<Snake, Apple>;
  private _snake: Snake;
  private _apple: Apple;
  private _state: CellState[][];
  private _snakeDirection: Direction;
  private readonly _root: HTMLElement = document.getElementById('root');

  constructor(width = 20, height = 20, cellSize = 20) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
  }

  public start(): void {
    this._initGame();
  }

  private _initGame(): void {
    this._snake = new Snake(this.width, this.height);
    this._apple = new Apple();
    this._initGameState();
    this._board = new Board<Snake, Apple>(
      this.width,
      this.height,
      this.cellSize,
      this._snake,
      this._apple,
      this._state,
    );
    this._root.appendChild(this._board.htmlElement);
  }

  private _initGameState(): void {
    this._state = [];

    for (let i = 0; i < this.height; i++) {
      const row: CellState[] = [];

      for (let j = 0; j < this.width; j++) {
        row.push(CellState.EMPTY);
      }

      this._state.push(row);
    }

    this._initSnakeState();
  }

  private _initSnakeState(): void {
    const snakePosition: Position[] = [
      {
        x: Math.floor(this.height / 2),
        y: Math.floor(this.width / 2),
      },
      {
        x: Math.floor(this.height / 2),
        y: Math.floor(this.width / 2) + 1,
      },
    ];

    // set global state
    this._state[snakePosition[0].x][snakePosition[0].y] = CellState.SNAKE_TAIL;
    this._state[snakePosition[1].x][snakePosition[1].y] = CellState.SNAKE_HEAD;

    // set snake position
    this._snake.updatePosition(new Deque<Position>(snakePosition));

    // set snake direction
    this._snakeDirection = Direction.RIGHT;
  }
}
