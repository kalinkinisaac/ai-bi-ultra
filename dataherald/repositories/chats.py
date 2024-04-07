from bson.objectid import ObjectId

from dataherald.types import Chat

DB_COLLECTION = "chats"


class ChatNotFoundError(Exception):
    pass


class ChatRepository:
    def __init__(self, storage):
        self.storage = storage

    def insert(self, chat: Chat) -> Chat:
        chat_dict = chat.dict(exclude={"id"})
        chat.id = str(self.storage.insert_one(DB_COLLECTION, chat_dict))
        return chat

    def find_one(self, query: dict) -> Chat | None:
        row = self.storage.find_one(DB_COLLECTION, query)
        if not row:
            return None
        row["id"] = str(row["_id"])
        return Chat(**row)

    def find_by_id(self, id: str) -> Chat | None:
        row = self.storage.find_one(DB_COLLECTION, {"_id": ObjectId(id)})
        if not row:
            return None
        row["id"] = str(row["_id"])
        return Chat(**row)

    def find_by(self, query: dict, page: int = 0, limit: int = 0) -> list[Chat]:
        if page > 0 and limit > 0:
            rows = self.storage.find(DB_COLLECTION, query, page=page, limit=limit)
        else:
            rows = self.storage.find(DB_COLLECTION, query)
        result = []
        for row in rows:
            row["id"] = str(row["_id"])
            result.append(Chat(**row))
        return result

    def find_all(self) -> list[Chat]:
        rows = self.storage.find_all(DB_COLLECTION)
        result = []
        for row in rows:
            obj = Chat(**row)
            obj.id = str(row["_id"])
            result.append(obj)
        return result

    def update(self, chat: Chat) -> Chat:
        self.storage.update_or_create(
            DB_COLLECTION,
            {"_id": ObjectId(chat.id)},
            chat.dict(exclude={"id"}),
        )
        return chat
