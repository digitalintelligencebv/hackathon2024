import { Command } from '@/models/Command';
import { mainCategory } from '../CommandCategories';

export const showResults = new Command(
  'show-results',
  mainCategory,
  (_args, state, logger) => {
    if (state.movies.length === 0) {
      logger('No movies found yet.');
      return;
    }

    if (state.movies.length === 4) {
      state.completed = true;
      state.color = undefined;
    }

    for (const movie of state.movies) {
      logger(`${movie.color} - ${movie.name} - ${movie.code}`);
    }
  },
);
