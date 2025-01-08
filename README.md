# Attack-the-Virus
## Overview
"Attack the Virus" is an educational web application designed to enhance public understanding of the immune system, the role of antibodies, and the effectiveness of vaccines, while also teaching basic math skills. Targeted towards students, educators, and curious individuals, the app uses gamified learning to make complex concepts accessible and engaging.

---

## Features
- **Interactive Quiz:** Test your knowledge on the immune system, diseases, and vaccines with timed questions and educational "Info Cards."
- **Mini-Games:**
  - *Virus Breaker*: A virus-themed version of Brick Breaker.
  - *Virus Sweeper*: A reimagining of Minesweeper with a viral twist.
  - *Virus Panic*: Solve math problems to clear virus cells.
- **Clinic Finder:** Locate nearby clinics and healthcare facilities using the Google Maps API.
- **AI Chatbot:** Engage with "Vacciwiz" to get answers about health, vaccines, and diseases.

---

## Technologies
- **Frontend:** Angular, GSAP for animations
- **Backend:** Spring Boot, MySQL
- **APIs:** Google Maps API for clinic finder
- **Testing:** JUnit, Mockito for backend; manual and automated tests for frontend

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/attack-the-virus.git
   cd attack-the-virus
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd backend
   mvn install
   ```

4. Start the frontend:
   ```bash
   cd frontend
   ng serve
   ```

5. Start the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

---

## Usage
1. Navigate to `http://localhost:4200` in your browser.
2. Explore features like the quiz, mini-games, and the clinic finder.
3. Engage with "Vacciwiz" for real-time information.
