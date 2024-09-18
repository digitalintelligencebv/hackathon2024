import { Command } from '@/models/Command';
import { commandCategories, utilityCategory } from '../CommandCategories';
import { getCommands } from '../Commands';

export const help = new Command(
  'help',
  utilityCategory,
  (_args, _state, logger) => {
    const commands = getCommands();

    logger(`===== Hackathon 2024 ===== alpha-0.0.1\n\r`);

    for (const category of commandCategories) {
      logger(`--- ${category.name} ---`);

      if (category.description) {
        logger(category.description);
      }

      logger('');

      const categoryCommands = commands.filter(c => c.category === category);

      for (const command of categoryCommands) {
        let line = `\t${command.key}`;

        if (command.argumentHelp) {
          line += ` ${command.argumentHelp}`;
        }

        if (command.description) {
          line += `   (${command.description})`;
        }

        logger(line);
      }

      logger('');
    }
  },
);
