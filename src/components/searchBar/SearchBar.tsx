"use client";

import styles from "./SearchBar.module.css";

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, onSearch, placeholder = "Buscar…" }: SearchBarProps) => {
  const handleChange = (nextValue: string) => {
    onChange(nextValue);
    onSearch(nextValue);
  };

  return (
    <div className={styles.container}>
      <input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />

      <button
        onClick={() => onSearch(value)}
        className={styles.button}
        aria-label="Pesquisar"
        title="Pesquisar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
