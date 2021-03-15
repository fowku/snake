// styles
import './scoreBoard.scss';

export class ScoreBoard {
  public readonly className: string = 'score-board';
  public readonly htmlElement: HTMLDivElement = document.createElement('div');

  constructor(width = 20, cellSize = 20) {
    this._createScoreBoard();
    this._setProperties(width, cellSize);
  }

  public updateScore(score: number): void {
    this.htmlElement.textContent = score.toString();
  }

  private _createScoreBoard(): void {
    this.htmlElement.className = this.className;
  }

  private _setProperties(width, cellSize): void {
    this.htmlElement.style.width = `${cellSize * width}px`;
  }
}
