// styles
import './snake.scss';

// types
import { PlayerObject, CellStyle, Position, Direction } from '../../types/index';

// libs
import * as Deque from 'double-ended-queue';

export class Snake implements PlayerObject {
  public readonly className: CellStyle = CellStyle.snake;

  private _position: Deque<Position>;

  constructor(position?: Array<Position>) {
    if (!!position) {
      this._position = new Deque<Position>(position);
    }
  }

  public get position(): Array<Position> {
    return this._position.toArray();
  }

  public updatePosition(position: Array<Position>): void {
    this._position = new Deque<Position>(position);
  }

  public nextState(direction: Direction): void {
    const headPosition = this._position.peekFront();
    this._position.pop();

    switch (direction) {
      case Direction.RIGHT:
        this._position.unshift({
          x: headPosition.x,
          y: headPosition.y + 1,
        });
        break;

      case Direction.DOWN:
        this._position.unshift({
          x: headPosition.x + 1,
          y: headPosition.y,
        });
        break;

      case Direction.LEFT:
        this._position.unshift({
          x: headPosition.x,
          y: headPosition.y - 1,
        });
        break;

      case Direction.UP:
        this._position.unshift({
          x: headPosition.x - 1,
          y: headPosition.y,
        });
        break;

      default:
        throw new Error('Direction type error.');
    }
  }
}
