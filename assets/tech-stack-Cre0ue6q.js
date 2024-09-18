import{u as s,j as e}from"./index-Co7UtDcI.js";const a={title:"RAG API Pipeline Tech Stack",description:"undefined"};function r(i){const n={a:"a",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"rag-api-pipeline-tech-stack",children:["RAG API Pipeline Tech Stack",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#rag-api-pipeline-tech-stack",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"overview",children:["Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"This page outlines the technologies and tools utilized in the AI pipeline, covering data extraction, caching, processing, and vector search for efficient data flow and feature embedding generation."}),`
`,e.jsxs(n.h2,{id:"tech-stack",children:["Tech Stack",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#tech-stack",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"1-pyairbyte",children:["1. PyAirbyte",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-pyairbyte",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": Utilities for interacting with Airbyte connectors using Python."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Key Features"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Facilitates integration with Airbyte data sources."}),`
`,e.jsxs(n.li,{children:["Supports ",e.jsx(n.strong,{children:"Declarative API Connectors"})," via the Airbyte CDK, enabling low-code development of custom connectors."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"2-pathway",children:["2. Pathway",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-pathway",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": A Python-based data processing framework designed for creating AI-driven pipelines over data streams."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Core Technology"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rust Engine"})," with multithreading and multiprocessing capabilities for high performance."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Use Case"}),": Efficient data processing, enabling AI models to process large, real-time data streams."]}),`
`]}),`
`,e.jsxs(n.h3,{id:"3-data-caching",children:["3. Data Caching",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-data-caching",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": Implements caching mechanisms at various stages in the pipeline to optimize performance and reduce redundant data processing."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Technologies Used"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Airbyte DuckDB Cache"}),": Used for caching API data extractions, ensuring efficient retrieval of extracted data without re-querying the source."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JSONL Output Connectors"}),": After normalization and chunking, data is cached and stored in JSONL format, streamlining further processing stages."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"4-unstructured-python-library",children:["4. Unstructured (Python Library)",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-unstructured-python-library",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": Simplifies the ingestion and pre-processing of diverse data formats within data workflows, specifically designed for ",e.jsx(n.strong,{children:"Large Language Models (LLMs)"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Features"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Functions to ",e.jsx(n.strong,{children:"partition"}),", ",e.jsx(n.strong,{children:"chunk"}),", ",e.jsx(n.strong,{children:"clean"}),", and ",e.jsx(n.strong,{children:"stage"})," raw source documents for further analysis."]}),`
`,e.jsx(n.li,{children:"Optimized for unstructured data handling, making it easier to prepare data for machine learning tasks."}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"5-gaia-node-for-feature-embedding-generation",children:["5. Gaia Node for Feature Embedding Generation",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#5-gaia-node-for-feature-embedding-generation",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": The Gaia Node is responsible for generating feature embeddings, which are used to create dense vector representations of the data."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"RAG API Server"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Provides an ",e.jsx(n.strong,{children:"OpenAI-like API"})," to interact with the pipeline."]}),`
`,e.jsx(n.li,{children:"Embeddings generated here are used downstream in vector search and other AI models."}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"6-qdrantdb",children:["6. QdrantDB",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#6-qdrantdb",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": A ",e.jsx(n.strong,{children:"vector similarity search engine"})," and ",e.jsx(n.strong,{children:"vector database"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Key Features"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Provides efficient vector searches based on similarity, crucial for tasks like nearest-neighbor search in large datasets."}),`
`,e.jsxs(n.li,{children:["Acts as a ",e.jsx(n.strong,{children:"knowledge base snapshot"})," repository, storing vectors generated from processed data and feature embeddings."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"data-flow-overview",children:["Data Flow Overview",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#data-flow-overview",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data Extraction"}),": PyAirbyte connects to various data sources, using Airbyte DuckDB Cache for efficient retrieval."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Processing & Transformation"}),": Pathway handles real-time processing of data streams, transforming raw data into usable formats."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data Normalization & Caching"}),": Data undergoes normalization, is chunked, and stored in JSONL format."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Embedding Generation"}),": Gaia Node generates vector embeddings from processed data."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Vector Search"}),": QdrantDB allows for vector similarity search, enabling efficient knowledge retrieval based on embeddings."]}),`
`]})]})}function d(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{d as default,a as frontmatter};
