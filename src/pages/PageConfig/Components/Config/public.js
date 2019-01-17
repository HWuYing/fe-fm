
export function moveArray(array, from, to) {
  const sortArray = [...array];

  let newArray = [];
  if (from < to) {
    newArray = sortArray.map((item, i) => {
      if (i >= from && i < to) return array[i + 1];
      if (i === to) return array[from];
      return item;
    });
  } else {
    newArray = sortArray.map((item, i) => {
      if (i === to) return array[from];
      if (i > to && i <= from) return array[i - 1];
      return item;
    });
  }
  return newArray;
}
