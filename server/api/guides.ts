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
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 200, "OK");
  console.log("guides", event.path);
  await sendWebResponse(event, Response.json(guides));
});
