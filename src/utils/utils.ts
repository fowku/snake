import { Position } from '../types/index';

export function comparePositions(pos1: Position, pos2: Position): boolean {
  return JSON.stringify(pos1) === JSON.stringify(pos2);
}
