# Fluentify backend

## Set up
In order to use the backend you have to have:
-python installed (You can check if you already have it by "python3 --version" or "python --version" depends on your operating system)
-have a proper .env file in the backend folder
-all of the nessesery packages installed by:
pip install fastapi
pip install uvicorn
pip install pydantic
pip install python-dotenv
pip install requests

## How to use
Move in your terminal to the backend folder and use command:
uvicorn main:app

Now you should be able to send POST REST requests using:
url:
http://127.0.0.1:8000/

header:
"Content-Type": "application/json"

body:
{
    "detected_source_language": "DE",
    "text": "Hello, World!"
}