import { addMovie } from './commands/AddMovie';
import { help } from './commands/Help';
import { reset } from './commands/Reset';
import { setColor } from './commands/SetColor';
import { showResults } from './commands/ShowResults';
import { rotate } from './commands/Rotate';
import { enhance } from './commands/Enhance';
import { repairFiles } from './commands/RepairFiles';
import { connectToMainframe } from './commands/ConnectToMainframe';

export function getCommands() {
  return [
    setColor,
    addMovie,
    showResults,

    enhance,
    repairFiles,
    rotate,
    connectToMainframe,

    help,
    reset,
  ];
}
