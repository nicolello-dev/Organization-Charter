import type { FilterOptionOption } from "react-select/dist/declarations/src/filters";

// Include all selects that contain the words in the input
export function filterOption(
  candidate: FilterOptionOption<any>,
  input: string,
) {
  return input
    .toLowerCase()
    .split(" ")
    .every((word) => {
      return candidate.label.toLowerCase().includes(word.toLowerCase());
    });
}
