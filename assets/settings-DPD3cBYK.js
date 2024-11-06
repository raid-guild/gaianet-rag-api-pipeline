import{u as l,j as e}from"./index-CA1ZDCS5.js";const r={title:"Pipeline Config Settings",description:"undefined"};function s(i){const n={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"pipeline-config-settings",children:["Pipeline Config Settings",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pipeline-config-settings",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"TODO"}),`
`,e.jsxs(n.h2,{id:"environment-variables",children:["Environment variables",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#environment-variables",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The following environment variables can be adjusted in ",e.jsx(n.code,{children:"config/.env"})," based on user needs:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Pipeline config parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"API_DATA_ENCODING"}),": data encoding used by the REST API",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"utf-8"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"OUTPUT_FOLDER"}),": output folder where cached data streams, intermediary stage results and generated knowledge base snapshot are stored",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"./output"})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["LLM provider settings:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_API_BASE_URL"}),": LLM provider base URL (defaults to a local openai-based provider such as gaia node)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"http://localhost:8080/v1"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_API_KEY"}),": API key to authenticate requests to the LLM provider",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"empty-api-key"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_EMBEDDINGS_MODEL"}),": name of the embeddings model to be consumed through the LLM provider",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"Nomic-embed-text-v1.5"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_EMBEDDINGS_VECTOR_SIZE"}),": embeddings vector size",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"768"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LLM_PROVIDER"}),": LLM provider backend to use. It can be either ",e.jsx(n.code,{children:"openai"})," or ",e.jsx(n.code,{children:"ollama"})," (gaianet offers an openai compatible API)",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"openai"})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Qdrant DB settings:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"QDRANTDB_URL"}),": Qdrant DB base URL",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"http://localhost:6333"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"QDRANTDB_TIMEOUT"}),": timeout for requests made to the Qdrant DB",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"60"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"QDRANTDB_DISTANCE_FN"}),": score function to use during vector similarity search. Available functions: ['COSINE', 'EUCLID', 'DOT', 'MANHATTAN']",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"COSINE"})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Pathway-related variables:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"AUTOCOMMIT_DURATION_MS"}),`: the maximum time between two commits. Every autocommit_duration_ms milliseconds, the updates received by the connector are
committed automatically and pushed into Pathway's dataflow. More information can be found `,e.jsx(n.a,{href:"https://pathway.com/developers/user-guide/connect/connectors/custom-python-connectors#connector-method-reference",children:"here"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"1000"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"FixedDelayRetryStrategy"})," (",e.jsx(n.a,{href:"https://pathway.com/developers/api-docs/udfs#pathway.udfs.FixedDelayRetryStrategy",children:"docs"}),") config parameters:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"PATHWAY_RETRY_MAX_ATTEMPTS"}),": max retries to be performed if a UDF async execution fails",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"10"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"PATHWAY_RETRY_DELAY_MS"}),": delay in milliseconds to wait for the next execution attempt",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"1000"})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.em,{children:"UDF async execution"}),`: set the maximum number of concurrent operations per batch during UDF async execution. Zero means no specific limits. Be careful when setting
these parameters for the embeddings stage as it could break the LLM provider with too many concurrent requests`,`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"CHUNKING_BATCH_CAPACITY"}),": max number of concurrent operations during data chunking operations",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"0"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"EMBEDDINGS_BATCH_CAPACITY"}),": max number of concurrent operations during vector embeddings operations",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Default value:  ",e.jsx(n.code,{children:"15"})]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.header,{children:e.jsxs(n.h1,{id:"pipeline-advanced-settings",children:["Pipeline Advanced Settings",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pipeline-advanced-settings",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.h2,{id:"using-another-llm-provider",children:["Using another LLM provider",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#using-another-llm-provider",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"TODO: ollama"})]})}function c(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{c as default,r as frontmatter};
