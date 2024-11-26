import { defineConfig } from "vocs";

export default defineConfig({
  basePath: "/gaianet-rag-api-pipeline",
  // banner: {
  //   dismissable: false,
  //   content: "This is still under development",
  // },
  title: "RAG API Pipeline",
  description:
    "Supercharge your Gaia node by generating a vector knowledge base from any API.",
  editLink: {
    pattern:
      "https://github.com/raid-guild/gaianet-rag-api-pipeline/edit/main/docs/pages/:path",
    text: "Edit on GitHub",
  },
  iconUrl: "/icon.svg",
  sidebar: [
    {
      text: "Getting Started",
      link: "/getting-started",
    },
    {
      text: "Defining the API Pipeline Manifest",
      collapsed: false,
      link: "/manifest-definition",
      items: [
        {
          text: "Overview",
          link: "/manifest-definition/overview",
        },
        {
          text: "Example Manifests",
          link: "/manifest-definition/sample-manifests",
        },
      ],
    },
    {
      text: "API Examples",
      collapsed: false,
      link: "/apis",
      items: [
        {
          text: "Boardroom API",
          link: "/apis/boardroom-api",
        },
        {
          text: "Agora API",
          link: "/apis/agora-api",
        },
        {
          text: "Other API Sources",
          link: "/apis/other-api-sources",
        },
      ],
    },
    {
      text: "RAG API Pipeline",
      collapsed: false,
      link: "/cli",
      items: [
        {
          text: "Setup",
          link: "/cli/setup",
        },
        {
          text: "CLI Reference",
          link: "/cli/reference",
        },
        {
          text: "Customize Pipeline Settings",
          link: "/cli/settings",
        },
        {
          text: "Gaia Node Deployment",
          link: "/cli/node-deployment",
        },
        {
          text: "Other LLM Providers",
          link: "/cli/other-llm-providers",
        },
      ],
    },
    {
      text: "Architecture",
      collapsed: false,
      link: "/architecture",
      items: [
        {
          text: "Overview",
          link: "/architecture/overview",
        },
        {
          text: "Tech stack",
          link: "/architecture/tech-stack",
        },
        {
          text: "In-depth code review",
          link: "/architecture/code-review",
        },
      ],
    },
  ],
  topNav: [
    {
      text: "APIs",
      items: [
        {
          text: "Boardroom Governance API",
          link: "/apis/boardroom-api",
        },
      ],
    },
  ],
  socials: [
    {
      icon: "github",
      link: "https://github.com/raid-guild/gaianet-rag-api-pipeline",
    },
  ],
});
