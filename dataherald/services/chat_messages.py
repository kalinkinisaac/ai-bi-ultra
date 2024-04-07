from dataherald.repositories.chat_messages import (
    ChatMessageNotFoundError,
    ChatMessageRepository,
)

from dataherald.types import LLMConfig, ChatMessage, Prompt, Chat, NLGeneration


class ChatMessageError(Exception):
    pass


class ChatMessageService:
    def __init__(self, storage):
        self.storage = storage
        self.chat_message_repository = ChatMessageRepository(storage)

    def create(
            self,
    ) -> ChatMessage:
        initial_chat_message = ChatMessage()
        return self.chat_message_repository.insert(initial_chat_message)

    def from_prompt(self, prompt: Prompt, chat: Chat) -> ChatMessage:
        chat_message = ChatMessage(
            chat_id=chat.id,
            role="user",
            content=prompt.text,
            created_at=prompt.created_at,
        )
        return self.chat_message_repository.insert(chat_message)

    def from_nl_generation(self, nl_generation: NLGeneration, chat: Chat) -> ChatMessage:
        chat_message = ChatMessage(
            chat_id=chat.id,
            role="assistant",
            content=nl_generation.text,
            created_at=nl_generation.created_at,
        )
        return self.chat_message_repository.insert(chat_message)

    def get(self, query) -> list[ChatMessage]:
        return self.chat_message_repository.find_by(query)

    def update_metadata(self, chat_message_id, metadata_request) -> ChatMessage:
        chat_message = self.chat_message_repository.find_by_id(chat_message_id)
        if not chat_message:
            raise ChatMessageNotFoundError(
                f"NL generation {chat_message_id} not found"
            )
        chat_message.metadata = metadata_request.metadata
        return self.chat_message_repository.update(chat_message)
