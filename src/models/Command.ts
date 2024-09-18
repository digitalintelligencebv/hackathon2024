import type { CommandCategory } from '@/data/CommandCategories';
import { delay } from '@/Utils';
import type { State } from './State';

export type Logger = (log: string) => void;

export class Command {
  constructor(
    public key: string,
    public category: CommandCategory,
    private action: (args: string[], state: State, logger: Logger) => Promise<void> | void,
    public argumentHelp: string = '',
    public description: string = '',
  ) { }

  match(input: string) {
    return input.split(' ')[0].toLowerCase() === this.key;
  }

  protected getArguments(input: string): false | string[] {
    if (!this.match(input)) {
      console.warn('tried to run invalid command');
      return false;
    }

    const quoteSplit = input.replace(new RegExp(`^${this.key}\\s*`, 'i'), '')
      .split(/("+)/);

    let isInQuotes = false;
    const result: string[] = [];

    for (const item of quoteSplit) {
      if (item === '"') {
        isInQuotes = !isInQuotes;
        continue;
      }

      if (item.startsWith('""')) {
        return false;
      }

      if (isInQuotes) {
        if (item) {
          result.push(item);
        }

        continue;
      }

      const split = item.split(' ')
        .map(x => x.trim())
        .filter(x => x);

      result.push(...split);
    }

    return result;
  }

  async run(input: string, state: State, logger: Logger) {
    const args = this.getArguments(input);

    if (args === false) {
      return;
    }

    await delay(200);
    await this.action(args, state, logger);
  }
}
