import { Command } from '@/models/Command';
import { delay } from '@/Utils';
import { utilityCategory } from '../CommandCategories';

export const reset = new Command(
  'reset',
  utilityCategory,
  async (args, state) => {
    if (args.includes('--hard')) {
      localStorage.clear();
    } else {
      localStorage.removeItem('history');
      localStorage.removeItem('log');
      state.color = undefined;
      state.completed = false;
    }

    // Wait for state to save.
    await delay(200);

    window.location.reload();

    // Wait for window reload.
    await delay(1000);
  },
);
