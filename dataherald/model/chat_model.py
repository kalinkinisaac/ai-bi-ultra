from typing import Any

from langchain_community.chat_models import ChatAnthropic, ChatCohere, ChatGooglePalm, FakeListChatModel
from langchain_openai import ChatOpenAI
from overrides import override

from dataherald.model import LLMModel
from dataherald.sql_database.models.types import DatabaseConnection


class ChatModel(LLMModel):
    def __init__(self, system):
        super().__init__(system)

    @override
    def get_model(
        self,
        database_connection: DatabaseConnection,
        model_family="openai",
        model_name="gpt-4-turbo-preview",
        api_base: str | None = None,
        **kwargs: Any
    ) -> Any:
        api_key = database_connection.decrypt_api_key()
        # api_base = 'http://host.docker.internal:1234/v1'
        # model_name = 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF'
        # api_base = 'https://api.pawan.krd/v1'
        # model_name = 'pai-001'
        # api_key = 'pk-meRIymsVyHPLFNYJOEfpNgUyoeyJXaHMRldSHbghHWIduOjt'
        if model_family == "openai":
            return ChatOpenAI(
                model_name=model_name,
                openai_api_key=api_key,
                openai_api_base=api_base,
                seed=0,
                default_query=dict(provider="Liaobots"),
                # model_kwargs=dict(provider="Liaobots"),
                **kwargs
            )
        if model_family == "anthropic":
            return ChatAnthropic(
                model_name=model_name, anthropic_api_key=api_key, **kwargs
            )
        if model_family == "google":
            return ChatGooglePalm(
                model_name=model_name, google_api_key=api_key, **kwargs
            )
        if model_family == "cohere":
            return ChatCohere(model_name=model_name, cohere_api_key=api_key, **kwargs)
        if model_family == "fake":
            # return FakeListChatModel(model_name=model_name, responses=["Thought: I now know the final answer\nFinal Answer: да забей)"]*100,**kwargs)
            return FakeListChatModel(model_name=model_name, responses=[
                """Thought: hmm Action: ValidateChartParamsAndSendItToUserTool
Action Input: ["2020-09-07", "2020-11-26", "2020-12-04", "2020-12-08", "2021-01-06", "2021-02-17", "2021-02-27", "2021-03-10", "2021-03-14", "2021-03-24", "2021-04-28", "2021-05-14", "2021-05-17", "2021-06-08", "2021-08-26", "2021-09-16", "2021-10-16", "2021-10-20", "2021-11-01", "2021-11-25", "2021-12-11", "2021-12-29", "2022-01-03", "2022-01-15", "2022-01-23", "2022-02-06", "2022-02-28", "2022-03-06", "2022-03-19", "2022-03-20", "2022-03-26", "2022-03-28", "2022-04-01", "2022-04-09", "2022-04-12", "2022-04-14", "2022-04-21", "2022-04-22", "2022-05-13", "2022-05-24", "2022-06-04", "2022-06-21", "2022-06-22", "2022-06-24", "2022-06-27", "2022-07-01", "2022-07-05", "2022-07-07", "2022-07-08", "2022-07-18"], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
""",
                """Final answer: ok"""
            ], **kwargs)
        raise ValueError("No valid API key environment variable found")
