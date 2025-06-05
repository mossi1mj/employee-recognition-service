import { RecognitionCategory } from "@/openapi";

export const recognitionCategoryMeta: {
  [key in RecognitionCategory]: {
    label: string;
    icon: string;
  };
} = {
  [RecognitionCategory.TEAMWORK]: {
    label: "Team Work",
    icon: "/icons/teamwork.png",
  },
  [RecognitionCategory.INNOVATION]: {
    label: "Innovation",
    icon: "/icons/innovation.png",
  },
  [RecognitionCategory.LEADERSHIP]: {
    label: "Leadership",
    icon: "/icons/leadership.png",
  },
  [RecognitionCategory.HELPFULNESS]: {
    label: "Helpfulness",
    icon: "/icons/helpfulness.png",
  },
  [RecognitionCategory.EXCELLENCE]: {
    label: "Excellence",
    icon: "/icons/excellence.png",
  },
  [RecognitionCategory.POSITIVITY]: {
    label: "Positivity",
    icon: "/icons/positivity.png",
  },
};

// Optional: Export as an array if you prefer mapping
export const recognitionCategoryList = Object.entries(
  recognitionCategoryMeta
).map(([key, { label, icon }]) => ({
  key: key as RecognitionCategory,
  label,
  icon,
}));
