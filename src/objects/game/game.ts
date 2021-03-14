// objects
import { Board } from '../board/board';
import { Snake } from '../snake/snake';
import { Apple } from '../apple/apple';

// types
import { CellState } from '../../types/index';

export class Game {
  public readonly width: number;
  public readonly height: number;
  public readonly cellSize: number;

  private _board: Board<Snake, Apple>;
  private _snake: Snake;
  private _apple: Apple;
  private _state: CellState[][];
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
    this._board = new Board<Snake, Apple>(this.width, this.height, this.cellSize, this._snake, this._apple);
    this._root.appendChild(this._board.htmlElement);
  }

  // private _initGame(): void {}
}
