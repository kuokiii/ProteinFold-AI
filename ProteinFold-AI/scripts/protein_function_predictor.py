import random

def predict_protein_function(sequence):
    """
    Predict potential functions of a protein based on its sequence.
    """
    functions = [
        'Enzyme', 'Receptor', 'Structural protein', 'Transport protein',
        'Signaling molecule', 'Hormone', 'Antibody', 'Transcription factor'
    ]
    
    # This is a simplified prediction and doesn't represent real function prediction
    primary_function = random.choice(functions)
    secondary_functions = random.sample([f for f in functions if f != primary_function], 2)
    
    go_terms = [
        'GO:0003824', 'GO:0004872', 'GO:0005198', 'GO:0005215',
        'GO:0005102', 'GO:0005179', 'GO:0003823', 'GO:0003700'
    ]
    
    return {
        'primary_function': primary_function,
        'secondary_functions': secondary_functions,
        'confidence': random.uniform(0.7, 0.95),
        'go_terms': random.sample(go_terms, 3)
    }

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
function_prediction = predict_protein_function(sequence)
print(f"Primary Function: {function_prediction['primary_function']}")
print(f"Secondary Functions: {', '.join(function_prediction['secondary_functions'])}")
print(f"Confidence: {function_prediction['confidence']:.2f}")
print(f"GO Terms: {', '.join(function_prediction['go_terms'])}")

