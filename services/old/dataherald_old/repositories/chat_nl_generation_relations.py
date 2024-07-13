from bson.objectid import ObjectId

from dataherald.types import ChatNLGenerationRelation

DB_COLLECTION = "chat_nl_generation_relations"


class ChatNLGenerationRelationNotFoundError(Exception):
    pass


class ChatNLGenerationRelationRepository:
    def __init__(self, storage):
        self.storage = storage

    def insert(self, chat_nl_generation_relations: ChatNLGenerationRelation) -> ChatNLGenerationRelation:
        chat_nl_generation_relations_dict = chat_nl_generation_relations.dict(exclude={"id"})
        chat_nl_generation_relations.id = str(self.storage.insert_one(DB_COLLECTION, chat_nl_generation_relations_dict))
        return chat_nl_generation_relations

    def find_one(self, query: dict) -> ChatNLGenerationRelation | None:
        row = self.storage.find_one(DB_COLLECTION, query)
        if not row:
            return None
        row["id"] = str(row["_id"])
        return ChatNLGenerationRelation(**row)

    def find_by_id(self, id: str) -> ChatNLGenerationRelation | None:
        row = self.storage.find_one(DB_COLLECTION, {"_id": ObjectId(id)})
        if not row:
            return None
        row["id"] = str(row["_id"])
        return ChatNLGenerationRelation(**row)

    def find_by(self, query: dict, page: int = 0, limit: int = 0) -> list[ChatNLGenerationRelation]:
        if page > 0 and limit > 0:
            rows = self.storage.find(DB_COLLECTION, query, page=page, limit=limit)
        else:
            rows = self.storage.find(DB_COLLECTION, query)
        result = []
        for row in rows:
            row["id"] = str(row["_id"])
            result.append(ChatNLGenerationRelation(**row))
        return result

    def update(self, chat_nl_generation_relations: ChatNLGenerationRelation) -> ChatNLGenerationRelation:
        self.storage.update_or_create(
            DB_COLLECTION,
            {"_id": ObjectId(chat_nl_generation_relations.id)},
            chat_nl_generation_relations.dict(exclude={"id"}),
        )
        return chat_nl_generation_relations
