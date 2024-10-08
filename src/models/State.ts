import { Color } from './Color';

export interface State {
  id: string;
  color?: Color;
  movies: Movie[];
  rotation: number;
  blur: number;
  fileCorruption: number;
  connected: boolean;
  completed: boolean;
}

export interface Movie {
  color: Color;
  name: string;
  code: number;
}
