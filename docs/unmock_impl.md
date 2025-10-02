# Unmock Implementation Plan

This document outlines the plan to replace the mock data and functionality in the Romanian Citizenship Chat App with a real implementation.

## 1. Mock Data and Dynamic Content Generation

The following data is currently mocked in `src/App.tsx`:

*   **Scenarios:** The list of practice scenarios.
*   **Sentences:** The sentences for each scenario, including translations and difficulty levels.

### Solution

We will replace the static, mocked sentences with dynamically generated content using the Gemini 2.5 Flash model. This approach will provide a more engaging and personalized learning experience by generating new sentences in real-time, tailored to the user's selected scenario and skill level. The list of scenarios will remain static for now to provide context for the generation.

### Implementation

1.  **Set up Gemini API Access:**
    *   Obtain an API key for the Gemini API.
    *   We will need a backend service to securely handle API calls and protect the API key. This can be a simple serverless function (e.g., using Vercel, Netlify, or AWS Lambda) or a lightweight Node.js server.

2.  **Backend Endpoint for Content Generation:**
    *   Create a new API endpoint (e.g., `/api/generate-sentence`).
    *   This endpoint will accept the user's current scenario, skill level (e.g., 'A1', 'B2'), and target translation language as input.

3.  **Prompt Engineering:**
    *   The backend will construct a detailed prompt to send to the Gemini 2.5 Flash model. The prompt will instruct the model to:
        *   Act as a Romanian language tutor.
        *   Generate a single, practical sentence in Romanian relevant to the given scenario and skill level.
        *   Provide a translation for the sentence in the specified target language.
        *   Return the response in a structured JSON format, e.g., `{ "romanian": "...", "translation": "...", "level": "A1", "context": "..." }`.

4.  **Frontend Integration:**
    *   In `src/App.tsx`, modify the `generateNextSentence` function.
    *   Instead of selecting a sentence from the `mockSentences` array, it will make a `fetch` request to our new `/api/generate-sentence` endpoint.
    *   The response from the API will be used to update the application's state and display the new sentence to the user.
    *   The static `mockSentences` object will be removed.

## 2. Mock Functionality

The following functionality is currently mocked in `src/App.tsx`:

*   **Text-to-Speech (TTS):** The `playAudio` and `playSlowAudio` functions use `setTimeout` to simulate audio playback.
*   **Speech-to-Text (STT):** The `startRecording` and `processRecording` functions use `setTimeout` and a mock transcript to simulate speech recognition.
*   **Scoring:** The `processRecording` function generates a random score.
*   **Feedback:** The `generateMockFeedback` function returns a random feedback message.

### Solution

We will replace the mock functionality with a real-time, interactive implementation using the **Gemini Live API**. This API will handle Text-to-Speech (TTS), Speech-to-Text (STT), and provide a more sophisticated way to score and give feedback on pronunciation.

### Implementation

1.  **Integrate Gemini Live API:** We will use the Gemini Live API for handling audio streams. This will replace the separate Web Speech APIs for TTS and STT.
2.  **Text-to-Speech (TTS):** When the bot needs to "speak" a sentence, we will send the Romanian text to the Gemini Live API, which will return an audio stream that we can play directly in the browser. This will replace the `playAudio` and `playSlowAudio` mock functions.
3.  **Speech-to-Text (STT) and Speech-to-Speech:** When the user records their voice, we will stream their microphone input to the Gemini Live API. The API will provide a real-time transcript of their speech. This will replace the `startRecording` and `processRecording` mock functions.
4.  **Scoring and Feedback:** We can leverage the Gemini model's capabilities for more advanced scoring and feedback. We will send the user's transcribed speech along with the original sentence to the Gemini model (via a text prompt, possibly in the same conversational turn) and ask it to evaluate the pronunciation, providing a score and specific feedback. This is a significant improvement over the simple Levenshtein distance approach.

## 3. Missing Functionality

The following functionality is missing from the application:

*   **User authentication:** There is no way for users to create accounts or save their progress.
*   **State management:** The application's state is managed with `useState` hooks in the `App` component. This can become difficult to manage as the application grows.
*   **Error handling:** There is no error handling for API calls or other asynchronous operations.
*   **Usage Cost Transparency:** The user has no visibility into the potential costs associated with using the Gemini Live API.

### Solution

We will add the missing functionality to the application.

### Implementation

1.  **User authentication:** We will use **Supabase Auth** or **Firebase Authentication** to add user authentication to the application.
2.  **State management:** We will use a state management library like **Zustand** or **Redux** to manage the application's state.
3.  **Error handling:** We will add error handling to all API calls and other asynchronous operations. We will use a library like **React Query** to simplify data fetching and error handling.
4.  **Cost Calculation and Display:**
    *   **Backend:** The backend service that handles the Gemini Live API requests will be responsible for calculating the cost of each interaction. Based on the duration of the audio streamed to and from the API, it will calculate the cost using the official Gemini API pricing. This cost information will be included in the API response sent back to the frontend.
    *   **Frontend:** The frontend will display the accumulated cost of the current session to the user. This information can be shown in the **Settings panel** to keep the main UI clean and uncluttered, providing transparency without being intrusive.

## 4. Considerations and Potential Pitfalls

While the plan to use the Gemini APIs is powerful, it introduces complexities that need to be addressed.

*   **API Latency and UI/UX:** Calls to the Gemini API (for both content generation and live interaction) will introduce network latency. The frontend must be designed to handle this gracefully. This includes implementing loading states (e.g., spinners or skeletons) when fetching new sentences or waiting for transcription results, ensuring the user has a smooth experience.

*   **Cost Management:** Both the Gemini 2.5 Flash and Gemini Live APIs are paid services. The cost will be directly related to usage (number of generated sentences, duration of audio streaming). It is crucial to monitor API usage and costs closely. For content generation, implementing a caching strategy (e.g., caching generated sentences for a specific scenario/level combination for a short period) could be considered to reduce redundant API calls.

*   **Implementation Complexity of Gemini Live:** The Gemini Live API involves real-time, bidirectional audio streaming, which is significantly more complex to implement than simple REST API calls. This will require careful management of the audio stream from the user's microphone, handling the connection lifecycle (opening, closing, errors), and processing the audio data chunks being sent to and received from the API.

*   **Content Quality and Prompt Robustness:** The quality of the dynamically generated sentences depends entirely on the quality of the prompts sent to the Gemini model. Significant effort will be needed in "prompt engineering" to ensure the generated content is consistently accurate, grammatically correct, and appropriate for the user's skill level.

*   **Browser Permissions and Compatibility:** The application will require access to the user's microphone. The code must handle requesting this permission from the user and gracefully manage cases where the permission is denied. We must also ensure compatibility across different browsers and their implementations of the necessary media APIs.
