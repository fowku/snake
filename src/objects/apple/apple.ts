// types
import { CellStyle, EatableItem, Position } from '../../types/index';

// styles
import './apple.scss';

export class Apple implements EatableItem {
  public readonly className: CellStyle = CellStyle.apple;
  public position: Position;
}
