import { Command } from '@/models/Command';
import { bugFixCategory } from '../CommandCategories';
import { delay } from '@/Utils';

export const repairFiles = new Command(
  'repair-files',
  bugFixCategory,
  async (_args, state, logger) => {
    logger('Repairing...');

    while (state.fileCorruption > 0) {
      await delay(2000);

      state.fileCorruption = Math.max(0, state.fileCorruption - 5 - Math.random() * 15);

      if (state.fileCorruption > 0) {
        logger(`${Math.floor(100 - state.fileCorruption)}% repaired...`);
      } else {
        logger('Done!');
      }
    }
  },
  '',
  'in case some files are corrupt',
);
