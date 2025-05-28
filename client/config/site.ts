export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Employee Applause",
  description:
    "The Employee Applause app is a platform for recognizing and celebrating employee achievements, fostering a positive workplace culture.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "My Applause",
      href: "/my-applause",
    },
    {
      label: "Team",
      href: "/team",
    },
  ],
  navMenuItems: [
    {
      label: "My Applause",
      href: "/my-applause",
    },
    {
      label: "Team",
      href: "/team",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
