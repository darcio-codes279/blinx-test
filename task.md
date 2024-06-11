Technical Test: Full Stack Developer

Project Overview: You are tasked with building a health care application featuring a form
questionnaire with branching logic. The application should be built using Typescript for both
frontend and backend development. React will be used for the frontend, while NodeJS will serve as
the backend. Data will be stored and retrieved from a MySQL database. Additionally, unit tests
should be implemented to ensure the functionality and reliability of the application.

Requirements:

1. Frontend Development (React):
• Create a React application with Typescript. ✅
• Design and implement a form questionnaire with the following fields:
• Name✅
• Age✅
• Gender✅
• Health Condition (Dropdown: Healthy, Minor illness, Chronic illness)✅
• Have you experienced any symptoms in the last 14 days? (Yes/No)✅
• If yes, list the symptoms experienced (if applicable)✅
• Implement branching logic based on user responses:
• If the user selects "Chronic illness" in the Health Condition field, additional
questions related to their condition should be displayed.✅
• If the user selects "Yes" to experiencing symptoms, additional questions
related to their symptoms should be displayed.✅
• Ensure validation for required fields and appropriate error handling.✅

2. Backend Development (NodeJS):
• Develop a RESTful API using NodeJS and Typescript to handle form submissions.
• Create endpoints for:
• Submitting a new questionnaire entry.
• Retrieving all questionnaire entries.✅
• Implement data validation and sanitization on the server-side.

3. Database (MySQL):
• Set up a MySQL database to store questionnaire entries.✅
• Design a schema to accommodate the questionnaire fields.✅
• Establish a connection between the NodeJS backend and the MySQL database.✅

4. Unit Testing:
• Write unit tests for both frontend and backend components.
• Test each component's functionality, including form validation, branching logic, API
endpoints, and database interactions.
• Utilize testing frameworks such as Jest for frontend and backend tests.
Deliverables:
• A Git repository containing the source code for both frontend and backend components.
• Documentati