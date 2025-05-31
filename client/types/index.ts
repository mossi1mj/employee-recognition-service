import { SVGProps } from "react";
import { StaticImageData } from "next/image";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum categories {
  GOING_ABOVE_AND_BEYOND = "GOING_ABOVE_AND_BEYOND",
  INNOVATIVE_THINKING = "INNOVATIVE_THINKING",
  TEAMWORK_AND_COLLAB = "TEAMWORK_AND_COLLAB",
  PROBLEM_SOLVING = "PROBLEM_SOLVING",
  CUSTOMER_FOCUS = "CUSTOMER_FOCUS",
  EFFICIENCY_AND_PRODUCTVITY = "EFFICIENCY_AND_PRODUCTVITY",
}

export type Headline = {
  text: string;
  bold: boolean;
};

export type Categories = {
  name: string;
  icon: StaticImageData;
  displayName: string;
  headline: Headline[];
  shortDescription: string;
  longDescription: string;
};

export type Country = {
  name: string;
  code: string;
  iso: string;
};
