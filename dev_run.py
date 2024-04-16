# main.py

import uvicorn
import dataherald
import dataherald.config
from dataherald.app import app



# @app.get("/")
# async def read_root():
#     return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
