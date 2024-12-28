import re

def validate_protein_sequence(sequence):
    """
    Validate if the given sequence is a valid protein sequence.
    """
    valid_amino_acids = set('ACDEFGHIKLMNPQRSTVWY')
    sequence = sequence.upper()
    if not set(sequence).issubset(valid_amino_acids):
        return False
    return True

# Example usage
print(validate_protein_sequence("MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"))  # True
print(validate_protein_sequence("ABCDEFG"))  # False

