import type { INavigation } from "~/types/navigation";

export function formatDate(input: string | number, locale = "en-Use"): string {
  const date = new Date(input);
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i++;
  }

  return range;
};

export const getPages = (
  totalPages: number,
  currentPage: number,
): (number | "SPACER")[] => {
  /**
   * totalNumbers: the total page numbers to show on the control
   * totalBlocks: totalNumbers + 2 to cover for the spacers
   */
  const totalNumbers = 5;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    let pages: Array<number | "SPACER"> = range(startPage, endPage);

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 3);
    switch (true) {
    // handle: (1) ... {6} [7] (8)
    case hasLeftSpill && !hasRightSpill: {
      const extraPages = range(startPage - spillOffset, startPage - 1);
      pages = ["SPACER", ...extraPages, ...pages];
      break;
    }

    // handle: (1) {2} [3] {4} ... (8)
    case !hasLeftSpill && hasRightSpill: {
      const extraPages = range(endPage + 1, endPage + spillOffset);
      pages = [...pages, ...extraPages, "SPACER"];
      break;
    }

    // handle: (1) ... {3} [4] {5} ... (8)
    case hasLeftSpill && hasRightSpill:
    default: {
      pages = ["SPACER", ...pages, "SPACER"];
      break;
    }
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
};

export const navList: Array<INavigation> = [
  {
    id: "home",
    title: "Home",
    icon: "home",
    link: "/admin",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "graph",
    link: "/admin/dashboard",
  },
  {
    id: "saas",
    title: "Saas",
    icon: "users",
    link: "",

    children: [
      {
        id: "tenants",
        title: "Tenants",
        link: "/admin/saas/tenants",
      },
    ],
  },
  {
    id: "admin",
    title: "Administration",
    icon: "configure",
    link: "",

    children: [
      {
        id: "identity",
        title: "Identity Management",
        link: "",
        icon: "identity",

        children: [
          {
            id: "roles",
            title: "Roles",
            link: "/admin/identity/roles",
          },
          {
            id: "users",
            title: "Users",
            link: "/admin/identity/users",
          },
        ],
      },
      {
        id: "settings",
        title: "Settings",
        link: "/admin/settings",
        icon: "settings",
      },
    ],
  },
];
