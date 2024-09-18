import { Command } from '@/models/Command';
import { bugFixCategory } from '../CommandCategories';

export const enhance = new Command(
  'enhance',
  bugFixCategory,
  (_args, state) => {
    state.blur = Math.max(0, state.blur - 4);
  },
  '',
  'fixes blurry screen bugs, not very effective',
);
