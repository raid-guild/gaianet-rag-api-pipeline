import { defineConfig } from "vocs";

export default defineConfig({
  basePath: "/gaianet-rag-api-pipeline",
  banner: {
    dismissable: false,
    content: "This is still under development",
  },
  title: "RAG API Pipeline",
  description: "Supercharge your Gaianet node by generating a vector knowledge base from any API.",
  editLink: {
    pattern: 'https://github.com/raid-guild/gaianet-rag-api-pipeline/edit/main/docs/pages/:path', 
    text: 'Edit on GitHub'
  },
  iconUrl: '/icon.svg',
  sidebar: [
    {
      text: "Getting Started",
      link: "/getting-started",
    },
    {
      text: "API Examples",
      collapsed: true,
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
      ]
    },
    {
      text: "Defining the API Pipeline Manifest",
      link: "/manifest-definition",
    },
    {
      text: "Architecture",
      link: "/architecture",
    },
    {
      text: "Tech Stack",
      link: "/tech-stack",
    },
    {
      text: "Using with CLI",
      link: "/cli",
    },
    {
      text: "Working with Other APIs",
      link: "/other-apis",
    },
    {
      text: "Deployment",
      link: "/deployment",
    },
  ],
  topNav: [
    { text: "Home", link: "/" },
    {
      text: "APIs",
      items: [
        {
          text: "Boardroom Governance API",
          link: "/apis/boardroom-api"
        }
      ]
    }
  ],
  socials: [ 
    { 
      icon: 'github', 
      link: 'https://github.com/raid-guild/gaianet-rag-api-pipeline', 
    },
  ]
});
