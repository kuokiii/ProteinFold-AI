def generate_hydropathy_profile(sequence, window_size=7):
    """
    Generate a hydropathy profile for a protein sequence.
    """
    hydropathy_values = {
        'A': 1.8, 'C': 2.5, 'D': -3.5, 'E': -3.5, 'F': 2.8,
        'G': -0.4, 'H': -3.2, 'I': 4.5, 'K': -3.9, 'L': 3.8,
        'M': 1.9, 'N': -3.5, 'P': -1.6, 'Q': -3.5, 'R': -4.5,
        'S': -0.8, 'T': -0.7, 'V': 4.2, 'W': -0.9, 'Y': -1.3
    }
    
    profile = []
    for i in range(len(sequence) - window_size + 1):
        window = sequence[i:i+window_size]
        avg_hydropathy = sum(hydropathy_values[aa] for aa in window) / window_size
        profile.append(avg_hydropathy)
    
    return profile

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
profile = generate_hydropathy_profile(sequence)
print(f"Hydropathy profile: {profile}")

