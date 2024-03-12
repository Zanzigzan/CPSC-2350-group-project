from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

import os
import requests

app = FastAPI()

load_dotenv()  # This loads the environment variables from the .env file

DEEPL_API_KEY = os.getenv("DEEPL_API_KEY")
url = "https://api-free.deepl.com/v2/"


class TextForTranslation(BaseModel):
    target_lang: str
    text: str


@app.get("/")
def root():
    return {"message": "It works but you should use POST method instead!"}


@app.post("/")
def translate(textForTranslation: TextForTranslation):
    target_lang = textForTranslation.target_lang
    text = textForTranslation.text
    
    
    headers = {
        'Authorization': f'DeepL-Auth-Key {DEEPL_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        "text": [text],
        "target_lang": target_lang
    }
    translate_url = url + "translate"
    
    
    try:
        response = requests.post(translate_url, headers=headers, json=data)
        response.raise_for_status()  # Raise an exception for HTTP error codes
        translations = response.json().get("translations")
        if translations:
            return translations[0]
        else:
            raise HTTPException(status_code=500, detail="No translations found in the response.")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))