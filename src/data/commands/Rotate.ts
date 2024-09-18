import { Command } from '@/models/Command';
import { bugFixCategory } from '../CommandCategories';

export const rotate = new Command(
  'rotate',
  bugFixCategory,
  (args, state, logger) => {
    if (args.length < 1) {
      logger('ERROR: Degrees argument missing.');
      return;
    }

    const deg = Math.floor(Number(args[0]));

    if (isNaN(deg)) {
      logger('ERROR: Non-numerical degrees entered.');
      return;
    }

    state.rotation += deg;

    logger(`Rotating by ${deg} degrees... done!`);
  },
  '<deg>',
  'fixes screen rotation bugs',
);
