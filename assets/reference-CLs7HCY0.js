import{u as a,j as e}from"./index-CA1ZDCS5.js";const l={title:"RAG API Pipeline CLI Reference Documentation",description:"undefined"};function s(n){const i={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"rag-api-pipeline-cli-reference-documentation",children:["RAG API Pipeline CLI Reference Documentation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#rag-api-pipeline-cli-reference-documentation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(i.h2,{id:"overview",children:["Overview",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"The CLI tool provides functionality for running a RAG (Retrieval-Augmented Generation) API pipeline. It offers various commands to execute different stages of the pipeline, from data extraction to embedding generation."}),`
`,e.jsxs(i.h2,{id:"installation",children:["Installation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"This project uses Poetry for dependency management. To install the project and all its dependencies:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Ensure you have Poetry installed. If not, install it by following the instructions ",e.jsx(i.a,{href:"https://python-poetry.org/docs/#installation",children:"here"})]}),`
`,e.jsx(i.li,{children:"Clone the repository:"}),`
`]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsxs(i.code,{children:[e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"git"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" clone"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" https://github.com/raid-guild/gaianet-rag-api-pipeline"})]}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"cd"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" gaianet-rag-api-pipeline"})]})]})}),`
`,e.jsxs(i.ol,{start:"3",children:[`
`,e.jsx(i.li,{children:"Install dependencies using Poetry:"}),`
`]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" install"})]})})}),`
`,e.jsxs(i.p,{children:["This will create a virtual environment and install all necessary dependencies specified in the ",e.jsx(i.code,{children:"pyproject.toml"})," file."]}),`
`,e.jsxs(i.h2,{id:"usage",children:["Usage",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["To run any command, use the ",e.jsx(i.code,{children:"poetry run"})," prefix:"]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [OPTIONS] COMMAND [ARGS]..."})]})})}),`
`,e.jsxs(i.h2,{id:"global-options",children:["Global Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#global-options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--debug"}),": Enable logging at debug level. Useful for development purposes"]}),`
`]}),`
`,e.jsxs(i.h2,{id:"commands",children:["Commands",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#commands",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"run-all",children:["run-all",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#run-all",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Run the complete RAG API pipeline."}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run-all"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [OPTIONS] API_MANIFEST_FILE"})]})})}),`
`,e.jsxs(i.h4,{id:"arguments",children:["Arguments",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#arguments",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_MANIFEST_FILE"}),": Pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract."]}),`
`]}),`
`,e.jsxs(i.h4,{id:"options",children:["Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--llm-provider [ollama|openai]"}),": Embedding model provider (default: openai)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--api-key TEXT"}),": API Auth key"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--openapi-spec-file FILE"}),": OpenAPI YAML spec file (default: config/openapi.yaml)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--source-manifest-file FILE"}),": Source Connector YAML manifest"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--full-refresh"}),": Clean up cache and extract API data from scratch"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--normalized-only"}),": Run pipeline until the normalized data stage"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--chunked-only"}),": Run pipeline until the chunked data stage"]}),`
`]}),`
`,e.jsxs(i.h3,{id:"from-normalized",children:["from-normalized",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#from-normalized",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Executes the RAG data pipeline using an already normalized JSONL dataset."}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-normalized"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [OPTIONS] API_MANIFEST_FILE"})]})})}),`
`,e.jsxs(i.h4,{id:"arguments-1",children:["Arguments",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#arguments-1",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_MANIFEST_FILE"}),": Pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract."]}),`
`]}),`
`,e.jsxs(i.h4,{id:"options-1",children:["Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#options-1",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--llm-provider [ollama|openai]"}),": Embedding model provider (default: openai)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--normalized-data-file FILE"}),": Normalized data in JSONL format (required)"]}),`
`]}),`
`,e.jsxs(i.h3,{id:"from-chunked",children:["from-chunked",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#from-chunked",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"Executes the RAG data pipeline using an already chunked dataset in JSONL format."}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-chunked"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [OPTIONS] API_MANIFEST_FILE"})]})})}),`
`,e.jsxs(i.h4,{id:"arguments-2",children:["Arguments",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#arguments-2",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_MANIFEST_FILE"}),": Pipeline YAML manifest that defines the Pipeline config settings and API endpoints to extract."]}),`
`]}),`
`,e.jsxs(i.h4,{id:"options-2",children:["Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#options-2",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--llm-provider [ollama|openai]"}),": Embedding model provider (default: openai)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--chunked-data-file FILE"}),": Chunked data in JSONL format (required)"]}),`
`]}),`
`,e.jsxs(i.h2,{id:"examples",children:["Examples",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#examples",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsx(i.li,{children:"Run the complete pipeline using Ollama as LLM provider:"}),`
`]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run-all"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --openapi-spec-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/openapi.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"})]})})}),`
`,e.jsxs(i.ol,{start:"2",children:[`
`,e.jsx(i.li,{children:"Run the pipeline and stop executing after data normalization:"}),`
`]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run-all"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --openapi-spec-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/openapi.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --normalized-only"})]})})}),`
`,e.jsxs(i.ol,{start:"3",children:[`
`,e.jsx(i.li,{children:"Run the pipeline from normalized data:"}),`
`]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-normalized"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --normalized-data-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" path/to/normalized_data.jsonl"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"})]})})}),`
`,e.jsxs(i.ol,{start:"4",children:[`
`,e.jsx(i.li,{children:"Run the pipeline from chunked data:"}),`
`]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-chunked"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --chunked-data-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" path/to/chunked_data.jsonl"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"})]})})}),`
`,e.jsxs(i.h2,{id:"notes",children:["Notes",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#notes",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Always use ",e.jsx(i.code,{children:"poetry run"})," to execute the CLI commands within the Poetry environment."]}),`
`,e.jsxs(i.li,{children:["The CLI uses the ",e.jsx(i.code,{children:"click"})," library for command-line interface creation."]}),`
`,e.jsx(i.li,{children:"Make sure to properly configure your API manifest file and OpenAPI spec file before running the pipeline."}),`
`,e.jsxs(i.li,{children:["Double-check the CLI environment variables in the ",e.jsx(i.code,{children:"config/.env"})," file. Check the ",e.jsx(i.a,{href:"/getting-started#environment-variables",children:"Environment Variables"})," section for details."]}),`
`]}),`
`,e.jsxs(i.h2,{id:"moved-from-getting-started",children:["Moved from getting started",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#moved-from-getting-started",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"TODO:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"run-all"}),`: executes the entire RAG data pipeline including API endpoint data streams, data normalization, data chunking, vector embeddings and
database snapshot generation. You can specify the following arguments to the command:`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"API_MANIFEST_FILE"}),": API pipeline manifest file (mandatory)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"OPENAPI_SPEC_FILE"}),": API OpenAPI YAML spec file (mandatory)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--llm-provider [ollama|openai]"}),": backend embeddings model provider. default: openai-like backend (e.g. gaia rag-api-server)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--api-key"}),": API Auth key. If not specified, it will try to get it from ",e.jsx(i.code,{children:"config/secrets/api_key"})]}),`
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
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"from_chunked"}),": executes the RAG data pipeline using an already chunked dataset in JSONL format. You can specify the following arguments to the command:"]}),`
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
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_source_generated.yaml"}),": generated Airbyte Stream connector manifest."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/cache/{api_name}/*"}),": extracted API data is cached into a local DuckDB. Database files are stored in this directory. If the ",e.jsx(i.code,{children:"--full-refresh"}),` argument
is specified for the `,e.jsx(i.code,{children:"run-all"})," command, the cache will be cleared and API data will be extracted from scratch."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_stream_{x}_preprocessed.jsonl"}),": data streams from each API endpoint are preprocessed and stored in JSONL format"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_normalized.jsonl"}),": preprocessed data streams from each API endpoint are joined together and stored in JSONL format"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_chunked.jsonl"}),": normalized data that goes through the data chunking stage is then stored in JSONL format"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_collection-xxxxxxxxxxxxxxxx-yyyy-mm-dd-hh-mm-ss.snapshot"}),": vector embeddings snapshot file that was exported from Qdrant DB"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"{baseDir}/{api_name}_collection-xxxxxxxxxxxxxxxx-yyyy-mm-dd-hh-mm-ss.snapshot.tar.gz"}),": compressed knowledge base that contains the vector embeddings snapshot"]}),`
`]})]})}function d(n={}){const{wrapper:i}={...a(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(s,{...n})}):s(n)}export{d as default,l as frontmatter};
