import random

def predict_subcellular_localization(sequence):
    """
    Predict the subcellular localization of a protein based on its sequence.
    """
    locations = ['Cytoplasm', 'Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Plasma Membrane']
    weights = [0.3, 0.2, 0.15, 0.1, 0.1, 0.15]
    
    # This is a simplified prediction and doesn't represent real localization predictions
    primary_location = random.choices(locations, weights=weights)[0]
    secondary_location = random.choice([loc for loc in locations if loc != primary_location])
    
    return {
        'primary_location': primary_location,
        'secondary_location': secondary_location,
        'primary_confidence': random.uniform(0.6, 0.9),
        'secondary_confidence': random.uniform(0.3, 0.6)
    }

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
localization = predict_subcellular_localization(sequence)
print(f"Primary Location: {localization['primary_location']} (Confidence: {localization['primary_confidence']:.2f})")
print(f"Secondary Location: {localization['secondary_location']} (Confidence: {localization['secondary_confidence']:.2f})")

