// styles
import './board.scss';

// types
import { CellState, PlayerObject, EatableItem } from '../../types/index';

export class Board<P extends PlayerObject, E extends EatableItem> {
  public readonly BOARD_CLASS_NAME: string = 'board';
  public readonly width: number;
  public readonly height: number;
  public readonly htmlElement: HTMLDivElement = document.createElement('div');

  constructor(width = 20, height = 20, cellSize = 20, playerObject: P, eatableItem: E) {
    this.width = width;
    this.height = height;
    this._setProperties(cellSize);
    this._createBoard(playerObject, eatableItem);
  }

  private _createBoard(playerObject: P, eatableItem: E, state?: CellState[][]): void {
    if (!!state) {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          // TODO: тут создаем доску по существующему стейту
          // const node = document.createElement('div');
          // node.className = playerObject.className;
          // this.htmlElement.appendChild(node);
        }
      }
    } else {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          const node = document.createElement('div');
          node.className = playerObject.className;
          this.htmlElement.appendChild(node);
        }
      }
    }
  }

  private _setProperties(cellSize: number): void {
    this.htmlElement.className = this.BOARD_CLASS_NAME;
    this.htmlElement.style.width = `${cellSize * this.width}px`;
    this.htmlElement.style.height = `${cellSize * this.height}px`;
  }
}
