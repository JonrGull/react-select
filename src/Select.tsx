import { useEffect, useState } from "react";

import styles from "./select.module.css";

type SelectOptions = {
  label: string;
  value: any;
};

type SelectProps = {
  options: SelectOptions[];
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clearOptions = () => onChange(undefined);

  const selectOption = (option: SelectOptions) => onChange(option);

  const isOptionSelected = (option: SelectOptions) => option === value;

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // stops click event from going all the way to parent div
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider} />
      <div className={styles.caret} />
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((opt, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(opt);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={opt.label}
            className={`${styles.option} ${
              isOptionSelected(opt) ? styles.selected : ""
            } ${highlightedIndex === index ? styles.highlighted : ""}`}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
