# What is Gaia?

Gaia is a decentralized computing infrastructure that enables everyone to create, deploy, scale, and monetize their own AI agents that reflect their styles, values, knowledge, and expertise.

It allows individuals and businesses to create AI agents. Each Gaia node provides:

- a web-based chatbot UI
- an OpenAI compatible API

100% of today's AI agents are applications in the OpenAI ecosystem. With our API approach, Gaia is an alternative to OpenAI. Each Gaia node has the ability to be customized with a fine-tuned model supplemented by domain knowledge which eliminates the generic responses many have come to expect.

## Features

The basic operational unit in the GaiaNet network is a node. A Gaia node is a streamlined software stack that allows any technically competent person to run an AI agent of his own. The software stack on the Gaia node consists of the following 7 key components.

**1 Application runtime.** Gaia applications run in a lightweight, secure and high-performance sandbox called WasmEdge. As an open-source project managed by the Linux Foundation and CNCF, WasmEdge runtime works seamlessly with leading cloud native tools such as Docker, containerd, CRI-O, Podman and Kubernetes. It is also the virtual machine of choice by leading public blockchains to securely and efficiently execute on-chain and off-chain smart contracts. 

WasmEdge is a high-performance and cross-platform runtime. It can run AI models on almost all CPUs, GPUs, and AI accelerators at native speed, making it an ideal runtime for decentralized AI agents.

**2 Finetuned LLM.** The Gaia node supports almost all open-source LLMs, multimodal models (eg Large Vision Models or LVMs), text-to-image models (eg Stable Diffusion) and text-to-video models. That includes all finetuned models using personal or proprietary data. 

The node owner can finetune open-source models using a wide variety of tools. For example, the node owner can finetune an LLM using personal chat histories so that the finetuned LLM can mimic his own speaking style. He can also finetune an LLM to focus it on a specific knowledge domain to reduce hallucinations and improve answer quality for questions in that domain. A finetuned LLM can guarantee to output JSON text that matches a pre-determined schema for use with external tools.

Besides LLMs, the node owner could finetune Stable Diffusion models with her own photos to generate images that look like her. 

**3 Embedding model.** The Gaia node needs to manage a body of public or proprietary knowledge for the AI agent. It is a key feature that enables the agent to specialize and outperform much larger models in a specific domain.  The embedding models are specially trained LLMs that turns input sentences into a vector representation, instead of generating completions. Since the embedding models are trained from LLMs, they can “embed” the “meaning” of the sentences into the vectors so that similar sentences are located close together in the high dimensional space occupied by those vectors.

With the embedding model, a Gaia node can ingest a body of text, images, PDFs, web links, audio and video files, and generate a collection of embedding vectors based on their contents. The embedding model also turns user questions and conversations into vectors, which allows the Gaia node to quickly identify contents in its knowledge base that are relevant to the current conversation. 

**4 Vector database.** The embedding vectors that form Gaia node’s knowledge base are stored on the node itself for optimal performance and maximum privacy. The Gaia node includes a Qdrant vector database. 

**5 Custom prompts.** Besides finetuning and knowledge arguments, the easiest way to customize an LLM for new applications is simply to prompt it. Like humans, LLMs are remarkable one-shot learners. You can simply give it an example of how to accomplish a task, and it will learn and do similar tasks on its own. Prompt engineering is a practical field to research and develop such prompts.

Furthermore, effective prompts could be highly dependent on the model in use. A prompt that works well for a large model, such as Mixtral 8x22b, is probably not going to work well for a small model like Mistral 7b.

The Gaia node can support several different prompts that are dynamically chosen and used in applications. For example,

* The `system_prompt` is a general introduction to the agent task the node is supposed to perform. It often contains a persona to help the LLM respond with the right tone. For example, the `system_prompt` for a college teaching assistant could be: “You are a teaching assistant for UC Berkeley’s computer science 101 class. Please explain concepts and answer questions in detail. Do not answer any question that is not related to math or computer science.”
* The `rag_prompt` is a prefix prompt to be dynamically inserted in front of knowledge base search results in an RAG chat. It could be something like this: “Please answer the question based on facts and opinions in the context below. Do not make anything that is not in the context. ---------”

The LLM community has developed many useful prompts for different application use cases. Gaia node allows you to easily manage and experiment with them. 

Through the our developer SDK, Gaia owners and operators could customize the logic of dynamic prompt generation in their own way. For example, a Gaia node could perform a Google search for any user question, and add the search results into the prompt as context.

**6 Function calls and tool use.** The LLM not only is great at generating human language, but also excels at generating machine instructions. Through finetuning and prompt engineering, we could get some LLMs to consistently generate structured JSON objects or computer code in many language tasks, such as summarizing and extracting key elements from a paragraph of text.

The Gaia node allows you to specify the output format of the generated text. You can give it a grammar specification file to enforce that responses will always conform to a pre-defined JSON schema.

Once the LLM returns a structured JSON response, the agent typically need to pass the JSON to a tool that performs the task and comes back with an answer. For example, the user question might be. 

```
What is the weather like in Singapore?
```

The LLM generates the following JSON response. 

```
{"tool":"get_current_weather", "location":"Singapore","unit":"celsius"}
```

The Gaia node must know what is the tool associated with get_current_weather and then invoke it. Gaia node owners and operators can configure any number of external tools by mapping a tool name with a web service endpoint. In the above example, the get_current_weather tool might be associated with a web service that takes this JSON data. The Gaia node sends the JSON to the web service endpoint via HTTPS POST and receives an answer. 

```
42
```

It then optionally feeds the answer to the LLM to generate a human language answer. 

```
The current weather in Singapore is 42C. 
```

Through the Gaia node SDK, developers are not limited to using web services. They can write plugins to process LLM responses locally on the node. For example, the LLM might return Python code, which can be executed locally in a sandbox and for the Gaia node to perform a complex operation. 

**7 The API server.** All Gaia nodes must have the same API for questions and answers. That allows front-end applications to work with, and potentially be load-balanced to any Gaia node. We choose to support the OpenAI API specification, which enables Gaia nodes to become drop-in replacements for OpenAI API endpoints for a large ecosystem of applications.

The API server runs securely and cross-platform on the WasmEdge runtime. It ties together all the other components in the Gaia node. It receives user requests, generates an embedding from the request, searches the vector database, adds search results to the prompt context, generates an LLM response, and then optionally uses the response to perform function calling. The API server also provides a web-based chatbot UI for users to chat with the RAG-enhanced finetuned LLM on the node.

## Configuration
- Port: 8080
- GPU: Required
- API endpoint access