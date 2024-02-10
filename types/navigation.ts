import type { IconName } from '~/types/icons';

export interface INavigation {
  id: string;
  title: string;
  icon?: IconName;
  link: string;
  children?: INavigation[];
}
