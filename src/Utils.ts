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
