# UI/UX Specification

This document provides an overview of the existing User Interface (UI) and User Experience (UX) of the Romanian Citizenship Chat App, and details the necessary modifications to support the new features outlined in the `unmock_impl.md` plan.

## 1. Current UI/UX

The application is designed as a mobile-first, single-page chat application. The interface is clean and focused on the core task of language practice.

### Core Components

*   **Progress Header:**
    *   **UI:** A sticky header at the top of the screen.
    *   **UX:** Displays the current `scenario name`, `difficulty level`, `streak`, and `daily goal progress`. It also contains icons to open the Scenario Selector and the Settings panel.

*   **Chat Message:**
    *   **UI:** A series of chat bubbles. Bot messages appear on the left, and user messages on the right.
    *   **UX:** Bot messages display the Romanian sentence and its translation. User messages display their transcribed speech, a pronunciation score, and feedback.

*   **Audio Controls:**
    *   **UI:** A persistent bar at the bottom of the screen with circular icon buttons.
    *   **UX:** Provides controls for the user to:
        *   Play the bot's sentence audio (`Play`).
        *   Play the audio slowly (`Play Slow`).
        *   Record their own voice (`Record`).
        *   Request an easier sentence (`Simplify`).
        *   Move to the next sentence (`Next`).

*   **Scenario Selector:**
    *   **UI:** A sheet that slides in from the left.
    *   **UX:** Allows the user to switch between different practice scenarios (e.g., "Identification", "Appointments").

*   **Settings:**
    *   **UI:** A sheet that slides in from the right.
    *   **UX:** Contains options to change the translation language, set the daily goal, and toggle app settings.

## 2. UI/UX Modifications for New Features

The following changes are required to support the transition from a mock implementation to a fully functional, API-driven application.

### 2.1. Dynamic Content and API Latency

*   **Challenge:** Generating sentences and receiving audio from the Gemini APIs will take time. The UI must provide feedback to the user during these loading states.
*   **Modifications:**
    *   **Chat View:** When a new sentence is being fetched from the Gemini API, a loading indicator should appear in the chat history. This can be a simple "Bot is typing..." message with an animated ellipsis to manage user expectations.
    *   **Audio Playback:** The "Play" and "Play Slow" buttons in the `AudioControls` should enter a disabled/loading state while the audio is being fetched from the Gemini Live API.

### 2.2. Real-time Recording and Transcription

*   **Challenge:** The current recording is a fixed-duration mock. The new implementation will use a real-time audio stream.
*   **Modifications:**
    *   **Audio Controls:** The "Record" button functionality will be updated. A "tap-and-hold to speak" interaction is recommended for a natural, walkie-talkie-like experience.
    *   **Visual Feedback:** While the user is recording, the microphone icon should change to indicate that the app is actively listening. A subtle pulsing animation or a simple waveform visualization would be effective.
    *   **Real-time Transcript (Optional but Recommended):** To enhance the experience, the user's speech could be transcribed in real-time and displayed in the message input area as they speak.

### 2.3. User Authentication

*   **Challenge:** The app needs a flow for users to sign up and log in.
*   **Modifications:**
    *   **Login/Signup Screen:** A new screen will be designed for user authentication. It should be simple, offering options for email/password login and potentially social logins (e.g., Google).
    *   **Profile Indicator:** Once logged in, a user avatar or initials can be added to the `ProgressHeader`, replacing the generic "Settings" icon. Tapping this would open the Settings panel.

### 2.4. Usage Cost Transparency

*   **Challenge:** The user needs to be aware of the costs associated with their API usage.
*   **Modifications:**
    *   **Settings Panel:** A new section titled "Usage" will be added to the Settings panel.
    *   **Cost Display:** This section will display the "Current Session Cost" as a running total. The design should be clear and easy to understand, but not alarming to the user.

### 2.5. Error Handling and Permissions

*   **Challenge:** The app must gracefully handle API errors and requests for microphone permissions.
*   **Modifications:**
    *   **Microphone Permission:** Before the first recording attempt, a modal or a non-intrusive banner should appear, explaining why microphone access is needed. This provides context before the browser's native permission prompt is shown. If permission is denied, the record button should be disabled, and a small message should guide the user on how to enable it in their browser settings.
    *   **Error Notifications:** For API or network errors, the app will use "toast" notifications (small, non-blocking pop-ups) to inform the user of the issue (e.g., "Failed to generate sentence. Please check your connection and try again."). This is less disruptive than a full-screen error message.
