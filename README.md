# Local AI Coding Agent Demo — Ollama + OpenCode

A simple Next.js movie application used to demonstrate how a **local AI coding agent** can understand an existing codebase, plan a feature, implement it, and verify the result.

This project accompanies the CoreThreads YouTube video:

**Can a Local AI Code for You? | Ollama + OpenCode**

## 🎥 Video

**Can a Local AI Code for You? | Ollama + OpenCode**

[Watch the video on YouTube](https://youtu.be/D1P_qmhh6l8)

---

## About the Project

The application is a simple movie browser built with **Next.js** and the **TMDB API**.

The original application displays popular movies in a grid. Users can select a movie to open its detail page, which includes information such as:

- Movie description
- Trailer
- Images
- Other movie details

For the video, I gave a local AI coding agent running through **Ollama + OpenCode** a real development task:

> **Add movie search functionality to the application.**

The interesting part is that the agent was not given instructions about which files to modify or exactly how to implement the feature. It first inspected the existing codebase, created an implementation plan, and then implemented the feature.

---

# Before vs After

The repository contains both versions of the application so you can easily compare the code.

```text
local-ai-coding-agent-demo/
│
├── original/
│   └── Movie application before the AI implementation
│
├── ai-implemented/
│   └── Movie application after the AI implementation
│
└── README.md
```

### `original/`

The original application before adding the search feature.

It includes:

- Popular movies from TMDB
- Movie grid
- Movie detail page
- Movie description
- Movie trailer
- Movie images

### `ai-implemented/`

The application after the AI coding agent implemented the search feature.

In addition to the original functionality, it includes:

- Search button on the landing page
- Dedicated search page
- Search input
- TMDB movie search
- Search results
- Navigation between search results and movie details

---

# The AI Coding Task

The AI coding agent was given the following task:

> I want to add a movie search feature to this application.
>
> Before making any changes, inspect the existing codebase and understand how the application currently fetches and displays movies.
>
> Create an implementation plan for adding search functionality.
>
> The requirements are:
>
> - Add a Search button to the landing page.
> - Clicking Search should navigate the user to a dedicated search page.
> - The search page should contain a search input.
> - When the user submits a search query, fetch matching movies from the TMDB API.
> - Display the search results using the existing movie-card/grid UI where appropriate.
> - Follow the existing architecture and coding conventions.
> - Do not modify any files yet. Only inspect the codebase and provide the implementation plan.

After reviewing the plan, the agent was instructed to proceed with the implementation.

---

# What This Demonstrates

The purpose of this experiment isn't simply to show an LLM generating code.

The goal is to demonstrate the difference between asking an LLM for a code snippet and using an **AI coding agent** that can work with an existing codebase.

The workflow looks roughly like this:

```text
        Developer
            │
            ▼
       Requirements
            │
            ▼
     ┌───────────────┐
     │  OpenCode     │
     │ AI Coding     │
     │    Agent      │
     └───────┬───────┘
             │
             ▼
       Inspect Codebase
             │
             ▼
       Create Plan
             │
             ▼
       Modify Files
             │
             ▼
        Run Checks
             │
             ▼
       Verify Result
```

The LLM itself runs locally through **Ollama**.

---

# Technologies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TMDB API](https://developer.themoviedb.org/)
- [Ollama](https://ollama.com/)
- [OpenCode](https://opencode.ai/)

---

# Running the Application

You can run either version independently.

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/local-ai-coding-agent-demo.git
cd local-ai-coding-agent-demo
```

## 2. Choose a version

For the original application:

```bash
cd original
```

Or for the AI-implemented version:

```bash
cd ai-implemented
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure TMDB API

The application uses the TMDB API to retrieve movie information.

Create a `.env.local` file in the selected project directory:

```env
TMDB_API_KEY=your_tmdb_api_key
```

You can obtain a TMDB API key from the [TMDB developer portal](https://developer.themoviedb.org/).

**Do not commit your API key to GitHub.**

## 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Running the Local AI Coding Agent

The AI implementation in the video uses:

**Ollama + OpenCode**

The general architecture is:

```text
┌──────────────────────┐
│      OpenCode        │
│  AI Coding Agent     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Ollama         │
│   Local LLM Runtime  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Local Model      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Next.js Codebase   │
└──────────────────────┘
```

Ollama is responsible for running the LLM locally, while OpenCode provides the coding-agent environment through which the model can work with the project.

---

# Project Structure

The exact structure may vary depending on the version of the application, but the project broadly follows a Next.js application structure.

```text
app/
components/
lib/
public/
package.json
tsconfig.json
...
```

The AI agent was expected to inspect the existing structure rather than being given a predefined list of files to modify.

---

# Original Application

The original application provides a simple movie browsing experience.

### Landing Page

Popular movies are retrieved from TMDB and displayed in a grid.

### Movie Details

Selecting a movie opens its detail page, which provides additional information including:

- Description
- Trailer
- Images
- Movie information

There is no movie search functionality in this version.

---

# AI-Implemented Application

The AI coding agent added a search workflow.

```text
Landing Page
     │
     ▼
Search Button
     │
     ▼
Search Page
     │
     ▼
Enter Movie Query
     │
     ▼
TMDB Search API
     │
     ▼
Search Results
     │
     ▼
Movie Details
```

The existing movie-card and movie-detail functionality is reused where appropriate.

---

# Why Use a Local AI Model?

Running the model locally provides an alternative to sending your source code to a cloud-based AI provider.

Depending on the model and hardware, local AI can provide:

- Local processing
- Greater control over your data
- No per-request API cost
- Offline capability for supported workflows
- The ability to experiment with AI tools on your own machine

However, local models also have limitations.

Performance depends heavily on:

- Model size
- Available RAM/VRAM
- CPU/GPU
- Context length
- Quantization
- The complexity of the coding task

A local coding agent isn't automatically equivalent to a cloud-based coding agent. Model capability and available hardware matter.

---

# Important: Review AI-Generated Code

The fact that an AI coding agent successfully implements a feature does not mean the implementation should automatically be accepted.

Always review and test the generated changes.

Things worth checking include:

- Correctness
- Security
- Error handling
- API usage
- Performance
- Edge cases
- Maintainability
- Tests
- Existing functionality

The AI is a development tool, not a replacement for engineering judgment.

---

# Related CoreThreads Videos

This project follows my previous experiments with local AI and automation.

### Running an LLM Locally with Ollama

Learn how to run an LLM locally on your own machine using Ollama.

https://youtu.be/qSElEIVRKDI

### Automating LinkedIn Posts with n8n + Ollama

A local AI automation workflow using n8n and Ollama to generate LinkedIn posts.

https://youtu.be/_xgUnXWwbbg

---

# About CoreThreads

**CoreThreads** explores practical technology across:

- Artificial Intelligence
- Local LLMs
- AI Agents
- Automation
- Software Development
- Cybersecurity
- Information Security
- Open Source
- Emerging Technologies

The focus is on **building, experimenting, and understanding how these technologies actually work**.

---

## Disclaimer

This repository is provided for educational and demonstration purposes.

AI-generated code should always be reviewed, tested, and adapted to the requirements of your own project.

TMDB is not affiliated with or endorsed by this project.

---

⭐ If you found this project useful, consider starring the repository and subscribing to **CoreThreads** for more practical AI and technology experiments.