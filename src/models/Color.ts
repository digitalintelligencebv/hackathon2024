export enum Color {
  Blue = 'Blue',
  Red = 'Red',
  Green = 'Green',
  Yellow = 'Yellow',
}

export function getColorClass(color?: Color) {
  switch (color) {
    case Color.Red:
      return 'red';

    case Color.Green:
      return 'green';

    case Color.Blue:
      return 'blue';

    case Color.Yellow:
      return 'yellow';

    default:
      return '';
  }
}
