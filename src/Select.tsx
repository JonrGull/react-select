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
  return (
    <div tabIndex={0} className={styles.container}>
      <span className={styles.value}>Value</span>
      <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider} />
      <div className={styles.caret} />
      <ul className={`${styles.options} ${styles.show}`}>
        {options.map((opt) => (
          <li key={opt.label} className={styles.option}>
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
