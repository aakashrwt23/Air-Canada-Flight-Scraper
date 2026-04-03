# Air-Canada-Flight-Scraper
Node.js flight scraper using Puppeteer to extract structured data from Air Canada. Bypasses bot detection via Remote Debugging, programmatically handles dynamic modals to capture hidden flight numbers, and exports sanitized JSON (Times, Duration, Points, Cabin). Clean &amp; resilient.

Technical Approach:   Air Canada Flight Scraper
Objective: To build a reliable Node.js scraper that extracts structured flight data (schedules, cabin classes, and Aeroplan points) from the dynamic Air Canada booking interface.

 1. Environment & Connection Strategy
Rather than launching a standard "headless" browser—which is often flagged by anti-bot services—I utilized Puppeteer-core to connect to an existing Chrome instance via a remote debugging port (localhost:9222).

The Benefit: This allows the script to inherit an authenticated session and a natural browser fingerprint, significantly reducing the risk of being blocked by security triggers like Akamai.

 2. Synchronization & Page Targeting
A critical step in web automation is ensuring the script acts on the correct data.

Targeting: The script scans all open tabs to identify the active flight results page.

Wait Logic: To prevent errors caused by "empty" pages, I implemented a synchronization gate that waits for the specific DOM element li.flight-block-list-item to load before proceeding.

 3. Sequential Extraction Logic
To maintain high data integrity, the scraper processes flight results sequentially.

The Approach: It collects all flight row elements and iterates through them one by one.

The Benefit: While parallel processing is faster, sequential iteration prevents DOM instability and ensures that UI interactions (like clicking buttons) don't conflict with each other.

 4. Multi-Layer Data Extraction
Data is captured in two distinct phases:

Phase A: Surface Data: Basic information (times, duration, stops, and points) is extracted directly from the result card using page.evaluate(). I used Regex to clean and standardize strings like 14h 30m into usable data formats.

Phase B: Deep Data (Flight Numbers): Since flight numbers are hidden in the UI, the script programmatically clicks the "Details" button for every flight. It then parses the modal popup to extract individual segment flight numbers (e.g., AC043).

 5. Handling Dynamic UI Elements
Interacting with modals requires handling "state changes."

Stability: The scraper includes logic to wait for the modal to be fully visible before reading, and ensures the modal is closed (via the 'Close' button or 'Escape' key) before moving to the next row.

Error Prevention: This prevents the "Element is not clickable" errors common in dynamic web apps.

 6. Data Structuring & Export
The final output is a clean, nested JSON array. Each object represents a complete journey, including:

Flight Identity: Main flight number and individual segment codes.

Logistics: Precise departure/arrival times and total duration.

Offer Details: Cabin class and total Aeroplan points required.

**Summary of Key Techniques**
Technique	Purpose
Remote Debugging	Bypasses bot detection and reuses sessions.
Regex Parsing	Sanitizes messy UI text into structured data.
Programmatic Interaction	Accesses hidden data inside dynamic modals.
State Management	Ensures the UI is ready before the next action.

**Conclusion**
This approach prioritizes resilience over speed. By treating the browser as a state machine and carefully handling dynamic elements, the scraper provides a high-fidelity dataset that is ready for API integration or analytical reporting.
