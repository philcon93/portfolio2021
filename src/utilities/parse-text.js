const takeUntilEmptyLine = (text) => {
  let result = [];
  
  for (
    let row = text.shift();
    row && row.trim().length > 0;
    row = text.shift()
  ) {
    result.push(row.trim());
  }
  
  return result;
}
  
export const parseText = (text, group) => {
  text = text.split("\n");

  let carols = { [group]: [] };

  while (text.length > 0) {
    const title = takeUntilEmptyLine(text)[0];
    const carol = takeUntilEmptyLine(text);

    carols[title] = carol;
    carols[group] = [...carols[group], ...carol];
  }

  return carols;
}
  