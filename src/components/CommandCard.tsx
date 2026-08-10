"use client";
import { CommandEntry } from "@/data/commands";
import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CommandCard.module.css";

interface Props {
  command: CommandEntry;
}

export default function CommandCard({ command }: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className={`glass ${styles.card}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.header}>
        <span className={styles.category}>{command.category}</span>
        <h3 className={styles.title}>{command.title}</h3>
      </div>
      <p className={styles.description}>{command.description}</p>
      
      <div className={styles.codeContainer}>
        <code className={styles.code}>{command.command}</code>
        <button onClick={handleCopy} className={styles.copyBtn} aria-label="Copy code">
          {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
        </button>
      </div>

      {command.sampleOutput && (
        <div className={styles.expandSection}>
          <button 
            className={styles.expandBtn} 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Output" : "Show Sample Output"}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={styles.outputContainer}
              >
                <pre className={styles.output}><code>{command.sampleOutput}</code></pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      
      <div className={styles.tags}>
        {command.tags.map(tag => (
          <span key={tag} className={styles.tag}>#{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}
