import{u as r,j as e}from"./index-DFtmkvAK.js";const d={title:"Architecture Overview",description:"undefined"};function i(t){const n={a:"a",code:"code",div:"div",h1:"h1",header:"header",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"architecture-overview",children:["Architecture Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#architecture-overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"https://raw.githubusercontent.com/raid-guild/gaianet-rag-api-pipeline/72403cc4503ce65da4e737eb8f68c03aa5772f44/architecture.png",alt:"architecture"})}),`
`,e.jsxs(n.p,{children:["The diagram above showcases the system architecture. When running the ",e.jsx(n.code,{children:"rag-api-pipeline"})," CLI, the tool executes the following steps:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["The API ",e.jsx(n.code,{children:"Loader"})," module reads both the API pipeline manifest and the OpenAPI spec."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"Loader"})," module generates an Airbyte declarative stream manifest and forwards it to the ",e.jsx(n.code,{children:"Pipeline"})," module."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"Pipeline"})," module starts the Pathway engine."]}),`
`,e.jsxs(n.li,{children:["The engine uses an ",e.jsx(n.code,{children:"Airbyte UDF connector"})," module to extract data from each API endpoint as independent streams."]}),`
`,e.jsxs(n.li,{children:["Extracted data flows through the RAG pipeline stages: stream preprocesing, data normalization, data partitioning and chunking and feature embeddings generation.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["(5.4) The ",e.jsx(n.code,{children:"Feature Embeddings"}),` generation module can be setup to use either Ollama or an OpenAI-compatible API provider such as a Gaia node to generate vector embeddings with
the LLM embeddings model of your preference.`]}),`
`,e.jsxs(n.li,{children:["(5.5) Generated vector embeddings are then stored on a Qdrant DB instance using the ",e.jsx(n.code,{children:"qdrant"})," output module."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"qdrant"})," module automatically generates and compress a DB vector snapshot for the current vector embeddings collection."]}),`
`,e.jsx(n.li,{children:"The resulting knowledge base snapshot can then be imported into a Gaia node via local upload or by uploading to a AI dataset/model provider such as HuggingFace."}),`
`,e.jsx(n.li,{children:"The node joins the GaiaNet network to offer an LLM model with custom domain knowledge that can be used to provide different RAG applications to end users."}),`
`]})]})}function o(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{o as default,d as frontmatter};
