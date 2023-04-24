// -label and -value must be key of T
export const selectOptionsParser = (data, label, value) =>
  (data || []).map(item => ({
    label: item[label],
    value: item[value],
  }));
