import dataherald
import dataherald.config
from dataherald.server.fastapi import FastAPI
import uvicorn




from fastapi import Depends
from starlette.middleware.cors import CORSMiddleware
from supertokens_python import init, get_all_cors_headers
from supertokens_python.framework.fastapi import get_middleware
from supertokens_python.recipe.session import SessionContainer
from supertokens_python.recipe.session.framework.fastapi import verify_session
# from dataherald.app_config import Settings

# settings = Settings()

from dataherald import app_config as config
init(
    supertokens_config=config.supertokens_config,
    app_info=config.app_info,
    framework=config.framework,
    recipe_list=config.recipe_list,
    mode="asgi",
)
settings = dataherald.config.Settings()
server = FastAPI(settings, middleware=get_middleware())
app = server.app()

# app = FastAPI(title="SuperTokens example")
# app.add_middleware(get_middleware())

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.app_info.website_domain],
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type"] + get_all_cors_headers(),
)

@app.get("/sessioninfo")
async def secure_api(s: SessionContainer = Depends(verify_session())):
    return {
        "sessionHandle": s.get_handle(),
        "userId": s.get_user_id(),
        "accessTokenPayload": s.get_access_token_payload(),
    }
from fastapi import Request
# Using FastAPI instance
@app.get("/url-list")
def get_all_urls():
    url_list = [{"path": route.path, "name": route.name} for route in app.routes]
    return url_list


# Using Request instance
@app.get("/url-list-from-request")
def get_all_urls_from_request(request: Request):
    url_list = [
        {"path": route.path, "name": route.name} for route in request.app.routes
    ]
    return url_list

# app = CORSMiddleware(
#     app=app,
#     allow_origins=[config.app_info.website_domain],
#     allow_credentials=True,
#     allow_methods=["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
#     allow_headers=["Content-Type"] + get_all_cors_headers(),
# )