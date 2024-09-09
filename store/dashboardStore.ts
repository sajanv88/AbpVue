interface TotalSales {
  amount: number;
  name: string;
  min: number;
  max: number;
}

interface Data {
  totalSales: TotalSales[];
}
interface DashboardStoreState {
  data: Data | null;
}

export const useDashboard = defineStore("dashboard", {
  state: (): DashboardStoreState => ({
    data: null,
  }),
  actions: {
    async fetch() {
      // Point your abp endpoint here.
      this.data = {
        totalSales: [
          {
            amount: 1600,
            name: "January",
            min: 400,
            max: 899,
          },
          {
            amount: 900,
            name: "February",
            min: 400,
            max: 1000,
          },
          {
            amount: 1200,
            name: "March",
            min: 400,
            max: 1150,
          },
          {
            amount: 2000,
            name: "April",
            min: 700,
            max: 1800,
          },
          {
            amount: 3000,
            name: "May",
            min: 1500,
            max: 2000,
          },
          {
            amount: 6000,
            name: "May",
            min: 1500,
            max: 3000,
          },
        ],
      };
    },
  },
});
