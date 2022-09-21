import { useState } from "react";

import { Select } from "./Select";
import { SelectOption } from "./types";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <>
      <h1>Select Multiple</h1>
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(opt) => setValue1(opt)}
      />
      <br />
      <h1>Select Single</h1>
      <Select
        options={options}
        value={value2}
        onChange={(opt) => setValue2(opt)}
      />
    </>
  );
}

export default App;
