# Tangent assignment - front end interface

# Installation

```
git clone https://github.com/bdelate/tangent-frontend.git
cd frontend
npm install
```
# Running the application

First make sure the backend API [found here](https://github.com/bdelate/tangent-backend) is running, then:

```
npm start
Browser url: http://localhost:3000/
```

# Screenshots
### Login Screen

![Alt text](/frontend/screenshots/login.png?raw=true "Login Screen")

### Employee Update
Non managers only have access to their own profiles. They are not permitted to change their own salary or rank.

![Alt text](/frontend/screenshots/nonmanager.png?raw=true "Non manager profile")

### Manager - Employee Update or Delete
Managers can update or delete other employee profiles.

![Alt text](/frontend/screenshots/manager.png?raw=true "Manager profile update")

### Employee Creation
Managers are able to create new employees.

![Alt text](/frontend/screenshots/create.png?raw=true "Manager employee creation")
