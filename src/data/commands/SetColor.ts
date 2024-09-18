import { Command } from '@/models/Command';
import { Color } from '@/models/Color';
import { mainCategory } from '../CommandCategories';

export const setColor = new Command(
  'set-color',
  mainCategory,
  async (args, state, logger) => {
    if (args.length < 1) {
      logger('ERROR: Color argument missing.');
    }

    const colorArg = args[0];

    if (colorArg.length < 2) {
      logger(`ERROR: Color argument '${colorArg}' is not recognized.`);
      return;
    }

    const parsedColorArg = colorArg[0].toUpperCase() + colorArg.substring(1).toLowerCase();

    if (parsedColorArg === 'None') {
      state.color = undefined;
      return;
    }

    const color: Color | undefined = Color[parsedColorArg as Color];

    if (!color) {
      logger(`ERROR: Color argument '${colorArg}' is not recognized.`);
      return;
    }

    state.color = color;
  },
  '<blue|red|green|yellow|none>',
);
