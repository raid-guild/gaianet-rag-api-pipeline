import{u as r,j as e}from"./index-CnErcBSh.js";const d={title:"Architecture Overview",description:"undefined"};function t(i){const n={a:"a",code:"code",div:"div",h1:"h1",header:"header",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"architecture-overview",children:["Architecture Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#architecture-overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"https://raw.githubusercontent.com/raid-guild/gaianet-rag-api-pipeline/refs/heads/main/docs/public/architecture.png",alt:"architecture"})}),`
`,e.jsxs(n.p,{children:["The diagram above illustrates the system architecture. When executing the ",e.jsx(n.code,{children:"rag-api-pipeline"})," CLI, the tool performs the following steps:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["The API ",e.jsx(n.code,{children:"Loader"})," module reads both the API pipeline manifest and the OpenAPI specification."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"Loader"})," module generates an Airbyte declarative stream manifest and forwards it to the ",e.jsx(n.code,{children:"Pipeline"})," module."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"Pipeline"})," module initiates the Pathway engine."]}),`
`,e.jsxs(n.li,{children:["The engine uses an ",e.jsx(n.code,{children:"Airbyte UDF connector"})," module to extract data from each API endpoint as independent streams."]}),`
`,e.jsxs(n.li,{children:["Extracted data flows through the RAG pipeline stages: stream preprocessing, data normalization, data partitioning and chunking, and feature embeddings generation.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["(5.4) The ",e.jsx(n.code,{children:"Feature Embeddings"})," generation module can be configured to use an OpenAI-compatible API provider, such as a Gaia node, to generate vector embeddings with your preferred LLM embeddings model. Visit the ",e.jsx(n.a,{href:"/cli/other-llm-providers",children:"Other LLM Providers"})," page for details on other supported LLM providers."]}),`
`,e.jsxs(n.li,{children:["(5.5) Generated vector embeddings are stored in a Qdrant DB instance using the ",e.jsx(n.code,{children:"qdrant"})," output module."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"qdrant"})," module automatically generates and compresses a DB vector snapshot for the current vector embeddings collection."]}),`
`,e.jsx(n.li,{children:"The resulting knowledge base snapshot can be imported into a Gaia node either through local upload or by uploading to an AI dataset/model provider such as HuggingFace."}),`
`,e.jsx(n.li,{children:"The node joins the GaiaNet network to provide an LLM model with custom domain knowledge that can be used to deliver various RAG applications to end users."}),`
`]})]})}function o(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{o as default,d as frontmatter};
