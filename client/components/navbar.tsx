"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Github, Moon, Sun } from "lucide-react";

import { siteConfig } from "@/config/site";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@heroui/react";
import { useUserContext } from "@/context/UserContext";
import { Logo } from "./icons";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const { user } = useUserContext();

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Left content */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink href="/" className="flex items-center gap-1">
            <Logo />
            <p className="font-bold text-inherit">EMREC</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right content (desktop) */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <Tooltip
          content="GitHub Repository"
          placement="bottom"
          showArrow={true}
        >
          <Button
            as="a"
            isIconOnly
            variant="light"
            size="sm"
            href={siteConfig.links.github}
          >
            <Github size={20} />
          </Button>
        </Tooltip>
        <Switch
          endContent={<Moon size={16} />}
          isSelected={theme === "light" || isSSR}
          size="sm"
          startContent={<Sun size={16} />}
          onValueChange={onChange}
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="default"
              name={user?.firstName || "User"}
              size="sm"
              src={
                user?.image || "https://avatars.githubusercontent.com/u/1?v=4"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              {user && (
                <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
              )}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* Right content (mobile) */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Switch
          endContent={<Moon size={16} />}
          isSelected={theme === "light" || isSSR}
          size="sm"
          startContent={<Sun size={16} />}
          onValueChange={onChange}
        />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={item.href}>
              <Link
                as={NextLink}
                href={item.href}
                size="lg"
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "secondary"
                      : "foreground"
                }
                className="font-semibold"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          <NavbarMenuItem>
            <Link
              as={NextLink}
              href={siteConfig.links.github}
              target="_blank"
              size="lg"
              color="primary"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Github size={16} /> GitHub
              </span>
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
