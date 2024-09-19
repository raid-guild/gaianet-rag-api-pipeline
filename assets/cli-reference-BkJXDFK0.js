import{u as a,j as e}from"./index-CzwWI5ho.js";const r={title:"RAG API Pipeline CLI Reference Documentation",description:"undefined"};function s(n){const i={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"rag-api-pipeline-cli-reference-documentation",children:["RAG API Pipeline CLI Reference Documentation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#rag-api-pipeline-cli-reference-documentation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(i.h2,{id:"overview",children:["Overview",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#overview",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:`The CLI tool provides functionality for running a RAG (Retrieval-Augmented Generation) API pipeline. It offers various commands to execute different stages of
the pipeline, from data extraction to embedding generation.`}),`
`,e.jsxs(i.h2,{id:"installation",children:["Installation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#installation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"This project uses Poetry for dependency management. To install the project and all its dependencies:"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["Ensure you have Poetry installed. If not, install it by following the instructions ",e.jsx(i.a,{href:"https://python-poetry.org/docs/#installation",children:"here"})]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Clone the repository:"}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsxs(i.code,{children:[e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"git"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" clone"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" https://github.com/raid-guild/gaianet-rag-api-pipeline"})]}),`
`,e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"cd"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" gaianet-rag-api-pipeline"})]})]})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Install dependencies using Poetry:"}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" install"})]})})}),`
`,e.jsxs(i.p,{children:["This will create a virtual environment and install all necessary dependencies specified in the ",e.jsx(i.code,{children:"pyproject.toml"})," file."]}),`
`]}),`
`]}),`
`,e.jsxs(i.h2,{id:"usage",children:["Usage",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#usage",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:["To run any command, use the ",e.jsx(i.code,{children:"poetry run"})," prefix:"]}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" [OPTIONS] COMMAND [ARGS]..."})]})})}),`
`,e.jsxs(i.h2,{id:"global-options",children:["Global Options",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#global-options",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"--debug"}),": Enable logging at debug level. Usefult for developing purposes"]}),`
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
`,e.jsx(i.p,{children:"eExecutes the RAG data pipeline using an already normalized JSONL dataset."}),`
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
`,e.jsxs(i.h3,{id:"3-from-chunked",children:["3. from-chunked",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-from-chunked",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
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
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Run the complete pipeline using Ollama as LLM provider:"}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run-all"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --openapi-spec-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/openapi.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"})]})})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Run the pipeline and stop executing after data normalization:"}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run-all"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --openapi-spec-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/openapi.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --normalized-only"})]})})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Run the pipeline from normalized data:"}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-normalized"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --normalized-data-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" path/to/normalized_data.jsonl"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"})]})})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"Run the pipeline from chunked data:"}),`
`,e.jsx(i.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:e.jsx(i.code,{children:e.jsxs(i.span,{className:"line",children:[e.jsx(i.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"poetry"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" rag-api-pipeline"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" from-chunked"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" config/api_pipeline.yaml"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --chunked-data-file"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" path/to/chunked_data.jsonl"}),e.jsx(i.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --llm-provider"}),e.jsx(i.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ollama"})]})})}),`
`]}),`
`]}),`
`,e.jsxs(i.h2,{id:"notes",children:["Notes",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#notes",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Always use ",e.jsx(i.code,{children:"poetry run"})," to execute the CLI commands within the Poetry environment."]}),`
`,e.jsxs(i.li,{children:["The CLI uses the ",e.jsx(i.code,{children:"click"})," library for command-line interface creation."]}),`
`,e.jsx(i.li,{children:"Make sure to properly configure your API manifest file and OpenAPI spec file before running the pipeline."}),`
`,e.jsxs(i.li,{children:["Double check the CLI environment variables in the ",e.jsx(i.code,{children:"config/.env"})," file. Check The ",e.jsx(i.a,{href:"/getting-started#environment-variables",children:"Environment Variables"})," section for details."]}),`
`]})]})}function d(n={}){const{wrapper:i}={...a(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(s,{...n})}):s(n)}export{d as default,r as frontmatter};
