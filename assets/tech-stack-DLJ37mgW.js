import{u as s,j as e}from"./index-C71fZo5T.js";const a={title:"Tech Stack",description:"undefined"};function r(i){const n={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"tech-stack",children:["Tech Stack",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#tech-stack",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.p,{children:["This page outlines the technologies and tools integrated into the ",e.jsx(n.code,{children:"rag-api-pipeline"})," across different execution stages."]}),`
`,e.jsxs(n.h2,{id:"tools--frameworks",children:["Tools & Frameworks",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#tools--frameworks",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"1-rag-pipeline-over-data-stream-pathway-docs",children:["1. RAG Pipeline over Data Stream: Pathway (",e.jsx(n.a,{href:"https://pathway.com/developers/user-guide/introduction/welcome/",children:"Docs"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-rag-pipeline-over-data-stream-pathway-docs",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": A Python-based data processing framework designed for creating AI-driven pipelines over data streams"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Core Technology"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rust Engine"})," with multithreading and multiprocessing capabilities for high performance"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Use Case"}),": Efficient data processing, enabling integration with third-party data-related tools and AI models to process large, real-time data streams"]}),`
`]}),`
`,e.jsxs(n.h3,{id:"2-data-extraction-from-rest-api-sources-pyairbyte-docs--airbyte-cdk-docs",children:["2. Data Extraction from REST API Sources: PyAirbyte (",e.jsx(n.a,{href:"https://airbytehq.github.io/PyAirbyte/airbyte.html#getting-started",children:"Docs"}),") + Airbyte CDK (",e.jsx(n.a,{href:"https://docs.airbyte.com/connector-development/config-based/low-code-cdk-overview",children:"Docs"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-data-extraction-from-rest-api-sources-pyairbyte-docs--airbyte-cdk-docs",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": Utilities for interacting with Airbyte declarative stream connectors using Python"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Key Features"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Facilitates integration with Airbyte data sources"}),`
`,e.jsxs(n.li,{children:["Supports ",e.jsx(n.strong,{children:"Declarative API Connectors"})," via the Airbyte CDK, enabling low-code development of custom connectors"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"3-data-caching-duckdb-docs--pathway-jsonl-connector-docs",children:["3. Data Caching: DuckDB (",e.jsx(n.a,{href:"https://airbytehq.github.io/PyAirbyte/airbyte/caches.html#DuckDBCache",children:"Docs"}),") + Pathway JSONL Connector (",e.jsx(n.a,{href:"https://pathway.com/developers/user-guide/connect/connectors/jsonlines-connector",children:"Docs"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-data-caching-duckdb-docs--pathway-jsonl-connector-docs",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": Implements caching mechanisms at various pipeline stages to optimize performance and reduce redundant data processing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Technologies Used"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Airbyte DuckDB Cache"}),": Used for caching API data extractions, ensuring efficient retrieval of extracted data without re-querying the source"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"JSONL Output Connectors"}),": After normalization and chunking, data is cached and stored in JSONL format, streamlining further processing stages"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"4-data-partitioning-and-chunking-unstructured-open-source-docs",children:["4. Data Partitioning and Chunking: Unstructured Open Source (",e.jsx(n.a,{href:"https://docs.unstructured.io/open-source/introduction/overview",children:"Docs"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-data-partitioning-and-chunking-unstructured-open-source-docs",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": Simplifies the ingestion and preprocessing of diverse data formats within data workflows, specifically designed for ",e.jsx(n.strong,{children:"Large Language Models (LLMs)"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Features"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Functions to ",e.jsx(n.strong,{children:"partition"}),", ",e.jsx(n.strong,{children:"chunk"}),", ",e.jsx(n.strong,{children:"clean"}),", and ",e.jsx(n.strong,{children:"stage"})," raw source documents for further analysis"]}),`
`,e.jsx(n.li,{children:"Optimized for unstructured data handling, making it easier to prepare data for machine learning tasks"}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"5-feature-embedding-generation",children:["5. Feature Embedding Generation:",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#5-feature-embedding-generation",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": connects to a LLM provider and is responsible for generating feature embeddings, which create dense vector representations of the extracted data."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Technologies Used"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Gaia Node"})," (",e.jsx(n.a,{href:"https://docs.gaianet.ai/category/node-operator-guide",children:"Docs"}),"): Offers a ",e.jsx(n.em,{children:"RAG API Server"})," that provides an ",e.jsx(n.em,{children:"OpenAI-like API"})," to interact with hosted LLM models"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ollama"})," (",e.jsx(n.a,{href:"https://ollama.com/",children:"Docs"}),"): Easy-to-install LLM engine for running large language models on a local machine"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Python Libraries"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://docs.litellm.ai/docs/providers/openai_compatible",children:"litellm"})," Python library for connecting with OpenAI-compatible LLM providers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/ollama/ollama-python",children:"ollama"})," Python library for interacting with a local Ollama instance"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h3,{id:"6-vector-embeddings-database-snapshot-qdrantdb-docs",children:["6. Vector Embeddings Database Snapshot: QdrantDB (",e.jsx(n.a,{href:"https://qdrant.tech/documentation/",children:"Docs"}),")",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#6-vector-embeddings-database-snapshot-qdrantdb-docs",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Description"}),": A ",e.jsx(n.strong,{children:"vector database"})," and ",e.jsx(n.strong,{children:"vector similarity search engine"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Key Features"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Provides efficient vector searches based on similarity, crucial for tasks like nearest-neighbor search in large datasets"}),`
`,e.jsxs(n.li,{children:["Acts as a ",e.jsx(n.strong,{children:"knowledge base snapshot"})," repository, storing vectors generated from processed data and feature embeddings"]}),`
`]}),`
`]}),`
`]})]})}function d(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{d as default,a as frontmatter};
