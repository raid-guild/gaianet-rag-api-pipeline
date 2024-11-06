import{u as n,j as s}from"./index-CA1ZDCS5.js";const r={title:"RAG API Pipeline x GaiaNet node",description:"undefined"};function a(i){const e={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",ul:"ul",...n(),...i.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.header,{children:s.jsxs(e.h1,{id:"rag-api-pipeline-x-gaianet-node",children:["RAG API Pipeline x GaiaNet node",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#rag-api-pipeline-x-gaianet-node",children:s.jsx(e.div,{"data-autolink-icon":!0})})]})}),`
`,s.jsx(e.p,{children:"This page contains some quick notes and instructions for efficient methods for generating vector embeddings, as well as quick instructions on how to import a knowledge base snapshot and deploy a GaiaNet node."}),`
`,s.jsxs(e.h2,{id:"generating-vector-embeddings",children:["Generating Vector embeddings",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#generating-vector-embeddings",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsx(e.p,{children:`If you're planning to use the pipeline on consumer hardware that cannot handle a GaiaNet node running in the background, you can opt-in to use Ollama
as LLM provider. Some of the advantages are that it is more lighweight, easier to install and ready to use with Mac GPU devices.`}),`
`,s.jsxs(e.h3,{id:"setting-up-ollama",children:["Setting up Ollama",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-ollama",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["Download and install ollama from the official ",s.jsx(e.a,{href:"https://ollama.com/download",children:"website"})]}),`
`,s.jsxs(e.h3,{id:"setting-up-embeddings-model-with-ollama",children:["Setting up Embeddings Model with Ollama",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#setting-up-embeddings-model-with-ollama",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:["Download the embeddings model of your preference (e.g. from ",s.jsx(e.a,{href:"https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/resolve/main/nomic-embed-text-v1.5.f16.gguf",children:"HuggingFace"}),")"]}),`
`,s.jsxs(e.li,{children:["Create ",s.jsx(e.code,{children:"Modelfile"})," to use the embedding model with Ollama. Learn more about Ollama Modelfile ",s.jsx(e.a,{href:"https://github.com/ollama/ollama/blob/main/docs/modelfile.md",children:"here"})]}),`
`]}),`
`,s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Modelfile","data-lang":"docker",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:"FROM"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:" ./nomic-embed-text-v1.5.f16.gguf # this is the path to the embedding model"})]})})}),`
`,s.jsxs(e.ol,{start:"3",children:[`
`,s.jsx(e.li,{children:"Import the model into Ollama"}),`
`]}),`
`,s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:s.jsx(e.code,{children:s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"ollama"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" create"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"model-nam"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -f"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:" <"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"Modelfil"}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"e"}),s.jsx(e.span,{style:{color:"#D73A49","--shiki-dark":"#F47067"},children:">"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"'"})]})})}),`
`,s.jsxs(e.h2,{id:"selecting-a-knowledge-base-and-prompts-for-your-gaianet-node",children:["Selecting a knowledge base and prompts for your GaiaNet node",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#selecting-a-knowledge-base-and-prompts-for-your-gaianet-node",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.p,{children:["In order to supplement the LLM model hosted on your Gaia node with a custom knowledge base and prompts follow the instructions outlined in this ",s.jsx(e.a,{href:"https://docs.gaianet.ai/node-guide/customize#select-a-knowledge-base",children:"link"}),`.
Remember to re-initialize and re-start the node after you make configuration changes.`]}),`
`,s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"Terminal","data-lang":"bash",children:s.jsxs(e.code,{children:[s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"gaianet"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" init"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"gaianet"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" start"})]})]})}),`
`,s.jsxs(e.h3,{id:"recommended-gaianet-node-configuration",children:["Recommended GaiaNet Node Configuration",s.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#recommended-gaianet-node-configuration",children:s.jsx(e.div,{"data-autolink-icon":!0})})]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Tested on Mac Studio 32GB RAM"}),`
`,s.jsxs(e.li,{children:["Custom prompts for the ",s.jsx(e.a,{href:"/apis/boardroom-api",children:"Boardroom Aave example"})]}),`
`]}),`
`,s.jsx(e.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0","data-title":"config.json","data-lang":"json",children:s.jsxs(e.code,{children:[s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"{"})}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "address"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"your-node-address"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "chat"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"https://huggingface.co/gaianet/Meta-Llama-3.1-8B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-8B-Instruct-Q5_K_M.gguf"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "chat_batch_size"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"64"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "chat_ctx_size"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"8192"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "chat_name"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"Boardroom-Llama-3-Chat"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "description"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"Llama-3-chat model. with Boardroom API snapshot"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "domain"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"us.gaianet.network"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "embedding"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"https://huggingface.co/gaianet/Nomic-embed-text-v1.5-Embedding-GGUF/resolve/main/nomic-embed-text-v1.5.f16.gguf"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "embedding_batch_size"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"2048"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "embedding_collection_name"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"boardroom_api_collection"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:", "}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:"#"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" this"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" is"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" the"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" name"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" of"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" the"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" collection"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" in"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" the"}),s.jsx(e.span,{style:{color:"#B31D28","--shiki-dark":"#FF938A",fontStyle:"italic","--shiki-dark-font-style":"italic"},children:" snapshot"})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "embedding_ctx_size"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"2048"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "embedding_name"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"Nomic-embed-text-v1.5"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "llamaedge_port"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"8080"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "prompt_template"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"llama-3-chat"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "qdrant_limit"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"1"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "qdrant_score_threshold"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"0.5"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "rag_policy"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"system-message"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "rag_prompt"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:`"Use the following pieces of context to answer the user's question. Respond directly to the user with your answer, do not say 'this is the answer' or 'this is the answer' or similar language. Never mention your knowledge base or say 'according to the context' or 'hypothetical' or other similar language. Use json metadata included in knowledge base whenever possible enrich your answers. The term aave refers the DAO protocol where discussions and proposals are posted. If you don't know the answer, don't try to make up an answer. `}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#F47067"},children:"\\n"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:"----------------"}),s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#F47067"},children:"\\n"}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "reverse_prompt"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'""'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "snapshot"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"/your-snapshot-path-or-url"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:","})]}),`
`,s.jsxs(e.span,{className:"line",children:[s.jsx(e.span,{style:{color:"#005CC5","--shiki-dark":"#8DDB8C"},children:'  "system_prompt"'}),s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:": "}),s.jsx(e.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:'"You are an AI assistant designed to provide clear, concise, and accurate answers to user queries. Your primary functions include retrieving relevant information from the provided RAG (Retrieval-Augmented Generation) data and utilizing your pre-training data when necessary. Use json metadata included in RAG data whenever possible enrich your answers. The term aave refers the DAO protocol where discussions and proposals are posted. If no relevant information is found, you will inform the user that you are not familiar with the knowledge."'})]}),`
`,s.jsx(e.span,{className:"line",children:s.jsx(e.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"}"})})]})})]})}function o(i={}){const{wrapper:e}={...n(),...i.components};return e?s.jsx(e,{...i,children:s.jsx(a,{...i})}):a(i)}export{o as default,r as frontmatter};