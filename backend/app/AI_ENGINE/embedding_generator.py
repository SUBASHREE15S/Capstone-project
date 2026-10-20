from sentence_transformers import SentenceTransformer

class EmbeddingGenerator:

    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    def generate_embedding(self, text):

        embedding = self.model.encode(text)

        return embedding.tolist()

    def generate_multiple_embeddings(self, requirements):

        embeddings = []

        for req in requirements:

            embeddings.append(
                self.generate_embedding(req)
            )

        return embeddings
