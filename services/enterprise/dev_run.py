# main.py

import uvicorn

# @app.get("/")
# async def read_root():
#     return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=3001, workers=2, reload=True)
