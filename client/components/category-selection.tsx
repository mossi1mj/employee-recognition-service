"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";

import AboveBeyond from "../public/icons/AA_Above and beyond.svg";
import ThankYou from "../public/icons/AA_Thank you.svg";
import Awesome from "../public/icons/AA_Youre awesome.svg";
import Teamwork from "../public/icons/AA_Teamwork.svg";
import Better from "../public/icons/AA_You make us better.svg";
import Focus from "../public/icons/AA_You did it.svg";

import { Category, category } from "@/types";

export const staticCategories: Category[] = [
  {
    name: category.GOING_ABOVE_AND_BEYOND,
    icon: ThankYou,
    displayName: "Thank you",
    headline: [{ text: "Sending thanks for great work.", bold: false }],
    shortDescription:
      "Thanks for the great attitude. Here comes the gratitude.",
    longDescription:
      "Palms together, people. Your teammate is sending a big thanks your way.",
  },
  {
    name: category.INNOVATIVE_THINKING,
    icon: AboveBeyond,
    displayName: "Above and beyond",
    headline: [
      { text: "Recognizing exceptional effort and results.", bold: false },
    ],
    shortDescription: "Compliments to the chef.",
    longDescription:
      "They say the cream rises, and so do you - thanks for going above and beyond.",
  },
  {
    name: category.TEAMWORK_AND_COLLAB,
    icon: Teamwork,
    displayName: "Teamwork",
    headline: [{ text: "Celebrating excellent collaboration.", bold: false }],
    shortDescription: "Pound it - you make teamwork look easy.",
    longDescription:
      "You're a great teammate, and your coworkers want you to know it. Keep up the amazing collab skills.",
  },
  {
    name: category.PROBLEM_SOLVING,
    icon: Awesome,
    displayName: "You're awesome",
    headline: [
      { text: "Appreciating your awesome contributions.", bold: false },
    ],
    shortDescription:
      "Like a secret admirer of your work, only not a secret at all.",
    longDescription:
      "You're amazing, and your teammates want you to know they love what you do. Great job!",
  },
  {
    name: category.CUSTOMER_FOCUS,
    icon: Better,
    displayName: "You make us better",
    headline: [
      { text: "Recognizing your positive impact on the team.", bold: false },
    ],
    shortDescription: "Sparky says, these are spirit fingers.",
    longDescription:
      "You bring the Ally spirit and make us better with what you do and how you do it.",
  },
  {
    name: category.EFFICIENCY_AND_PRODUCTVITY,
    icon: Focus,
    displayName: "Focused in",
    headline: [
      { text: "Acknowledging your focus and determination.", bold: false },
    ],
    shortDescription: "Pencils down and hands up - you got it done.",
    longDescription:
      "You keep your eye on the prize. Way to stay relentless and locked in on what matters most.",
  },
];

interface CategorySelectionProps {
  onCategorySelect?: (category: string) => void;
  isDark: boolean;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
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
      {staticCategories.map((category) => (
        <Button
          key={category.name}
          color={
            selectedCategory === category.name
              ? isDark
                ? "secondary"
                : "primary"
              : "default"
          }
          variant={selectedCategory === category.name ? "flat" : "light"}
          onPress={() => handleCategorySelect(category.name)}
          className={`p-2 transition-transform hover:scale-105 w-46 h-32 flex-[0_0_calc(33.333%-0.5rem)]
            ${
              selectedCategory === category.name
                ? isDark
                  ? "border-2 border-secondary"
                  : "border-2 border-primary"
                : ""
            }`}
        >
          <div className="flex flex-col items-center justify-center h-full mt-1">
            <Image
              src={category.icon}
              alt={category.displayName}
              width={75}
              height={75}
            />
            <span className="text-body-sm font-semibold mt-2 text-center hidden sm:block">
              {category.displayName}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};
