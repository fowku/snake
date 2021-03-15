// objects
import { Board, Snake, Apple, ScoreBoard } from '../index';

// types
import { CellState, Position, Direction, Keys } from '../../types/index';

// utils
import { comparePositions } from '../../utils/utils';

// constants
import { SPEED, SPEED_GROW } from '../../constants/index';

export class Game {
  public readonly width: number;
  public readonly height: number;
  public readonly cellSize: number;

  private _board: Board<Snake, Apple>;
  private _snake: Snake;
  private _apple: Apple;
  private _state: CellState[][];
  private _scoreBoard: ScoreBoard;
  private _snakeDirection: Direction = Direction.RIGHT;
  private _lastPressedDirection: Direction;
  private _timer: NodeJS.Timeout;
  private _gameSpeed: number = SPEED;
  private _score = 0;
  private readonly _root: HTMLElement = document.getElementById('root');

  constructor(width = 20, height = 20, cellSize = 20) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  public start(): void {
    this._initGame();
    this._startTimer();
    document.addEventListener('keydown', this._onKeyDown);
  }

  public restart(): void {
    this.stop();
    this._initGameState();
    this._initSnake();
    this._initApple();
    this._board.updateBoard(this._state);
    this._scoreBoard.updateScore(this._score);
    this._startTimer();
    document.addEventListener('keydown', this._onKeyDown);
  }

  public stop(): void {
    clearInterval(this._timer);
    document.removeEventListener('keydown', this._onKeyDown);
  }

  private _startTimer(): void {
    this._timer = setInterval(this._tick.bind(this), this._gameSpeed);
  }

  private _stopTimer(): void {
    clearInterval(this._timer);
  }

  private _tick(): void {
    this._setNewDirection();
    this._snake.nextState(this._snakeDirection);

    if (this._isGameOver() || this._isOutOfBoard()) {
      this.restart();
      return;
    }

    // if apple is eaten (head position equals to apple position)
    // then add score, spawn new apple and speed up game (restart timer)
    if (this._isAppleEaten()) {
      this._score++;
      this._scoreBoard.updateScore(this._score);
      this._setNewApplePosition(this._getNewApplePosition());
      this._snake.nextState(this._snakeDirection, true);
      this._speedUp();
    }

    this._updateSnakeState(this._snake.position);
    this._board.updateBoard(this._state);
  }

  private _isGameOver(): boolean {
    const head = this._snake.head;
    return this._snake.position.filter(pos => pos.x === head.x && pos.y === head.y).length > 1;
  }

  private _isOutOfBoard(): boolean {
    const head = this._snake.head;
    return head.x > this.height - 1 || head.x < 0 || head.y > this.width - 1 || head.y < 0;
  }

  private _setNewDirection(): void {
    if (this._lastPressedDirection === Direction.RIGHT) {
      if (this._snakeDirection !== Direction.LEFT) {
        this._snakeDirection = this._lastPressedDirection;
        return;
      }
    }

    if (this._lastPressedDirection === Direction.DOWN) {
      if (this._snakeDirection !== Direction.UP) {
        this._snakeDirection = this._lastPressedDirection;
        return;
      }
    }

    if (this._lastPressedDirection === Direction.LEFT) {
      if (this._snakeDirection !== Direction.RIGHT) {
        this._snakeDirection = this._lastPressedDirection;
        return;
      }
    }

    if (this._lastPressedDirection === Direction.UP) {
      if (this._snakeDirection !== Direction.DOWN) {
        this._snakeDirection = this._lastPressedDirection;
        return;
      }
    }
  }

  private _isAppleEaten(): boolean {
    return comparePositions(this._snake.head, this._apple.position);
  }

  private _speedUp(): void {
    this._gameSpeed /= SPEED_GROW;
    this._stopTimer();
    this._startTimer();
  }

  private _initGame(): void {
    // order is important
    this._initGameState();
    this._initSnake();
    this._initApple();
    this._initScoreBoard();
    this._initBoard();

    this._root.appendChild(this._scoreBoard.htmlElement);
    this._root.appendChild(this._board.htmlElement);
  }

  private _initScoreBoard(): void {
    this._scoreBoard = new ScoreBoard(this.width, this.cellSize);
    this._scoreBoard.updateScore(this._score);
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
    this._score = 0;
    this._gameSpeed = SPEED;

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
    this._setNewSnakePosition([
      {
        x: Math.floor(this.height / 2),
        y: Math.floor(this.width / 2),
      },
      {
        x: Math.floor(this.height / 2),
        y: Math.floor(this.width / 2) - 1,
      },
    ]);
  }

  private _setNewSnakePosition(position: Position[]): void {
    // set global state
    this._state[position[0].x][position[0].y] = CellState.SNAKE_HEAD;

    for (let i = 1; i < position.length - 1; i++) {
      this._state[position[i].x][position[i].y] = CellState.SNAKE;
    }

    this._state[position[position.length - 1].x][position[position.length - 1].y] = CellState.SNAKE_TAIL;

    // set snake position
    this._snake.updatePosition(position);
  }

  private _initApple(): void {
    this._apple = new Apple();
    this._setNewApplePosition(this._getNewApplePosition());
  }

  private _setNewApplePosition(position: Position): void {
    this._state[position.x][position.y] = CellState.APPLE;
    this._apple.updatePosition(position);
  }

  private _updateSnakeState(position: Array<Position>): void {
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
        this._lastPressedDirection = Direction.RIGHT;
        break;

      case Keys.DOWN:
        this._lastPressedDirection = Direction.DOWN;
        break;

      case Keys.LEFT:
        this._lastPressedDirection = Direction.LEFT;
        break;

      case Keys.UP:
        this._lastPressedDirection = Direction.UP;
        break;
    }
  }
}
