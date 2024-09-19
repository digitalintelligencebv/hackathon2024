import { Command } from '@/models/Command';
import { Color } from '@/models/Color';
import { padTo, registerState } from '@/Utils';
import { getBlob } from '../Blob';
import { mainCategory } from '../CommandCategories';
import { showResults } from './ShowResults';

export const addMovie = new Command(
  'add-movie',
  mainCategory,
  async (args, state, logger) => {
    if (args.length < 1) {
      logger('Movie name missing. Type \'help\' for more information about available commands.');
      return;
    }

    if (!state.color) {
      logger('No color active. Please set the color before adding a movie. Type \'help\' for more information about available commands.');
      return;
    }

    const fullArgument = args.join(' ');
    const matchLength = getMatchLength(state.color);
    const blob = getBlob(state.color);

    for (let i = 0; i <= fullArgument.length - matchLength; i++) {
      const toCheck = fullArgument.toLowerCase().substring(i, i + matchLength);

      try {
        const code = eval(await decode(blob, toCheck))(blob, state);

        logger(`Movie correct! Use '${showResults.key}' to see the collected safe codes.`);

        const existingMovie = state.movies.find(m => m.color === state.color);

        if (existingMovie) {
          existingMovie.name = fullArgument;
          existingMovie.code = code;
        } else {
          state.movies.push({
            color: state.color,
            name: fullArgument,
            code,
          });

          await registerState(state);
        }

        return;
      } catch {
        // Ignore
      }
    }

    state.fileCorruption = Math.min(0, state.fileCorruption + 5);
    logger('Invalid movie.');
  },
  '<movie name>',
);

function getMatchLength(color: Color) {
  switch (color) {
    case Color.Blue:
      return 7;
    case Color.Red:
      return 9;
    case Color.Green:
      return 6;
    case Color.Yellow:
      return 7;
  }
}

async function decode(blob: string, rawKey: string) {
  const data = atob(blob).split(',').map(x => Number(x));
  const iv = new Uint8Array(data.splice(0, 16));

  const key = new TextEncoder().encode(padTo(rawKey, 16));

  const key_encoded = await window.crypto.subtle.importKey(
    'raw',
    key.buffer,
    'AES-CTR',
    false,
    ['decrypt'],
  );

  const decrypted_content = await window.crypto.subtle.decrypt(
    {
      name: 'AES-CTR',
      counter: iv,
      length: 128,
    },
    key_encoded,
    Uint8Array.from(data),
  );

  return new TextDecoder().decode(decrypted_content);
}
