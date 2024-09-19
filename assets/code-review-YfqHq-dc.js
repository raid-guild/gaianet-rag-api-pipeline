import{u as t,j as e}from"./index-DFtmkvAK.js";const s={title:"In-depth Source Code Review",description:"undefined"};function a(n){const i={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"in-depth-source-code-review",children:["In-depth Source Code Review",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#in-depth-source-code-review",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(i.p,{children:`In the following sections, we'll walk you through the different modules that conform the RAG (Retrieval-Augmented Generation) API Pipeline architecture.
The system is designed to extract, preprocess, parse and store data streams from an API source, then creates a vector embeddings knowledge base that can be
queried using natural language processing and/or hybrid search techniques. Resulting data from each stage of the pipeline is serialized using a Json lines format,
so they can be easily cached and reused.`}),`
`,e.jsxs(i.h2,{id:"data-flow-overview",children:["Data Flow Overview",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#data-flow-overview",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx("iframe",{src:"https://mermaid.live/view#pako:eNplVF1vozAQ_CuWXy8l4SPQoNNJiZqmVZM2Ou7pnD44eAOogJEx7eWa_PdbQ0lzqSUke3Z2Zz22eaexFEBDmihepeTXbFMSHHWz7YBpprZ7DWxDP2bkG1lznb7x_YY-d2Qz1iu2zirIsxLIipfZDmr9TK6ufhxsyyYKuDiQ6ZJN1_dLyQWos9SniD1VUGKIRBXEfZZzyvqkTpdt0MGSCZSguIYDiVYsko2KgRS98GdGtGozXMyoNVf6QH5OFww_0rd7RjawYXstWyos_jBjD6V8y0EkQGa8Pqc_zD7YTs_GAl0YSnFhJIYiUK-g0Eqj0263Bf7zcblcMfxIgaeSn5s0ve9cujeZZ4H5is2LLQiRlcmXrItmZgs2k1wJJWVBFhK1S16ib6ai2Up_2h27d2NsjcgOuG4UEOilDp8b6tgfZvhIjkpe1anUXzgXy8UjW_CMP4ImayW1jGVOcPEm1cvzRQL5btpbPHbw3S27a5LE7PiWx4C9WyhtLtYXyZP_S0hOPrRG2wxFY6jrc_cddsM1J5E5znPcZfM_2tiVt4eWxX0Ua9IBLUAVPBP4jN4NvKE6hQI2NMSp4OplQzflEXm80TLalzENtWpgQJVskpSGO57XuGoqgRf6JuPYcXGBzkWGPZ3AvH1ENHynel-1zzerNQrEstxlicEblSOcal3V4XBowlaS6bTZWrEshnUmUnwN6evEH_qOf80dF_zA5WPXFfHWnlzvHM_eiWBkO5wejwMKrf6q-1e0v4wBrXj5G2_SqSlcG-U_NPS8seU7I8_3XMcbjQN_PKB7GrquhdBoPPa8IJg49gQL_20rjKxrN_B8Z-Lb2Ebg-sHxHxjOZcQ",width:"100%",height:"900px"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"API Loader"}),": generates an Airbyte declarative stream manifest using the input API pipeline manifest and the API OpenAPI spec."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Data Extraction"}),`: PyAirbyte uses the source manifest to create individual data stream for each of the specified API endpoints.
Raw data is then cached using Airbyte DuckDB for efficient API data retrieval.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Processing & Transformation"}),`: Pathway handles real-time pre-processing of data streams, transforming raw data into usable format. Endpoint text fields specified
in the API pipeline manifest are joined together into a `,e.jsx(i.code,{children:"content"})," field, while the rest of fields go into a JSON ",e.jsx(i.code,{children:"metadata"})," object."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Data Normalization"}),": pre-processed data streams are joined together into a single normalized stream."]}),`
`,e.jsxs(i.li,{children:["•",e.jsx(i.em,{children:"Data Partitioning & Chunking"}),"*: normalized data records are then partitioned and chunked."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Vector Embeddings Generation"}),": the pipeline connects to an LLM provider to use a hosted embedding model to generate vector embeddings from chunked data records."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Loading Knowledge Base Snapshot"}),`: a resulting QdrantDB collection snapshot can then be imported into a Gaia node so the LLM model can use the domain knowledge
to provide RAG-based answers to end users.`]}),`
`]}),`
`,e.jsxs(i.h2,{id:"pipeline-components",children:["Pipeline Components",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pipeline-components",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"cli-entrypoint-source",children:["CLI entrypoint (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/run.py",children:"Source"}),")",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cli-entrypoint-source",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["The entrypoint module uses ",e.jsx(i.a,{href:"https://click.palletsprojects.com/en/8.1.x/#documentation",children:"Click"}),` to define different CLI commands that can be used to
execute specific pipeline stages. Check the `,e.jsx(i.a,{href:"/cli-reference",children:"CLI reference"})," for more details on commands and arguments avaiable."]}),`
`,e.jsxs(i.h3,{id:"api-loader-source",children:["API Loader (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/loader.py",children:"Source"}),")",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#api-loader-source",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"It uses the input API pipeline manifest and API OpenAPI spec to generate/load an Airbyte declarative stream manifest that be later used to kickstart the input data streams"}),`
`,e.jsx(i.p,{children:"Input Parameters:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"API Pipeline Manifest"}),": A YAML file that defines the configuration settings and API endpoints for extraction. The ",e.jsx(i.a,{href:"/manifest-definition",children:"Defining the API Pipeline Manifest"}),`
reference provides details on how to create a new manifest for your target API.`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"OpenAPI Spec"}),": YAML file containing the OpenAPI specification for the API source."]}),`
`]}),`
`,e.jsx(i.p,{children:"Output:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"api_name"}),": API Pipeline id"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"api_parameters"}),": input parameter values to be injected into the Airbyte API connector."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"source_manifest"}),": generated source manifest (dict serialized)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"endpoint_text_fields"}),": text fields per API endpoint"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"chunking_params"}),": chunking params that will be used during the data chunking stage."]}),`
`]}),`
`,e.jsxs(i.h3,{id:"input-module-source",children:["Input module (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/input.py",children:"Source"}),")",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#input-module-source",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["It uses Pathway and PyAirbyte to implement the ",e.jsx(i.code,{children:"AirbyteAPIConnector"})," (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/io/airbyte/api_connector.py",children:"Source"}),`).
The input module then uses this custom connector with `,e.jsx(i.code,{children:"api_parameters"})," for creating a data stream table for each API endpoint in ",e.jsx(i.code,{children:"source_manifest"}),"."]}),`
`,e.jsxs(i.h3,{id:"rag-pipeline-source",children:["RAG Pipeline (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/pipeline.py",children:"Source"}),")",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#rag-pipeline-source",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"It receives a list of input data streams and execute the following processing steps:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Preprocessing"})," (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/preprocessing.py",children:"Source"}),`): transforms the
raw data streams into a `,e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/schema/pipeline.py#L6",children:"unified data schema"}),` using
the specified `,e.jsx(i.code,{children:"endpoint_text_fields"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Normalization"}),": in charge of joining pre-processed data together into a single normalized stream table."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Data partitioning and chunking"})," (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/chunking.py",children:"Source"}),`): receives
the normalized data stream and `,e.jsx(i.code,{children:"chunking params"}),` to apply data partition and chunking to each record in the stream using the
`,e.jsx(i.code,{children:"CustomParseUnstructured"})," (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/processor/parser.py",children:"Source"}),`) UDF (Pathwar User-defined function).
This function uses the `,e.jsx(i.code,{children:"unstructured"})," open-source library to semantically parse, partition and chunk incoming data records."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Feature embeddings"})," (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/embeddings.py",children:"Source"}),`): the
`,e.jsx(i.code,{children:"CustomLiteLLMEmbedder"})," (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/processor/embedder.py",children:"Source"}),`) integrates
`,e.jsx(i.code,{children:"litellm"})," and ",e.jsx(i.code,{children:"ollama"}),` libraries to connect to the selected LLM provider and use the hosted LLM embeddings model to generate vector embeddings for every
record coming from the chunked data stream.`]}),`
`]}),`
`,e.jsx(i.aside,{"data-callout":"info",children:e.jsx(i.p,{children:`NOTICE:
If you're planning to execute the pipeline on consumer hardware, we recommend using an Ollama as a more-lighweight LLM provider for vector embeddings generation.`})}),`
`,e.jsxs(i.h3,{id:"output-module-source",children:["Output module (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/output.py",children:"Source"}),")",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#output-module-source",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["It uses the ",e.jsx(i.code,{children:"qdrant_client"})," library to implement the ",e.jsx(i.code,{children:"QdrantDBVectorStore"})," (",e.jsx(i.a,{href:"https://github.com/raid-guild/gaianet-rag-api-pipeline/blob/main/gaianet_rag_api_pipeline/io/qdrant.py",children:"Source"}),`).
It is then wired to a `,e.jsx(i.a,{href:"https://pathway.com/developers/user-guide/connect/connectors/python-output-connectors",children:"Pathway output connector"}),` to read records from the
embeddings stream, store vector embeddings and attached metadata into a collection in Qdrant DB, and finally generate and download a knowledge base snapshot.`]})]})}function d(n={}){const{wrapper:i}={...t(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(a,{...n})}):a(n)}export{d as default,s as frontmatter};
