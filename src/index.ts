// objects
import { Game } from './objects/index';

// styles
import './styles/base.scss';

// constants
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from './constants/index';

const game: Game = new Game(GAME_WIDTH, GAME_HEIGHT, CELL_SIZE);
game.start();
