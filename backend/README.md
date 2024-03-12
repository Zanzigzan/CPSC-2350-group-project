# Fluentify Backend

## Set Up
In order to use the backend, you need to have:
- Python installed (You can check if you already have it by running `python3 --version` or `python --version` depending on your operating system)
- A proper `.env` file in the backend folder
- All of the necessary packages installed by running:
`pip install fastapi uvicorn pydantic python-dotenv requests`

## How to Use
1. Move in your terminal to the backend folder and use the command:
uvicorn main:app

2. Now you should be able to send REST API requests using:
- METHOD: `POST`
- URL: `http://127.0.0.1:8000/`
- Header: `"Content-Type": "application/json"`
- Body:
  ```json
  {
      "detected_source_language": "DE",
      "text": "Hello, World!"
  }
  ```