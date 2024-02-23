import type { IconName } from "~/types/icons";

export interface INavigation {
  id: string;
  title: string;
  icon?: IconName;
  link: string;
  isSelected?: boolean;
  children?: INavigation[];
}
