"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";

import { recognitionCategoryList } from "@/config/category_selector";

interface CategoryProps {
  onCategorySelect?: (category: string) => void;
  isDark: boolean;
}

export const Category: React.FC<CategoryProps> = ({
  onCategorySelect,
  isDark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8">
      {recognitionCategoryList.map((category) => (
        <Button
          key={category.key}
          color={
            selectedCategory === category.label
              ? isDark
                ? "secondary"
                : "primary"
              : "default"
          }
          variant={selectedCategory === category.label ? "flat" : "light"}
          onPress={() => handleCategorySelect(category.label)}
          className={`p-2 transition-transform hover:scale-105 w-46 h-32 flex-[0_0_calc(33.333%-0.5rem)]
            ${
              selectedCategory === category.label
                ? isDark
                  ? "border-2 border-secondary"
                  : "border-2 border-primary"
                : ""
            }`}
        >
          <div className="flex flex-col items-center justify-center h-full mt-1">
            <Image
              alt={category.label}
              height={75}
              src={category.icon}
              width={75}
            />
            <span className="text-body-sm font-semibold mt-2 text-center hidden sm:block">
              {category.label}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};
