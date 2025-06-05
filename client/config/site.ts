import { OpenAPI } from "../openapi";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Employee Recognition",
  description:
    "The Employee Recognition app is a platform for recognizing and celebrating employee achievements, fostering a positive workplace culture.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recognitions",
      href: "/recognitions",
    },
    {
      label: "Team",
      href: "/team",
    },
  ],
  navMenuItems: [
    {
      label: "Recognitions",
      href: "/recognitions",
    },
    {
      label: "Team",
      href: "/team",
    },
  ],
  links: {
    github: "https://github.com/mossi1mj/employee-recognition-service",
  },
};

export const url = `${OpenAPI.BASE.replace(/^http/, "ws")}/ws/recognitions`;
