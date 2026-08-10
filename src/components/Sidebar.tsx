"use client";
import { Terminal } from "lucide-react";
import styles from "./Sidebar.module.css";
import { Category } from "@/data/commands";

interface Props {
  categories: { name: string; count: number }[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function Sidebar({ categories, activeCategory, onSelectCategory }: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Terminal className={styles.logoIcon} color="#3b82f6" />
        <span className="text-gradient">Cloud Runbook</span>
      </div>

      <div className={styles.nav}>
        <h4 className={styles.navTitle}>Categories</h4>
        <button 
          className={`${styles.navItem} ${activeCategory === null ? styles.active : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <span>All Commands</span>
          <span className={styles.badge}>
            {categories.reduce((acc, cat) => acc + cat.count, 0)}
          </span>
        </button>
        
        {categories.map((cat) => (
          <button 
            key={cat.name}
            className={`${styles.navItem} ${activeCategory === cat.name ? styles.active : ''}`}
            onClick={() => onSelectCategory(cat.name)}
          >
            <span>{cat.name}</span>
            <span className={styles.badge}>{cat.count}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
