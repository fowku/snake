import { CellStyles, Position } from './index';

// libs
import * as Deque from 'double-ended-queue';

export interface PlayerObject {
  readonly width: number;
  readonly height: number;
  readonly className: CellStyles;
  positionDeque: Deque<Position>;
  updatePosition(position: Deque<Position>): void;
}
