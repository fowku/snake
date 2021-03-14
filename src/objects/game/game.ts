// objects
import { Board, Snake, Apple } from '../index';

// types
import { CellState, Position, Direction, Keys } from '../../types/index';

// constants
import { SPEED } from '../../constants/index';

export class Game {
  public readonly width: number;
  public readonly height: number;
  public readonly cellSize: number;

  private _board: Board<Snake, Apple>;
  private _snake: Snake;
  private _apple: Apple;
  private _state: CellState[][];
  private _snakeDirection: Direction = Direction.RIGHT;
  private _timer: NodeJS.Timeout;
  private _gameSpeed: number = SPEED;
  private readonly _root: HTMLElement = document.getElementById('root');

  constructor(width = 20, height = 20, cellSize = 20) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  public start(): void {
    this._initGame();
    // this._startTimer();
    document.addEventListener('keydown', this._onKeyDown);
  }

  public stop(): void {
    clearInterval(this._timer);
    document.removeEventListener('keydown', this._onKeyDown);
  }

  private _startTimer(): void {
    this._timer = setInterval(this._tick.bind(this), this._gameSpeed);
  }

  private _tick(): void {
    this._snake.nextState(this._snakeDirection);
    this._updateSnakeState(this._snake.position);
    this._board.updateBoard(this._state);
  }

  private _initGame(): void {
    // order is important
    this._initGameState();
    this._initSnake();
    this._initApple();
    this._initBoard();

    this._root.appendChild(this._board.htmlElement);
  }

  private _initBoard(): void {
    this._board = new Board<Snake, Apple>(
      this.width,
      this.height,
      this.cellSize,
      this._snake,
      this._apple,
      this._state,
    );
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
  }

  private _initSnake(): void {
    this._snake = new Snake();

    const snakePosition: Position[] = [
      {
        x: Math.floor(this.height / 2),
        y: Math.floor(this.width / 2),
      },
      {
        x: Math.floor(this.height / 2),
        y: Math.floor(this.width / 2) - 1,
      },
    ];

    // set global state
    this._state[snakePosition[0].x][snakePosition[0].y] = CellState.SNAKE_HEAD;
    this._state[snakePosition[1].x][snakePosition[1].y] = CellState.SNAKE_TAIL;

    // set snake position
    this._snake.updatePosition(snakePosition);
  }

  private _initApple(): void {
    this._apple = new Apple();

    const applePosition: Position = this._getNewApplePosition();

    this._state[applePosition.x][applePosition.y] = CellState.APPLE;

    this._apple.updatePosition(applePosition);
  }

  private _updateSnakeState(position: Array<Position>): void {
    // если голова совпадает с яблоком, то удлиняем змею
    // спауним новое яблоко и ускоряем игру в два раза

    for (let i = 0; i < this._state.length; i++) {
      for (let j = 0; j < this._state[i].length; j++) {
        if (this._state[i][j] !== CellState.APPLE && this._state[i][j] !== CellState.EMPTY) {
          this._state[i][j] = CellState.EMPTY;
        }
      }
    }

    // set snakes head
    this._state[position[0].x][position[0].y] = CellState.SNAKE_HEAD;

    // set snakes body
    for (let i = 1; i < position.length - 1; i++) {
      this._state[position[i].x][position[i].y] = CellState.SNAKE;
    }

    // set snakes tail
    this._state[position[position.length - 1].x][position[position.length - 1].y] = CellState.SNAKE_TAIL;
  }

  private _getNewApplePosition(): Position {
    let applePosition: Position = this._getRandomCell();

    while (this._state[applePosition.x][applePosition.y] !== CellState.EMPTY) {
      applePosition = this._getRandomCell();
    }

    return applePosition;
  }

  private _getRandomCell(): Position {
    return {
      x: Math.round(Math.random() * 100) % this.height,
      y: Math.round(Math.random() * 100) % this.width,
    };
  }

  private _onKeyDown(e: KeyboardEvent): void {
    // TODO: create controls class
    switch (e.key) {
      case Keys.RIGHT:
        if (this._snakeDirection !== Direction.LEFT) {
          this._snakeDirection = Direction.RIGHT;
        }
        break;

      case Keys.DOWN:
        if (this._snakeDirection !== Direction.UP) {
          this._snakeDirection = Direction.DOWN;
        }
        break;

      case Keys.LEFT:
        if (this._snakeDirection !== Direction.RIGHT) {
          this._snakeDirection = Direction.LEFT;
        }

        break;

      case Keys.UP:
        if (this._snakeDirection !== Direction.DOWN) {
          this._snakeDirection = Direction.UP;
        }
        break;
    }
  }
}
