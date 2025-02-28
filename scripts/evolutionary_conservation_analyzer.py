import random

def analyze_evolutionary_conservation(sequence, num_species=5):
    """
    Analyze the evolutionary conservation of a protein sequence across species.
    """
    species = ['Human', 'Mouse', 'Zebrafish', 'Fruit fly', 'Yeast', 'E. coli', 'Arabidopsis']
    conservation_scores = []
    
    for i, aa in enumerate(sequence):
        # Simulate conservation scores for each position
        scores = [random.uniform(0, 1) for _ in range(num_species)]
        avg_score = sum(scores) / len(scores)
        conservation_scores.append({
            'position': i + 1,
            'amino_acid': aa,
            'conservation_score': avg_score,
            'species_scores': dict(zip(random.sample(species, num_species), scores))
        })
    
    return conservation_scores

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
conservation_analysis = analyze_evolutionary_conservation(sequence)

print("Evolutionary Conservation Analysis:")
for position in conservation_analysis:
    print(f"Position {position['position']} ({position['amino_acid']}):")
    print(f"  Overall conservation score: {position['conservation_score']:.2f}")
    print("  Species-specific scores:")
    for species, score in position['species_scores'].items():
        print(f"    {species}: {score:.2f}")
    print()

