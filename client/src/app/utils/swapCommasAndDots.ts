export function swapCommasAndDots(inputString: string): string {
  // Replace all commas with a temporary marker (e.g., '#')
  const stringWithDots = inputString.replace(/,/g, '#');

  // Replace all dots with commas and all temporary markers with dots
  const resultString = stringWithDots.replace(/\./g, ',').replace(/#/g, '.');

  return resultString;
}
