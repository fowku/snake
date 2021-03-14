import { CellStyle, Position } from './index';

export interface PlayerObject {
  readonly className: CellStyle;
  position: Array<Position>;
  updatePosition(position: Array<Position>): void;
}
