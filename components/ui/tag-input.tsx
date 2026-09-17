"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TagProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  text: string;
  onRemove: () => void;
}

const Tag = ({ text, onRemove }: TagProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.8, y: -10, filter: "blur(10px)" }}
      transition={{
        duration: 0.4,
        ease: "circInOut",
        type: "spring",
      }}
      className="bg-muted px-2 py-1 rounded-xl text-sm flex items-center gap-1 shadow-sm backdrop-blur-sm text-foreground border border-border"
    >
      {text}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          type="button"
          onClick={onRemove}
          className="bg-transparent text-xs h-fit flex items-center rounded-full justify-center text-muted-foreground p-1 hover:bg-accent hover:text-accent-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.span>
  );
};

interface InputWithTagsProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  limit?: number;
}

const InputWithTags = ({
  value,
  onChange,
  placeholder,
  className,
  limit = 10,
}: InputWithTagsProps) => {
  const [internalTags, setInternalTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const tags = value !== undefined ? value : internalTags;

  const updateTags = (newTags: string[]) => {
    setInternalTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/^,|,$/g, "");
      if (newTag && (!limit || tags.length < limit) && !tags.includes(newTag)) {
        updateTags([...tags, newTag]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      updateTags(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    updateTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn("flex flex-col gap-2 max-w-xl w-full", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Tapez un poste et appuyez sur Entrée..."}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full px-4 py-2 bg-background shadow-sm border border-input rounded-xl backdrop-blur-sm text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed outline-none ring-0 focus-visible:ring-2 focus-visible:ring-ring/30"
          disabled={limit ? tags.length >= limit : false}
        />
      </motion.div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`} text={tag} onRemove={() => removeTag(index)} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { InputWithTags };