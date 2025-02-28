import random

def predict_protein_disorder(sequence, window_size=9):
    """
    Predict disordered regions in a protein sequence.
    """
    disorder_propensities = {
        'A': 0.06, 'R': 0.18, 'N': 0.007, 'D': 0.192, 'C': -0.02,
        'Q': 0.318, 'E': 0.736, 'G': 0.166, 'H': 0.303, 'I': -0.486,
        'L': -0.326, 'K': 0.586, 'M': -0.397, 'F': -0.697, 'P': 0.987,
        'S': 0.341, 'T': 0.059, 'W': -0.884, 'Y': -0.510, 'V': -0.121
    }
    
    disorder_scores = []
    for i in range(len(sequence) - window_size + 1):
        window = sequence[i:i+window_size]
        score = sum(disorder_propensities.get(aa, 0) for aa in window) / window_size
        disorder_scores.append(score)
    
    # Normalize scores
    min_score, max_score = min(disorder_scores), max(disorder_scores)
    normalized_scores = [(score - min_score) / (max_score - min_score) for score in disorder_scores]
    
    disordered_regions = []
    in_disordered_region = False
    start = 0
    
    for i, score in enumerate(normalized_scores):
        if score > 0.5 and not in_disordered_region:
            start = i
            in_disordered_region = True
        elif score <= 0.5 and in_disordered_region:
            disordered_regions.append((start, i))
            in_disordered_region = False
    
    if in_disordered_region:
        disordered_regions.append((start, len(normalized_scores)))
    
    return disordered_regions

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIRLFKSHPETLEKFDRFKHLKTEAEMKASEDLKKHGVTVLTALGAILKKKGHHEAELKPLAQSHATKHKIPIKYLEFISEAIIHVLHSRHPGNFGADAQGAMNKALELFRKDIAAKYKELGYQG"
disordered_regions = predict_protein_disorder(sequence)
print("Predicted disordered regions:")
for start, end in disordered_regions:
    print(f"Region {start+1}-{end+1}")

