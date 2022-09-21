import { useEffect, useRef, useState } from "react";

import styles from "./select.module.css";
import { SelectOption, SelectProps } from "./types";

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = () => (multiple ? onChange([]) : onChange(undefined));

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : value === option;
  };

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value?.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={styles["option-badge"]}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
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
            key={opt.value}
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
