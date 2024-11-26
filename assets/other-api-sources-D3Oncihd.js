import{u as t,j as e}from"./index-Bm4cBicl.js";const d={title:"Working with Other API Sources 🔌",description:"undefined"};function s(n){const i={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",ul:"ul",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"working-with-other-api-sources-",children:["Working with Other API Sources 🔌",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#working-with-other-api-sources-",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(i.p,{children:"Want to supercharge your RAG pipeline with different APIs? We've got you covered! Here's a simple guide to get started."}),`
`,e.jsxs(i.h2,{id:"where-to-find-great-apis",children:["Where to Find Great APIs",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#where-to-find-great-apis",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"public-api-collections",children:["Public API Collections",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#public-api-collections",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.a,{href:"https://github.com/public-apis/public-apis",children:"Public APIs GitHub Repository"})," - A goldmine of free APIs!"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.a,{href:"https://rapidapi.com/hub",children:"RapidAPI Hub"})," - Browse through thousands of free and paid APIs"]}),`
`]}),`
`,e.jsxs(i.h2,{id:"integration-guide-its-easy",children:["Integration Guide (It's Easy!)",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#integration-guide-its-easy",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"1-gather-documentation",children:["1. Gather Documentation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-gather-documentation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Collect endpoint details"}),`
`,e.jsx(i.li,{children:"Note down request/response formats"}),`
`,e.jsx(i.li,{children:"Look for existing OpenAPI/Swagger specifications"}),`
`]}),`
`,e.jsxs(i.h3,{id:"2-schema-setup",children:["2. Schema Setup",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-schema-setup",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Do checkout this guide on ",e.jsx(i.a,{href:"https://docs.bump.sh/guides/openapi/specification/v3.1/introduction/what-is-openapi/",children:"OpenAPI"})]}),`
`,e.jsx(i.li,{children:"Look for an official OpenAPI spec file from the API provider."}),`
`,e.jsx(i.li,{children:"Use some help from LLMs to create OpenAPI schemas"}),`
`,e.jsxs(i.li,{children:["Validate your schema:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["New schemas: ",e.jsx(i.a,{href:"https://editor.swagger.io/",children:"Swagger Editor"})]}),`
`,e.jsxs(i.li,{children:["Existing specs: ",e.jsx(i.a,{href:"https://validator.swagger.io/",children:"Swagger Validator"})]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(i.h3,{id:"3-define-the-rag-api-pipeline-manifest",children:["3. Define the RAG API Pipeline manifest",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-define-the-rag-api-pipeline-manifest",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Define the target endpoints and required request parameters"}),`
`,e.jsx(i.li,{children:"Get an API Key if needed."}),`
`,e.jsxs(i.li,{children:["Check out our ",e.jsx(i.a,{href:"/manifest-definition",children:"guide"})," or ",e.jsx(i.a,{href:"/apis",children:"API examples"})," for inspiration."]}),`
`]}),`
`,e.jsxs(i.h3,{id:"4-test-and-deploy",children:["4. Test and Deploy",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-test-and-deploy",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Setup the pipeline initial configuration by running the ",e.jsx(i.code,{children:"rag-api-pipeline setup"})," command."]}),`
`,e.jsxs(i.li,{children:["Test each endpoint thoroughly:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Run ",e.jsx(i.code,{children:"rag-api-pipeline run all <API_MANIFEST_FILE> <OPENAPI_SPEC_FILE>"})," and check for any errors."]}),`
`,e.jsx(i.li,{children:"Comment other endpoints in the API manifest."}),`
`,e.jsxs(i.li,{children:["Use the ",e.jsx(i.code,{children:"--normalized-only"})," CLI option and check results in the ",e.jsx(i.code,{children:"output"})," folder."]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["Adjust data chunking parameter settings:",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Use the ",e.jsx(i.code,{children:"--chunked-only"})," CLI option and analyze results (e.g. using a Jupyter notebook)"]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["If you want to include recent endpoint data, use the ",e.jsx(i.code,{children:"--full-refresh"})," CLI option to cleanup the cache."]}),`
`,e.jsx(i.li,{children:"Use AI assistance to fix validation issues."}),`
`,e.jsx(i.li,{children:"Connect everything to your RAG pipeline."}),`
`]}),`
`,e.jsx(i.p,{children:"Still need help? Feel free reach out or open an issue on this repository!"})]})}function a(n={}){const{wrapper:i}={...t(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(s,{...n})}):s(n)}export{a as default,d as frontmatter};
