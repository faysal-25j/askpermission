# Senior SQA Engineer Assessment – Test Automation

This project contains automated tests for [Permission.io](https://ask.permission.io) using **Playwright (JavaScript)**.  
It covers login scenarios (with ReCaptcha handling) and AI Chat functionality.  

---

##  Setup Instructions

npm install
npx playwright install

Run All Tests
npx playwright test


Run Specific File
npx playwright test tests/login.spec.js
npx playwright test tests/ai-agent.spec.js

Open HTML Report
npx playwright show-report




| Test Suite        | Test Case                                   | Result                | Notes                                                                               |
| ----------------- | ------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Login Feature** | Valid login                                 | ✅ Pass               | Requires manual Recaptcha solve. Valid credentials log in successfully.             |
|                   | Invalid login shows error                   | ✅ Pass               | Error status “Invalid Credentials” displayed as expected.                           |
|                   | Account lockout after multiple failed tries | ⚠️ Pass (with retry) | Error “auth/too-many-requests” observed after repeated attempts. API latency noted. |
| **AI Agent Chat** | AI page loads and chat UI is visible        | ✅ Pass               | Welcome message, textbox, and send button verified.                                 |
|                   | Send message and receive response           | ✅ Pass               | User message visible. Bot response logged (non-deterministic).                      |
|                   | Message history persists during session     | ✅ Pass               | History remains visible after reload. Multiple bot replies logged.                  |
