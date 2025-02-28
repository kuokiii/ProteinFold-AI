def calculate_molecular_weight(sequence):
    """
    Calculate the molecular weight of a protein sequence.
    """
    weights = {
        'A': 71.07, 'C': 103.10, 'D': 115.08, 'E': 129.11, 'F': 147.17,
        'G': 57.05, 'H': 137.14, 'I': 113.16, 'K': 128.17, 'L': 113.16,
        'M': 131.19, 'N': 114.10, 'P': 97.12, 'Q': 128.13, 'R': 156.19,
        'S': 87.07, 'T': 101.10, 'V': 99.13, 'W': 186.21, 'Y': 163.17
    }
    return sum(weights.get(aa, 0) for aa in sequence.upper())

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
print(f"Molecular weight: {calculate_molecular_weight(sequence):.2f} Da")

