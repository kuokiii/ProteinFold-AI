import random

def simulate_blast_results(query_sequence, num_results=5):
    """
    Simulate BLAST results for a given protein sequence.
    """
    amino_acids = 'ACDEFGHIKLMNPQRSTVWY'
    
    def generate_random_sequence(length):
        return ''.join(random.choice(amino_acids) for _ in range(length))
    
    def calculate_similarity(seq1, seq2):
        return sum(a == b for a, b in zip(seq1, seq2)) / len(seq1)
    
    results = []
    for i in range(num_results):
        length = len(query_sequence) + random.randint(-10, 10)
        hit_sequence = generate_random_sequence(length)
        similarity = calculate_similarity(query_sequence, hit_sequence[:len(query_sequence)])
        results.append({
            'hit_id': f'protein_{i+1}',
            'similarity': similarity,
            'sequence': hit_sequence
        })
    
    return sorted(results, key=lambda x: x['similarity'], reverse=True)

# Example usage
query = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
blast_results = simulate_blast_results(query)
for result in blast_results:
    print(f"Hit ID: {result['hit_id']}, Similarity: {result['similarity']:.2f}")
    print(f"Sequence: {result['sequence']}")
    print()

