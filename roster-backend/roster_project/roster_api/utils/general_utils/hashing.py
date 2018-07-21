import hashlib

from roster_api.constants.hash_constants import hashing_constants


class HashingUtil():
    """ Class containing hashing methods """

    @classmethod
    def generate_unique_hash(username: str, month: int, year: int):
        """
            This method is used to generate the hash which is to be used as the
            search parameter for the roster of a particular user for a
            particular month and year. The hash value of the string made by
            concatinating username month and year is generated.
        """
        _to_be_hashed = username + str(month) + str(year)
        _hashed_value = hashlib.sha256(_to_be_hashed.encode()).hexdigest()

        if len(_hashed_value) > hashing_constants.MAX_HASH_LENGTH:
            _hashed_value = _hashed_value[0:hashing_constants.MAX_HASH_LENGTH]

        return _hashed_value
