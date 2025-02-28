def predict_secondary_structure(sequence):
    """
    Simple secondary structure prediction based on propensities.
    """
    helix_propensities = {'A': 1.4, 'E': 1.5, 'L': 1.2, 'M': 1.3, 'Q': 1.1}
    sheet_propensities = {'V': 1.6, 'I': 1.5, 'Y': 1.4, 'C': 1.2, 'F': 1.3}
    
    structure = []
    for aa in sequence:
        if aa in helix_propensities and helix_propensities[aa] > 1.1:
            structure.append('H')
        elif aa in sheet_propensities and sheet_propensities[aa] > 1.1:
            structure.append('E')
        else:
            structure.append('C')
    
    return ''.join(structure)

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
print(f"Predicted secondary structure: {predict_secondary_structure(sequence)}")

