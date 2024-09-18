import{u as r,j as e}from"./index-Co7UtDcI.js";const a={title:"GaiaNet RAG API Pipeline",description:"undefined"};function s(i){const n={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"gaianet-rag-api-pipeline",children:["GaiaNet RAG API Pipeline",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#gaianet-rag-api-pipeline",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"rag-api-pipeline"}),` is a Python-based data pipeline tool that allows you to easily generate a vector knowledge base from any REST API data source. The
resulting database snapshot can be then plugged-in into a Gaia node's LLM model with a prompt and provide contextual responses to user queries using RAG
(Retrieval Augmented Generation).`]}),`
`,e.jsx(n.p,{children:`The following sections help you to quickly setup and execute the pipeline on your REST API. If you're looking more in-depth information about how to use
thes tool, tech stack and/or how it works under the hood, check the content menu on the left.`}),`
`,e.jsxs(n.h2,{id:"system-requirements",children:["System Requirements",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#system-requirements",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Poetry (",e.jsx(n.a,{href:"https://python-poetry.org/docs/",children:"Docs"}),")"]}),`
`,e.jsx(n.li,{children:"Python 3.11.x"}),`
`,e.jsx(n.li,{children:"(Optional): a Python virtual environment manager or your preference (e.g. conda, venv)"}),`
`,e.jsx(n.li,{children:"Docker and Docker compose"}),`
`,e.jsxs(n.li,{children:["Qdrant vector database (",e.jsx(n.a,{href:"https://qdrant.tech/documentation/",children:"Docs"}),")"]}),`
`,e.jsx(n.li,{children:"LLM model provider (either a Gaianet node or Ollama)"}),`
`]}),`
`,e.jsxs(n.h2,{id:"setup-instructions",children:["Setup Instructions",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup-instructions",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Activate your virtual environment (if using a custom virtual environment)"}),`
`,e.jsx(n.li,{children:"Install project dependencies:"}),`
`]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" install"})]})})}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Copy ",e.jsx(n.code,{children:"config/.env/sample"})," into ",e.jsx(n.code,{children:"config/.env"})," file and set environment variables accordingly. Check the ",e.jsx(n.a,{href:"#environment-variables",children:"environment variables"}),` section
for details.`]}),`
`,e.jsxs(n.li,{children:[`Define the pipeline manifest for your REST API you're looking to extract data from. Check how to define an API pipeline manifest in
`,e.jsx(n.a,{href:"/manifest-definition",children:"Defining an API Pipeline Manifest"}),` for details, or take a look at the in-depth review of the sample manifests available in
`,e.jsx(n.a,{href:"/examples",children:"API Examples"}),"."]}),`
`,e.jsxs(n.li,{children:["Set the REST API key in a ",e.jsx(n.code,{children:"config/secrets/api_key"})," file, or specify it using the ",e.jsx(n.code,{children:"--api-key"})," as argument to the CLI"]}),`
`,e.jsxs(n.li,{children:["Get the base URL of your Qdrant Vector DB or deploy a local ",e.jsx(n.code,{children:"Qdrant"})," (",e.jsx(n.a,{href:"https://qdrant.tech/documentation/",children:"Docs"}),") vector database instance using docker:"]}),`
`]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"# IMPORTANT: make sure you use qdrant:v1.10.1 for compatibility with Gaianet node"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"docker run -p 6333:6333 -p 6334:6334 -v ./qdrant_dev:/qdrant/storage:z qdrant/qdrant:v1.10.1"})})]})}),`
`,e.jsxs(n.ol,{start:"7",children:[`
`,e.jsxs(n.li,{children:["Get your Gaianet node running (",e.jsx(n.a,{href:"https://docs.gaianet.ai/node-guide/quick-start",children:"Docs"}),") or install Ollama (",e.jsx(n.a,{href:"https://ollama.com/",children:"Docs"}),`) provider locally.
The latter is recommended if you're looking to run the pipeline on consumer hardware.`]}),`
`,e.jsx(n.li,{children:"Load the LLM embeddings model of your preference into the LLM provider you chose in the previous step:"}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["You can find info on how to customize a Gaianet node ",e.jsx(n.a,{href:"https://docs.gaianet.ai/node-guide/customize",children:"here"})]}),`
`,e.jsxs(n.li,{children:["If you chose Ollama, follow these instructions to import the LLM embeddings model:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure the Ollama service is up and running"}),`
`,e.jsxs(n.li,{children:["Go to the folder where the embeddings model is located. For this example, the llm model file is ",e.jsx(n.code,{children:"nomic-embed-text-v1.5.f16.gguf"})," (",e.jsx(n.a,{href:"https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/tree/main?show_file_info=nomic-embed-text-v1.5.f16.gguf",children:"Source"}),")"]}),`
`,e.jsxs(n.li,{children:["Create a file with name ",e.jsx(n.code,{children:"Modelfile"})," and paste the following (replace ",e.jsx(n.code,{children:"<path/to/model>"})," with your local directory):"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsx(n.span,{className:"line",children:e.jsx(n.span,{children:"FROM <path/to/model>/nomic-embed-text-v1.5.f16.gguf"})})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Import the model by running the following command on a terminal:"}),`
`]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" create"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" Nomic-embed-text-v1.5"})]})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Make sure the model setting by running the command:"}),`
`]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" show"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" Nomic-embed-text-v1.5"})]})})}),`
`,e.jsxs(n.h2,{id:"pipeline-cli",children:["Pipeline CLI",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pipeline-cli",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Now you're ready to use the ",e.jsx(n.code,{children:"rag-api-pipeline"}),` CLI commands to execute different tasks of the RAG pipeline, from extracting data from an API source to generating vector embeddings
and a database snapshot. If you need more details about the parameters available on each command you can execute:`]}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"comman"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"d"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --help"})]})})}),`
`,e.jsxs(n.h3,{id:"cli-available-commands",children:["CLI available commands",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cli-available-commands",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Below you can find the default instructions available and an in-depth review of both the functionality and available arguments that each command offers:"}),`
`,e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# run the entire pipeline"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run-all"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" API_MANIFEST_FILE"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" ----openapi-spec-file"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"openapi-spec-yaml-fil"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [--full-refresh] [--llm-provider openapi"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"ollama]"})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# or run using an already normalized dataset"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-normalized"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" API_MANIFEST_FILE"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --normalized-data-file"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"jsonl-fil"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [--llm-provider "}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"openapi"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama]"})]}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# or run using an already chunked dataset"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-chunked"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" API_MANIFEST_FILE"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --chunked-data-file"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"jsonl-fil"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [--llm-provider "}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"openapi"}),e.jsx(n.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama]"})]})]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"run-all"}),`: executes the entire RAG data pipeline including API endpoint data streams, data normalization, data chunking, vector embeddings and
database snapshot generation. You can specify the following arguments to the command:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"API_MANIFEST_FILE"}),": API pipeline manifest file (mandatory)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--llm-provider [ollama|openai]"}),": backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--api-key"}),": API Auth key. If not specified, it will try to get it from ",e.jsx(n.code,{children:"config/secrets/api_key"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--openapi-spec-file"}),": API OpenAPI YAML spec file. default to ",e.jsx(n.code,{children:"config/openapi.yaml"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--source-manifest-file"}),": Airbyte API Connector YAML manifest. If specified, it will omit the API Connector manifest generation step."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--full-refresh"}),": clean up cache and extract API data from scratch."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--normalized-only"}),": run pipeline until the data normalization stage."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--chunked-only"}),": run pipeline until the data chunking stage."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"from-normalized"}),": executes the RAG data pipeline using an already normalized JSONL dataset. You can specify the following arguments to the command:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"API_MANIFEST_FILE"}),": API pipeline manifest file (mandatory)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--llm-provider [ollama|openai]"}),": backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--normalized-data-file"}),": path to the normalized dataset in JSONL format (mandatory). Check the ",e.jsx(n.a,{href:"/architecture",children:"Architecture"}),` section for details on the
required data schema.`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"from chunked"}),": executes the RAG data pipeline using an already chunked dataset in JSONL format. You can specify the following arguments to the command:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"API_MANIFEST_FILE"}),": API pipeline manifest file (mandatory)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--llm-provider [ollama|openai]"}),": backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--chunked-data-file"}),": path to the chunked dataset in JSONL format (mandatory). Check the ",e.jsx(n.a,{href:"/architecture",children:"Architecture"}),` section for details on the
required data schema.`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"environment-variables",children:["Environment variables",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#environment-variables",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The following environment variables can be adjusted in ",e.jsx(n.code,{children:"config/.env"})," based on user needs:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Pipeline config parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"API_DATA_ENCODING"}),' (="utf-8"): default data encoding used by the REST API']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"OUTPUT_FOLDER"}),' (="./output"): output folder where cached data streams, intermediary stage results and generated knowledge base snapshot are stored']}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["LLM provider settings:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_API_BASE_URL"}),' (="',e.jsx(n.a,{href:"http://localhost:8080/v1",children:"http://localhost:8080/v1"}),'"): LLM provider base URL (default to a local openai-based provider such as gaia node)']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_API_KEY"}),' (="empty-api-key"): API key to authenticate requests to the LLM provider']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_EMBEDDINGS_MODEL"}),' (="Nomic-embed-text-v1.5"): name of the embeddings model to be consumed through the LLM provider']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_EMBEDDINGS_VECTOR_SIZE"})," (=768): embeddings vector size"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_PROVIDER"}),' (="openai"): LLM provider backend to use. It can be either ',e.jsx(n.code,{children:"openai"})," or ",e.jsx(n.code,{children:"ollama"})," (gaianet offers an openai compatible API)"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Qdrant DB settings:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"QDRANTDB_URL"}),' (="',e.jsx(n.a,{href:"http://localhost:6333",children:"http://localhost:6333"}),'"): Qdrant DB base URL']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"QDRANTDB_TIMEOUT"})," (=60): timeout for requests made to the Qdrant DB"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"QDRANTDB_DISTANCE_FN"}),` (="COSINE"): score function to use during vector similarity search. Avaiable functions: ['COSINE', 'EUCLID', 'DOT', 'MANHATTAN']`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Pathway-related variables:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"AUTOCOMMIT_DURATION_MS"}),` (=1000): the maximum time between two commits. Every autocommit_duration_ms milliseconds, the updates received by the connector are
committed automatically and pushed into Pathway's dataflow. More info can be found `,e.jsx(n.a,{href:"https://pathway.com/developers/user-guide/connect/connectors/custom-python-connectors#connector-method-reference",children:"here"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"FixedDelayRetryStrategy"})," (",e.jsx(n.a,{href:"https://pathway.com/developers/api-docs/udfs#pathway.udfs.FixedDelayRetryStrategy",children:"docs"}),") config parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"PATHWAY_RETRY_MAX_ATTEMPTS"})," (=10): max retries to be performed if a UDF async execution fails"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"PATHWAY_RETRY_DELAY_MS"})," (=1000): delay in milliseconds to wait for the next execution attempt"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"UDF async execution"}),`: set the maximum No of concurrent operations per batch during udf async execution. Zero means no specific limits. Be careful when settings
this parameters for the embeddings stage as it could break the LLM provider with too many concurrent requests`,`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"CHUNKING_BATCH_CAPACITY"})," (=0): max No. of concurrent operation during data chunking operations"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"EMBEDDINGS_BATCH_CAPACITY"})," (=15): max No. of concurrent operation during vector embeddings operations"]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"using-docker-compose-for-local-development-or-in-production",children:["Using Docker compose for Local development or in Production",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-docker-compose-for-local-development-or-in-production",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"TBD"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Start with building your containers: ",e.jsx(n.code,{children:"docker compose -f local.yml build"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Build production containers with ",e.jsx(n.code,{children:"docker compose -f prod.yml build"})]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"To run your application invoke:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"docker compose -f prod.yml rm -svf"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"docker compose -f prod.yml up"})}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.h2,{id:"troubleshooting",children:["Troubleshooting",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#troubleshooting",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"workaround-in-case-of-missing-one-of-the-following-dependencies",children:["Workaround in case of missing one of the following dependencies:",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#workaround-in-case-of-missing-one-of-the-following-dependencies",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If trying to install ",e.jsx(n.code,{children:"pillow-heif"})," missinng module:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Add the following flags ",e.jsx(n.code,{children:'export CFLAGS="-Wno-nullability-completeness"'})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Libraries required for having libmagic working:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["MacOS:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"brew install libmagic"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"pip install python-magic-bin"})}),`
`]}),`
`]}),`
`]})]})}function d(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{d as default,a as frontmatter};
