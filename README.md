# AI Storytelling App

An interactive storytelling application built with Next.js that uses OpenAI to generate creative story progressions and AI-generated images.

## Features

- Generates engaging story beginnings and continuations
- Presents three alternative next sentences for the user to choose from
- Option to generate AI images for story scenes
- Beautiful and intuitive user interface
- Real-time story building experience

## Setup and Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd storytelling-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

Create a `.env.local` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

1. When you start the app, click "Start a New Adventure" to begin
2. The AI generates the first sentence of your story
3. You'll be presented with three options for the next sentence
4. Select one option and click "Continue Story"
5. Optionally, click "Generate Image" to create an AI illustration for your story
6. Continue this process to build your unique story!

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API (GPT and DALL-E)

## Project Structure

- `/src/app/page.tsx`: Main application page and UI
- `/src/components/`: Reusable UI components
- `/src/app/api/story/`: API route for story text generation
- `/src/app/api/image/`: API route for image generation

## License

MIT

## Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
