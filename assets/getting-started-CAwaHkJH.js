import{u as a,j as e}from"./index-DFtmkvAK.js";const d={title:"GaiaNet RAG API Pipeline",description:"undefined"};function s(n){const i={a:"a",aside:"aside",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"gaianet-rag-api-pipeline",children:["GaiaNet RAG API Pipeline",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#gaianet-rag-api-pipeline",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(i.p,{children:[e.jsx(i.code,{children:"rag-api-pipeline"}),` is a Python-based data pipeline tool that allows you to easily generate a vector knowledge base from any REST API data source. The
resulting database snapshot can be then plugged-in into a Gaia node's LLM model with a prompt and provide contextual responses to user queries using RAG
(Retrieval Augmented Generation).`]}),`
`,e.jsx(i.p,{children:`The following sections help you to quickly setup and execute the pipeline on your REST API. If you're looking more in-depth information about how to use
thes tool, tech stack and/or how it works under the hood, check the content menu on the left.`}),`
`,e.jsxs(i.h2,{id:"system-requirements",children:["System Requirements",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#system-requirements",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Poetry (",e.jsx(i.a,{href:"https://python-poetry.org/docs/",children:"Docs"}),")"]}),`
`,e.jsx(i.li,{children:"Python 3.11.x"}),`
`,e.jsx(i.li,{children:"(Optional): a Python virtual environment manager or your preference (e.g. conda, venv)"}),`
`,e.jsx(i.li,{children:"Docker and Docker compose"}),`
`,e.jsxs(i.li,{children:["Qdrant vector database (",e.jsx(i.a,{href:"https://qdrant.tech/documentation/",children:"Docs"}),")"]}),`
`,e.jsx(i.li,{children:"LLM model provider (either a Gaianet node or Ollama)"}),`
`]}),`
`,e.jsxs(i.h2,{id:"setup-instructions",children:["Setup Instructions",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup-instructions",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.div,{"data-vocs-steps":"true",children:[e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"clone-this-repository",children:["Clone this repository",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#clone-this-repository",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsx(i.p,{children:"Git clone or download this repository to your local."})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"activate-your-virtual-environment",children:["Activate your virtual environment",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#activate-your-virtual-environment",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsx(i.p,{children:"If using a custom virtual environment, you should activate your virtual environment, otherwise poetry will handle the environment for you"})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"install-project-dependencies",children:["Install project dependencies",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#install-project-dependencies",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsx(i.p,{children:"Navigate to the directory where this repository was cloned/download and execute the following on a terminal:"}),e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" install"})]})})})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"set-environment-variables",children:["Set environment variables",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#set-environment-variables",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsxs(i.p,{children:["Copy ",e.jsx(i.code,{children:"config/.env/sample"})," into ",e.jsx(i.code,{children:"config/.env"})," file and set environment variables accordingly. Check the ",e.jsx(i.a,{href:"#environment-variables",children:"environment variables"}),` section below
for details.`]})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"define-your-api-pipeline-manifest",children:["Define your API Pipeline manifest",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#define-your-api-pipeline-manifest",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsxs(i.p,{children:[`Define the pipeline manifest for your REST API you're looking to extract data from. Check how to define an API pipeline manifest in
`,e.jsx(i.a,{href:"/manifest-definition",children:"Defining an API Pipeline Manifest"}),` for details, or take a look at the in-depth review of the sample manifests available in
`,e.jsx(i.a,{href:"/apis",children:"API Examples"}),"."]})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"set-the-rest-api-key",children:["Set the REST API Key",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#set-the-rest-api-key",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsxs(i.p,{children:["Set the REST API key in a ",e.jsx(i.code,{children:"config/secrets/api_key"})," file, or specify it using the ",e.jsx(i.code,{children:"--api-key"})," as argument to the CLI"]})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"setup-a-qdrant-db-instance",children:["Setup a Qdrant DB instance",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setup-a-qdrant-db-instance",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsxs(i.p,{children:["Get the base URL of your Qdrant Vector DB or deploy a local ",e.jsx(i.code,{children:"Qdrant"})," (",e.jsx(i.a,{href:"https://qdrant.tech/documentation/",children:"Docs"}),") vector database instance using docker:"]}),e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"docker"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -p"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" 6333:6333"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -p"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" 6334:6334"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -v"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ./qdrant_dev:/qdrant/storage:z"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" qdrant/qdrant:v1.10.1"})]})})}),e.jsx(i.aside,{"data-callout":"warning",children:e.jsxs(i.p,{children:["IMPORTANT: make sure you use ",e.jsx(i.code,{children:"qdrant:v1.10.1"})," for compatibility with Gaianet node"]})})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"select-and-setup-an-llm-provider",children:["Select and Setup an LLM provider",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#select-and-setup-an-llm-provider",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsxs(i.p,{children:["Get your Gaianet node running (",e.jsx(i.a,{href:"https://docs.gaianet.ai/node-guide/quick-start",children:"Docs"}),") or install Ollama (",e.jsx(i.a,{href:"https://ollama.com/",children:"Docs"}),`) provider locally.
The latter is recommended if you're looking to run the pipeline on consumer hardware.`]})]}),e.jsxs(i.div,{"data-depth":"3",children:[e.jsxs(i.h3,{id:"load-an-llm-embeddings-model",children:["Load an LLM embeddings model",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#load-an-llm-embeddings-model",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),e.jsx(i.p,{children:"Load the LLM embeddings model of your preference into the LLM provider you chose in the previous step:"}),e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["You can find info on how to customize a Gaianet node ",e.jsx(i.a,{href:"https://docs.gaianet.ai/node-guide/customize",children:"here"})]}),`
`,e.jsxs(i.li,{children:["If you chose Ollama, follow these instructions to import the LLM embeddings model:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Make sure the Ollama service is up and running"}),`
`,e.jsxs(i.li,{children:["Go to the folder where the embeddings model is located. For this example, the llm model file is ",e.jsx(i.code,{children:"nomic-embed-text-v1.5.f16.gguf"})," (",e.jsx(i.a,{href:"https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/tree/main?show_file_info=nomic-embed-text-v1.5.f16.gguf",children:"Source"}),")"]}),`
`,e.jsxs(i.li,{children:["Create a file with name ",e.jsx(i.code,{children:"Modelfile"})," and paste the following (replace ",e.jsx(i.code,{children:"<path/to/model>"})," with your local directory):"]}),`
`]}),`
`]}),`
`]}),e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Modelfile","data-lang":"docker",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"FROM"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" <path/to/model>/nomic-embed-text-v1.5.f16.gguf"})]})})}),e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Import the model by running the following command on a terminal:"}),`
`]}),e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" create"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" Nomic-embed-text-v1.5"})]})})}),e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Make sure the model setting by running the command:"}),`
`]}),e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" show"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" Nomic-embed-text-v1.5"})]})})})]})]}),`
`,e.jsxs(i.h2,{id:"pipeline-cli",children:["Pipeline CLI",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pipeline-cli",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Now you're ready to use the ",e.jsx(i.code,{children:"rag-api-pipeline"}),` CLI commands to execute different tasks of the RAG pipeline, from extracting data from an API source to generating vector embeddings
and a database snapshot. If you need more details about the parameters available on each command you can execute:`]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"comman"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"d"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --help"})]})})}),`
`,e.jsxs(i.h3,{id:"cli-available-commands",children:["CLI available commands",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cli-available-commands",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Below you can find the default instructions available and an in-depth review of both the functionality and available arguments that each command offers:"}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsxs(i.code,{children:[e.jsx(i.span,{className:"line",children:e.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# run the entire pipeline"})}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run-all"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" API_MANIFEST_FILE"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" ----openapi-spec-file"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"openapi-spec-yaml-fil"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [--full-refresh] [--llm-provider openapi"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"ollama]"})]}),`
`,e.jsx(i.span,{className:"line",children:e.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# or run using an already normalized dataset"})}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-normalized"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" API_MANIFEST_FILE"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --normalized-data-file"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"jsonl-fil"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [--llm-provider "}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"openapi"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama]"})]}),`
`,e.jsx(i.span,{className:"line",children:e.jsx(i.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# or run using an already chunked dataset"})}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-chunked"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" API_MANIFEST_FILE"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --chunked-data-file"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"jsonl-fil"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [--llm-provider "}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"openapi"}),e.jsx(i.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"|"}),e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama]"})]})]})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"run-all"}),`: executes the entire RAG data pipeline including API endpoint data streams, data normalization, data chunking, vector embeddings and
database snapshot generation. You can specify the following arguments to the command:`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_MANIFEST_FILE"}),": API pipeline manifest file (mandatory)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--llm-provider [ollama|openai]"}),": backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--api-key"}),": API Auth key. If not specified, it will try to get it from ",e.jsx(i.code,{children:"config/secrets/api_key"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--openapi-spec-file"}),": API OpenAPI YAML spec file. default to ",e.jsx(i.code,{children:"config/openapi.yaml"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--source-manifest-file"}),": Airbyte API Connector YAML manifest. If specified, it will omit the API Connector manifest generation step."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--full-refresh"}),": clean up cache and extract API data from scratch."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--normalized-only"}),": run pipeline until the data normalization stage."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--chunked-only"}),": run pipeline until the data chunking stage."]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"from-normalized"}),": executes the RAG data pipeline using an already normalized JSONL dataset. You can specify the following arguments to the command:"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_MANIFEST_FILE"}),": API pipeline manifest file (mandatory)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--llm-provider [ollama|openai]"}),": backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--normalized-data-file"}),": path to the normalized dataset in JSONL format (mandatory). Check the ",e.jsx(i.a,{href:"/architecture",children:"Architecture"}),` section for details on the
required data schema.`]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"from chunked"}),": executes the RAG data pipeline using an already chunked dataset in JSONL format. You can specify the following arguments to the command:"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_MANIFEST_FILE"}),": API pipeline manifest file (mandatory)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--llm-provider [ollama|openai]"}),": backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--chunked-data-file"}),": path to the chunked dataset in JSONL format (mandatory). Check the ",e.jsx(i.a,{href:"/architecture",children:"Architecture"}),` section for details on the
required data schema.`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(i.h2,{id:"cli-output",children:["CLI Output",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#cli-output",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["Cached API stream data and results produced from running any of the CLI commands are stored in ",e.jsx(i.code,{children:"<OUTPUT_FOLDER>/<api_name>"}),`. The following files and folders
are created by the tool within this `,e.jsx(i.code,{children:"baseDir"})," folder:"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/cache/{api_name}/*"}),": extracted API data is cached into a local DuckDB. Database files are stored in this directory. If the ",e.jsx(i.code,{children:"--full-refresh"}),` argument
is specified to the `,e.jsx(i.code,{children:"run-all"})," command, the cache will be cleared and API data will be extracted from scratch."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_stream_{x}_preprocessed.jsonl"}),": data streams from each API endpoint is preprocessed and stored in JSONL format"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_normalized.jsonl"}),": preprocessed data streams from each API endpoint are joined together and stored in JSONL format"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_chunked.jsonl"}),": normalized data that goes through the data chunking stage is then stored in JSONL format"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_collection-xxxxxxxxxxxxxxxx-yyyy-mm-dd-hh-mm-ss.snapshot"}),": vector embeddings snapshot file that was exported from Qdrant DB"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_collection-xxxxxxxxxxxxxxxx-yyyy-mm-dd-hh-mm-ss.snapshot.tar.gz"}),": compressed knowledge base that contains the vector embeddings snapshot"]}),`
`]}),`
`,e.jsxs(i.h2,{id:"environment-variables",children:["Environment variables",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#environment-variables",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["The following environment variables can be adjusted in ",e.jsx(i.code,{children:"config/.env"})," based on user needs:"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Pipeline config parameters:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_DATA_ENCODING"}),' (="utf-8"): default data encoding used by the REST API']}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"OUTPUT_FOLDER"}),' (="./output"): output folder where cached data streams, intermediary stage results and generated knowledge base snapshot are stored']}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["LLM provider settings:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"LLM_API_BASE_URL"}),' (="',e.jsx(i.a,{href:"http://localhost:8080/v1",children:"http://localhost:8080/v1"}),'"): LLM provider base URL (default to a local openai-based provider such as gaia node)']}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"LLM_API_KEY"}),' (="empty-api-key"): API key to authenticate requests to the LLM provider']}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"LLM_EMBEDDINGS_MODEL"}),' (="Nomic-embed-text-v1.5"): name of the embeddings model to be consumed through the LLM provider']}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"LLM_EMBEDDINGS_VECTOR_SIZE"})," (=768): embeddings vector size"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"LLM_PROVIDER"}),' (="openai"): LLM provider backend to use. It can be either ',e.jsx(i.code,{children:"openai"})," or ",e.jsx(i.code,{children:"ollama"})," (gaianet offers an openai compatible API)"]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["Qdrant DB settings:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"QDRANTDB_URL"}),' (="',e.jsx(i.a,{href:"http://localhost:6333",children:"http://localhost:6333"}),'"): Qdrant DB base URL']}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"QDRANTDB_TIMEOUT"})," (=60): timeout for requests made to the Qdrant DB"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"QDRANTDB_DISTANCE_FN"}),` (="COSINE"): score function to use during vector similarity search. Avaiable functions: ['COSINE', 'EUCLID', 'DOT', 'MANHATTAN']`]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["Pathway-related variables:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"AUTOCOMMIT_DURATION_MS"}),` (=1000): the maximum time between two commits. Every autocommit_duration_ms milliseconds, the updates received by the connector are
committed automatically and pushed into Pathway's dataflow. More info can be found `,e.jsx(i.a,{href:"https://pathway.com/developers/user-guide/connect/connectors/custom-python-connectors#connector-method-reference",children:"here"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"FixedDelayRetryStrategy"})," (",e.jsx(i.a,{href:"https://pathway.com/developers/api-docs/udfs#pathway.udfs.FixedDelayRetryStrategy",children:"docs"}),") config parameters:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"PATHWAY_RETRY_MAX_ATTEMPTS"})," (=10): max retries to be performed if a UDF async execution fails"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"PATHWAY_RETRY_DELAY_MS"})," (=1000): delay in milliseconds to wait for the next execution attempt"]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.em,{children:"UDF async execution"}),`: set the maximum No of concurrent operations per batch during udf async execution. Zero means no specific limits. Be careful when settings
this parameters for the embeddings stage as it could break the LLM provider with too many concurrent requests`,`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"CHUNKING_BATCH_CAPACITY"})," (=0): max No. of concurrent operation during data chunking operations"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"EMBEDDINGS_BATCH_CAPACITY"})," (=15): max No. of concurrent operation during vector embeddings operations"]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(i.h2,{id:"using-docker-compose-for-local-development-or-in-production",children:["Using Docker compose for Local development or in Production",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-docker-compose-for-local-development-or-in-production",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"TBD"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Start with building your containers: ",e.jsx(i.code,{children:"docker compose -f local.yml build"}),"."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Build production containers with ",e.jsx(i.code,{children:"docker compose -f prod.yml build"})]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"To run your application invoke:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"docker compose -f prod.yml rm -svf"})}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"docker compose -f prod.yml up"})}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(i.h2,{id:"troubleshooting",children:["Troubleshooting",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#troubleshooting",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"workaround-in-case-of-missing-one-of-the-following-dependencies",children:["Workaround in case of missing one of the following dependencies:",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#workaround-in-case-of-missing-one-of-the-following-dependencies",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If trying to install ",e.jsx(i.code,{children:"pillow-heif"})," missing module:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Add the following flags ",e.jsx(i.code,{children:'export CFLAGS="-Wno-nullability-completeness"'})]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["Libraries required for having libmagic working:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["MacOS:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"brew install libmagic"})}),`
`]}),`
`]}),`
`,e.jsx(i.li,{children:e.jsx(i.code,{children:"pip install python-magic-bin"})}),`
`]}),`
`]}),`
`]})]})}function l(n={}){const{wrapper:i}={...a(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(s,{...n})}):s(n)}export{l as default,d as frontmatter};
