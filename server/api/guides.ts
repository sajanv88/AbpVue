import { sendWebResponse } from "h3";

const guides: Array<{
  title: string;
  description: string;
  link: {
    hrefs: Array<{ name: string; url: string }>;
  };
}> = [
  {
    title: "Learn the ABP Framework",
    description: `Explore the comprehensive documentation to learn how to build a modern web application.`,
    link: {
      hrefs: [
        {
          name: "See Documents",
          url: "https://docs.abp.io/en/abp/latest?ref=tmpl",
        },
      ],
    },
  },
  {
    title: "Checkout Samples",
    description: "See the example projects built with the ABP Framework.",
    link: {
      hrefs: [
        {
          name: "All samples",
          url: "https://docs.abp.io/en/abp/latest/Samples/Index?ref=tmpl",
        },
      ],
    },
  },
  {
    title: "ABP Community",
    description:
      "Get involved with a vibrant community and become a contributor.",
    link: {
      hrefs: [
        {
          name: "Community",
          url: "https://community.abp.io/",
        },
        {
          name: "Contribution Guide",
          url: "https://docs.abp.io/en/abp/latest/Contribution/Index?ref=tmpl",
        },
      ],
    },
  },
  {
    title: "ABP Blog",
    description: `Take a look at our recently published articles.`,
    link: {
      hrefs: [
        {
          name: "Blog",
          url: "https://blog.abp.io/abp?ref=tmpl",
        },
      ],
    },
  },
  {
    title: "Github",
    description: `Do you love the ABP Framework and AbpVue Template? Please give a star to support it!`,
    link: {
      hrefs: [
        {
          name: "Request a feature",
          url: "https://github.com/sajanv88/AbpVue/issues/new?template=feature.md",
        },
        {
          name: "Issues",
          url: "https://github.com/sajanv88/AbpVue/issues/",
        },
        {
          name: "Fork",
          url: "https://github.com/sajanv88/AbpVue/fork",
        },
      ],
    },
  },
  {
    title: "Stackoverflow",
    description: `See answers to previously asked questions or ask a new one.`,
    link: {
      hrefs: [
        {
          name: "Questions",
          url: "https://stackoverflow.com/questions/tagged/abp",
        },
        {
          name: "Ask a question",
          url: "https://stackoverflow.com/questions/ask",
        },
      ],
    },
  },
];

const commercials: Array<{
  title: string;
  description: string;
  link: {
    hrefs: Array<{ name: string; url: string }>;
  };
}> = [
  {
    title: "Pre-built Modules",
    description: `Use sidebar menu to explore the pre-built modules!`,
    link: {
      hrefs: [
        {
          name: "See All Modules",
          url: "https://commercial.abp.io/modules?ref=tmpl",
        },
      ],
    },
  },
  {
    title: "Modern UI Themes",
    description: `ABP Commercial theme provides multiple layout variations with different styles and colors!.`,
    link: {
      hrefs: [
        {
          name: "See  Themes",
          url: "https://commercial.abp.io/themes",
        },
      ],
    },
  },
  {
    title: "Multiple UI & Database Options",
    description: `ABP Commercial provides multiple UI and database options to choose from Angular, MVC Razor pages, Blazir, Database Providers, etc.`,
    link: {
      hrefs: [],
    },
  },
  {
    title: "Abp Framework",
    description: `ABP Commercial is based on the ABP Framework, an open source and community driven web application framework for ASP.NET Core.`,
    link: {
      hrefs: [
        {
          name: "ABP Framework",
          url: "https://abp.io/?ref=tmpl",
        },
      ],
    },
  },
  {
    title: "Abp Suite | Don't Repeat Yourself (DRY)",
    description: `ABP Suite can generate basic CRUD functionalities for you from the database layer to the UI layer.`,
    link: {
      hrefs: [
        {
          name: "ABP Suite",
          url: "https://commercial.abp.io/tools/suite",
        },
      ],
    },
  },
  {
    title: "Abp Community",
    description: `It is a place where people can share ABP related articles. Search for articles, tutorials, code samples, case studies and meet people in the same lane as you.`,
    link: {
      hrefs: [
        {
          name: "ABP Community",
          url: "https://community.abp.io/?ref=tmpl",
        },
      ],
    },
  },
];
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.type === "commercials") {
    setResponseStatus(event, 200, "OK");
    await sendWebResponse(event, Response.json(commercials));
    return;
  }
  await sendWebResponse(event, Response.json(guides));
});
