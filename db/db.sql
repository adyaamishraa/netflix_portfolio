CREATE DATABASE portfolio_ai;

-- Purpose: Stores all your portfolio projects. Chatbot can summarize or describe a project when asked.
CREATE TABLE projects (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    tech_used VARCHAR(100) NOT NULL,
    github_link VARCHAR(100) NOT NULL
);

-- id 1, title: img enhancer, desc : Ai powered, tech_used: React, github_link:
-- id 2, title: Restaurant Menu , desc : Full stack, tech_used: PERN , github_link:






-- Purpose: Stores your personal info that chatbot can read when someone asks “tell me about you”.
CREATE TABLE about_me (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    bio TEXT NOT NULL,
    skills VARCHAR(200) NOT NULL
);

-- id 1, name: Adya , bio : software developer , skills: PERN developer
-- id 2, name: Atharv , bio : data scientist , skills: MERN developer







-- Purpose: Stores the techs you know. Chatbot can answer “what tech do you use?”
CREATE TABLE tech_stack(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL, -- technology name (React/ Node/ PostgreSQL…)
    category VARCHAR(50) NOT NULL, -- e.g., frontend/ backend/ database, etc.
    description TEXT NOT NULL
);

-- id 1, name: React, category: frontend, description: A JavaScript library for building user interfaces.
-- id 2, name: Node.js, category: backend, description: A JavaScript runtime built on Chrome's V8 JavaScript engine.













-- Purpose: Stores user information for authentication and profile management.
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE ,
    password VARCHAR(100) NOT NULL
);




INSERT INTO projects (title, description, tech_used, github_link) VALUES
('Image Enhancer', 'AI-powered image enhancement tool that improves image quality using API key', 'React', 'https://github.com/adyaamishraa/proj-6'),
('Restaurant Menu', 'Full-stack restaurant menu application built with PERN stack', 'PostgreSQL, Express, React, Node.js', 'https://github.com/adyaamishraa/FULL-STACK-WEBSITE');


INSERT INTO about_me (name, bio, skills) VALUES
('Adya Mishra', 'Software developer with a passion for building web applications.', 'PERN stack developer, JavaScript, React, Node.js, PostgreSQL'),
('Atharv Tiwari', 'Data scientist with expertise in machine learning and data analysis.', 'MERN stack developer, Python, JavaScript, MongoDB, Express, React, Node.js');

INSERT INTO tech_stack (name, category, description) VALUES
('React', 'Frontend', 'A library to simplify usage of HTML, CSS, JavaScript.'),
('Node.js', 'Backend', 'Node.js is an open-source and cross-platform JavaScript runtime environment.');
