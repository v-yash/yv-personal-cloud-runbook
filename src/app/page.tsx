"use client";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import CommandCard from "@/components/CommandCard";
import { commands } from "@/data/commands";
import styles from "./page.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Calculate categories and counts
  const categories = useMemo(() => {
    const counts = commands.reduce((acc, cmd) => {
      acc[cmd.category] = (acc[cmd.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Setup Fuse.js for search
  const fuse = useMemo(() => new Fuse(commands, {
    keys: ["title", "description", "command", "tags", "category"],
    threshold: 0.3,
  }), []);

  // Filter commands based on search and category
  const filteredCommands = useMemo(() => {
    let result = commands;
    
    if (searchQuery) {
      result = fuse.search(searchQuery).map(res => res.item);
    }
    
    if (activeCategory) {
      result = result.filter(cmd => cmd.category === activeCategory);
    }
    
    return result;
  }, [searchQuery, activeCategory, fuse]);

  return (
    <main className={styles.main}>
      <Sidebar 
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} color="#94a3b8" />
            <input 
              type="text"
              placeholder="Search commands, tags, or explanations..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.commandsContainer}>
          <AnimatePresence>
            {filteredCommands.length > 0 ? (
              filteredCommands.map(cmd => (
                <CommandCard key={cmd.id} command={cmd} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.noResults}
              >
                No commands found. Try adjusting your search or category.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
