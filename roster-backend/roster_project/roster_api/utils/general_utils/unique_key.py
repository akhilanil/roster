import uuid


class UniqueKeyUtil():
    """ Class containing hashing methods """

    @classmethod
    def generate_unique_key(self):
        """
            This method is used to generate the unique uuid key.
        """
        return str(uuid.uuid4())
