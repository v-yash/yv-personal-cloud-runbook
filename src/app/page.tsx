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
          <AnimatePresence mode="wait">
            {filteredCommands.length > 0 ? (
              <motion.div
                key={activeCategory || searchQuery || "all"}
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 }
                  }
                }}
              >
                {filteredCommands.map(cmd => (
                  <motion.div 
                    key={cmd.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                  >
                    <CommandCard command={cmd} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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
