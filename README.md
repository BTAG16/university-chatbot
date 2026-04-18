# University of Dunaújváros — AI Chatbot

A production-ready AI assistant for the [University of Dunaújváros (UNIDUNA)](https://www.uniduna.hu/en/), built with React and powered by AWS Bedrock. It answers questions about admissions, programmes, campus life, scholarships, and more — using the university's own documents as its knowledge source.

---

## Features

- **RAG-powered answers** via AWS Bedrock Knowledge Base
- **Source citations** shown beneath each response
- **Suggested questions** panel accessible anytime from the input bar
- **Clear conversation** with confirmation prompt
- **Fully responsive** — spans the entire viewport, mobile-friendly
- **Uniduna branding** — navy/blue palette, shield icon, institutional typography

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, plain CSS-in-JS |
| AI / RAG | AWS Bedrock — Claude Sonnet 4 (`eu.anthropic.claude-sonnet-4-20250514-v1:0`) |
| Knowledge Base | AWS Bedrock Knowledge Base + S3 |
| API | AWS API Gateway + Lambda (Python) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- An AWS account with Bedrock access in `eu-central-1`
- A deployed Lambda + API Gateway (see [Backend Setup](#backend-setup))

### Installation

```bash
git clone https://github.com/BTAG16/university-chatbot.git
cd university-chatbot
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Your API Gateway endpoint URL |

### Run Locally

```bash
npm start
```

Opens at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

Output goes to `/build` — deploy that folder to any static host (S3, Amplify, Vercel, etc.).

---

## Backend Setup

The Lambda function requires the following environment variables set in AWS:

| Variable | Description |
|---|---|
| `ACCOUNT_ID` | Your AWS account ID |
| `REGION` | AWS region (e.g. `eu-central-1`) |
| `KNOWLEDGE_BASE_ID` | Bedrock Knowledge Base ID |
| `UNIVERSITY_NAME` | Display name used in the system prompt |

The Lambda execution role must have:
- `bedrock:Retrieve` on the Knowledge Base
- `bedrock:InvokeModel` on the inference profile ARN

### Inference Profile

The chatbot uses the EU cross-region inference profile for Claude Sonnet 4:

```
arn:aws:bedrock:eu-central-1:{ACCOUNT_ID}:inference-profile/eu.anthropic.claude-sonnet-4-20250514-v1:0
```

Verify it is listed under **Bedrock → Cross-region inference** in your AWS Console before deploying.

---

## Project Structure

```
university-chatbot/
├── public/
├── src/
│   ├── App.js                  # Root component
│   └── UniversityChatbot.jsx   # Chatbot UI + API integration
├── .env                        # Local env vars (gitignored)
├── .env.example                # Env var template
└── package.json
```

---

## License

This project is private and intended for use by the University of Dunaújváros.
