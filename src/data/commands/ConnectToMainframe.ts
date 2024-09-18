import { Command } from '@/models/Command';
import { bugFixCategory } from '../CommandCategories';
import { delay } from '@/Utils';

export const connectToMainframe = new Command(
  'connect-to-mainframe',
  bugFixCategory,
  async (args, state, logger) => {
    logger('Connecting...');
    await delay(1000);

    if (args.length < 1) {
      logger('Passsword invalid.');
      return;
    }

    logger('Successfully connected!');

    state.connected = true;
  },
  '<secure password>',
  '(re)connect to the Mainframe',
);
