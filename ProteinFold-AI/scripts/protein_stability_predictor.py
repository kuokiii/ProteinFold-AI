import random

def predict_protein_stability(sequence):
    """
    Predict protein stability based on sequence properties.
    """
    # This is a simplified model and doesn't represent real stability predictions
    stability_factors = {
        'C': 1.5, 'W': 1.4, 'Y': 1.3, 'F': 1.2, 'H': 1.1,
        'R': 1.0, 'K': 0.9, 'D': 0.8, 'E': 0.7, 'S': 0.6
    }
    
    stability_score = sum(stability_factors.get(aa, 1.0) for aa in sequence) / len(sequence)
    melting_temp = 37 + (stability_score - 1) * 20 + random.uniform(-5, 5)
    
    return {
        'stability_score': stability_score,
        'predicted_melting_temp': melting_temp,
        'stability_category': 'High' if stability_score > 1.1 else 'Medium' if stability_score > 0.9 else 'Low'
    }

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
stability = predict_protein_stability(sequence)
print(f"Stability Score: {stability['stability_score']:.2f}")
print(f"Predicted Melting Temperature: {stability['predicted_melting_temp']:.2f}°C")
print(f"Stability Category: {stability['stability_category']}")

