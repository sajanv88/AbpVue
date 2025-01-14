import { navList } from "~/utils";
import type { INavigation } from "~/types/navigation";

const navCallback = (nav: INavigation): string | string[] => {
  if (nav.children && nav.children.length > 0) {
    return nav.children.map(navCallback) as string[];
  }
  return nav.link;
};
let validPaths = navList.map(navCallback).filter(Boolean).flat(2);

validPaths = [...validPaths, "/admin/profile", "/error/notfound"];
console.log(...validPaths, "validPaths");
export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath === "/") {
    return;
  }

  if (!validPaths.includes(to.fullPath)) {
    return navigateTo("/error/notfound");
  }
});
