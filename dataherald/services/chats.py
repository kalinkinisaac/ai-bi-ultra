import uuid

from dataherald.repositories.chats import (
    ChatNotFoundError,
    ChatRepository,
)

from dataherald.types import LLMConfig, Chat


class ChatError(Exception):
    pass


class ChatService:
    def __init__(self, storage):
        self.storage = storage
        self.chat_repository = ChatRepository(storage)

    def create(
        self,
    ) -> Chat:
        initial_chat = Chat(title="Random name: {}".format(uuid.uuid4().hex))
        return self.chat_repository.insert(initial_chat)

    def get(self, query) -> list[Chat]:
        return self.chat_repository.find_by(query)

    def update_metadata(self, chat_id, metadata_request) -> Chat:
        chat = self.chat_repository.find_by_id(chat_id)
        if not chat:
            raise ChatNotFoundError(
                f"NL generation {chat_id} not found"
            )
        chat.metadata = metadata_request.metadata
        return self.chat_repository.update(chat)
