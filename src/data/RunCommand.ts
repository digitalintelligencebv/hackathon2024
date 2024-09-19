import type { Logger } from '@/models/Command';
import type { State } from '@/models/State';
import { mainCategory, utilityCategory } from './CommandCategories';
import { getCommands } from './Commands';
import { repairFiles } from './commands/RepairFiles';

export async function runCommand(input: string, state: State, logger: Logger) {
  logger(`> ${input}`);

  for (const command of getCommands()) {
    if (command.match(input)) {
      if (state.fileCorruption >= 100 && (command.category !== utilityCategory && command !== repairFiles)) {
        logger(`ERROR: Command '${command.key}' unavailable due to corrupted files.`);
        return;
      }

      if (!state.connected && command.category === mainCategory) {
        logger('ERROR: Not connected to the mainfame.');
        return;
      }

      await command.run(input, state, logger);
      return;
    }
  }

  const command = input.split(' ')[0];

  logger(`ERROR: Command '${command}' is not recognized.`);
}
