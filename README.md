# Foliance - Portfolio Builder

A full-stack web application for building and showcasing professional portfolios, built with React and Django.

## Features

- User Authentication with JWT
- Resume Builder
- Portfolio Management
- Blog System
- Career Timeline
- Skill Radar Chart
- File Upload System for Projects and Artifacts
- Responsive Design with Tailwind CSS

## Tech Stack

### Frontend
- React
- Redux for State Management
- React Router for Navigation
- Tailwind CSS for Styling
- Axios for API Communication

### Backend
- Django
- Django REST Framework
- JWT Authentication
- PostgreSQL Database
- Media File Handling

## Project Structure

```
foliance/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store and slices
│   │   └── ...
│   └── ...
└── backend/           # Django backend application
    ├── users/        # User management
    ├── portfolio/    # Portfolio and resume features
    ├── blog/         # Blog functionality
    ├── artifacts/    # Certificates and awards
    └── ...
```

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.8+
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/benbobyabraham/foliance.git
cd foliance
```

2. Set up the backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

3. Set up the frontend
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
python manage.py runserver
```

2. Start the frontend development server
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Interface: http://localhost:8000/admin

## API Endpoints

- `/api/users/` - User management
- `/api/token/` - JWT token obtain
- `/api/token/refresh/` - JWT token refresh
- `/api/resumes/` - Resume management
- `/api/experiences/` - Work experience
- `/api/education/` - Education history
- `/api/skills/` - Skills management
- `/api/projects/` - Portfolio projects
- `/api/posts/` - Blog posts
- `/api/comments/` - Blog comments
- `/api/artifacts/` - Certificates and awards

## License

MIT License
