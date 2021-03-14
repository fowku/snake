// types
import { CellStyle, EatableItem, Position } from '../../types/index';

// styles
import './apple.scss';

export class Apple implements EatableItem {
  public readonly className: CellStyle = CellStyle.apple;

  private _position: Position;

  constructor(position?: Position) {
    if (!!position) {
      this._position = position;
    }
  }

  public get position(): Position {
    return this._position;
  }

  public updatePosition(position: Position): void {
    this._position = position;
  }
}
