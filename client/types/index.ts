import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Country = {
  name: string;
  code: string;
  iso: string;
};

export type UseRecognitionsOptions = {
  senderId?: number | null;
  recipientId?: number | null;
  limit?: number | null;
  skip?: number | null;
};
