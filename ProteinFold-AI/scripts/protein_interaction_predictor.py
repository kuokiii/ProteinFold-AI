import random

def predict_protein_interactions(sequence, num_interactions=5):
    """
    Predict potential protein-protein interactions.
    """
    interaction_partners = [
        "Cytochrome C", "Hemoglobin", "Insulin", "Albumin", "Collagen",
        "Actin", "Myosin", "Tubulin", "Histone", "Ubiquitin"
    ]
    
    interactions = []
    for _ in range(num_interactions):
        partner = random.choice(interaction_partners)
        confidence = random.uniform(0.5, 1.0)
        interactions.append({
            'partner': partner,
            'confidence': confidence,
            'interaction_type': random.choice(['Binding', 'Phosphorylation', 'Ubiquitination'])
        })
    
    return sorted(interactions, key=lambda x: x['confidence'], reverse=True)

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
interactions = predict_protein_interactions(sequence)
for interaction in interactions:
    print(f"Partner: {interaction['partner']}")
    print(f"Confidence: {interaction['confidence']:.2f}")
    print(f"Interaction Type: {interaction['interaction_type']}")
    print()

