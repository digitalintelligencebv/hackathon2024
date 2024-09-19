import { Command } from '@/models/Command';
import { bugFixCategory } from '../CommandCategories';
import { delay, registerState } from '@/Utils';

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

    if (!state.id.includes('-')) {
      state.id += `-${args[0]}`;
    } else {
      state.id = state.id.replace(/-.*/, `-${args[0]}`);
    }

    await registerState(state);

    logger('Successfully connected!');

    state.connected = true;
  },
  '<secure password>',
  '(re)connect to the Mainframe',
);
