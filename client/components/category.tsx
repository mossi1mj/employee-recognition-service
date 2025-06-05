"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";

import { recognitionCategoryList } from "@/config/categories";
import { useRecognitionForm } from "@/context/FormContext";

export const Category: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { values, setCategory } = useRecognitionForm();
  const selectedCategory = values.category;

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8">
      {recognitionCategoryList.map((category) => (
        <Button
          key={category.key}
          className={`p-2 transition-transform hover:scale-105 w-46 h-32 flex-[0_0_calc(33.333%-0.5rem)]
            ${
              selectedCategory === category.key
                ? "border-2 border-secondary"
                : ""
            }`}
          color={selectedCategory === category.key ? "secondary" : "default"}
          variant={selectedCategory === category.key ? "flat" : "light"}
          onPress={() => setCategory(category.key)}
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
