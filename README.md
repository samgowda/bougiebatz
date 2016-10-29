  ## Team
  Product Owner: Samantha Gowda
  Scrum Master: Jake Smith
  Development Team: Julia Randall, Nav Ghuman, Samantha Gowda, Jake Smith

  # VisualNews

  Visual News is a responsive web application for the visually minded. The vast majority of news sites take after the newspaper in terms of form and content with titles and abstracts. We turn tradition on its head and give users an image to interact with. was concieved and by a team of four full-stack software engineers: [Samantha Gowda](https://github.com/samgowda), [Jake Smith](https://github.com/jakesmith1), [Navkiran Ghuman](https://github.com/nghuman), and [Julia Randall](https://github.com/juliafrandall)

  #####[Visit the app](http://bougiebats.herokuapp.com/home)

  ## Tech Stack
  ![Tech Stack]()

  ## Architecture
  ![Architecture]()

  ## Features
  - General Features
    - User authentication for two user types: recruiters and applicants
    - RESTful API
    - Postgres relational database
  - Applicant Features
    - Browse posted jobs
      - Filter available jobs by keyword
    - Apply to jobs
    - Update already-sent applications
  - Recruiter Features
    - Recruiter dashboard
    - Post new jobs
    - Browse applicants by job
        - Filter by new, interested, or rejected applicants
    - Contact applicants

  ## Setup
  During development we have the server running on localhost port 8000, but before running locally, be sure to run:
  - `npm install` to install our dependencies
  - `npm install gulp -g` to make sure gulp is installed
  - `gulp start` to build the dist/ folder, start the server with nodemon, and to watch files for changes

  We used the [dotenv](https://github.com/bkeepers/dotenv) npm package to configure our development variables. Create a .env file in the root directory with the following variables and their values:
  - DATABASE_URL
  - DEV_DATABASE_URL
  - JWT_SECRET
  - MAILGUN_API_KEY
  - MAILGUN_DOMAIN

  ## Contributing
  Please refer to the [CONTRIBUTING.md](docs/CONTRIBUTING.md) file to see how to contribute to our project.

  ## Style Guide
  Please refer to the [STYLE-GUIDE.md](docs/STYLE-GUIDE.md) file to see our style guide.

  ## Testing
  For client-side testing we used mocha and chai, and for server-side testing we used mocha and chai along with [supertest](https://github.com/visionmedia/supertest). To run all tests run:
  ```
  gulp tests
  ```
  For server-side tests only, run:
  ```
  gulp serverTest
  ```
  For client-side tests only, run:
  ```
  gulp clientTest
  ```
  ## Styling
  All of our files and images used for styling are located in the `client/assets/` directory. If gulp is not already running, run gulp to copy images and compile scss into the `dist/` folder.

  ## Team
  We are a team of 4 full-stack software engineers. If you have any questions, please feel free to contact us!

  [Samantha Gowda](https://www.linkedin.com/in/samgowda) | [Github](https://github.com/samgowda)

  [Jake Smith](https://www.linkedin.com/in/jake-w-smith) |
  [Github](https://github.com/jakesmith1)

  [Navkiran Ghuman](https://www.linkedin.com/in/navkiranghuman) | [Github](https://github.com/nghuman)

  [Julia Randall](https://www.linkedin.com/in/juliafrandall) | [Github](https://github.com/juliafrandall)
