import random

def predict_protein_drug_interactions(sequence, num_drugs=5):
    """
    Predict potential interactions between a protein and various drugs.
    """
    drugs = [
        'Aspirin', 'Ibuprofen', 'Metformin', 'Lisinopril', 'Levothyroxine',
        'Amlodipine', 'Metoprolol', 'Albuterol', 'Gabapentin', 'Sertraline'
    ]
    
    interaction_types = ['Binding', 'Inhibition', 'Activation', 'Allosteric modulation']
    
    interactions = []
    for _ in range(num_drugs):
        drug = random.choice(drugs)
        interaction = {
            'drug': drug,
            'interaction_type': random.choice(interaction_types),
            'binding_affinity': random.uniform(1e-9, 1e-6),
            'effect_strength': random.uniform(0, 1),
            'confidence': random.uniform(0.5, 0.95)
        }
        interactions.append(interaction)
    
    return sorted(interactions, key=lambda x: x['confidence'], reverse=True)

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
drug_interactions = predict_protein_drug_interactions(sequence)

print("Predicted Protein-Drug Interactions:")
for interaction in drug_interactions:
    print(f"Drug: {interaction['drug']}")
    print(f"Interaction Type: {interaction['interaction_type']}")
    print(f"Binding Affinity: {interaction['binding_affinity']:.2e} M")
    print(f"Effect Strength: {interaction['effect_strength']:.2f}")
    print(f"Confidence: {interaction['confidence']:.2f}")
    print()

