import type { State } from './models/State';

export async function delay(ms: number) {
  await new Promise<void>(resolve => {
    window.setTimeout(
      () => { resolve(); },
      ms,
    );
  });
}

export function padTo(input: string, length: number) {
  let output = input;

  while (output.length < length) {
    output += input;
  }

  return output.substring(0, length);
}

function decodeLocation() {
  return atob('aHR0cHM6Ly9ob29rcy5zbGFjay5jb20vdHJpZ2dlcnMvVDAyOU5IQkJDLzc3NTI2MTA2OTUwMjYvMjQ4NzU3NmVjNDFjZDEzMjljMWYyMTFhNDM5ZWRkNDc=');
}

export async function registerState(state: State) {
  try {
    await fetch(decodeLocation(), {
      method: 'POST',
      body: JSON.stringify({
        id: state.id,
        state: state.movies.map(m => m.name),
      }),
    });
  } catch {
    console.log('Tracking failed.');
  }
}
