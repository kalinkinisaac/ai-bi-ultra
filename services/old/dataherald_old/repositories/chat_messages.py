from bson.objectid import ObjectId

from dataherald.types import ChatMessage

DB_COLLECTION = "chat_messages"


class ChatMessageNotFoundError(Exception):
    pass


class ChatMessageRepository:
    def __init__(self, storage):
        self.storage = storage

    def insert(self, chat_message: ChatMessage) -> ChatMessage:
        chat_message_dict = chat_message.dict(exclude={"id"})
        chat_message.id = str(self.storage.insert_one(DB_COLLECTION, chat_message_dict))
        return chat_message

    def find_one(self, query: dict) -> ChatMessage | None:
        row = self.storage.find_one(DB_COLLECTION, query)
        if not row:
            return None
        row["id"] = str(row["_id"])
        return ChatMessage(**row)

    def find_by_id(self, id: str) -> ChatMessage | None:
        row = self.storage.find_one(DB_COLLECTION, {"_id": ObjectId(id)})
        if not row:
            return None
        row["id"] = str(row["_id"])
        return ChatMessage(**row)

    def find_by(self, query: dict, page: int = 0, limit: int = 0) -> list[ChatMessage]:
        if page > 0 and limit > 0:
            rows = self.storage.find(DB_COLLECTION, query, page=page, limit=limit)
        else:
            rows = self.storage.find(DB_COLLECTION, query)
        result = []
        for row in rows:
            row["id"] = str(row["_id"])
            result.append(ChatMessage(**row))
        return result

    def find_all(self) -> list[ChatMessage]:
        rows = self.storage.find_all(DB_COLLECTION)
        result = []
        for row in rows:
            obj = ChatMessage(**row)
            obj.id = str(row["_id"])
            result.append(obj)
        return result

    def update(self, chat_message: ChatMessage) -> ChatMessage:
        self.storage.update_or_create(
            DB_COLLECTION,
            {"_id": ObjectId(chat_message.id)},
            chat_message.dict(exclude={"id"}),
        )
        return chat_message
