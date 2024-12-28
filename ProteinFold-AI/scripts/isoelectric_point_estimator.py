def estimate_isoelectric_point(sequence):
    """
    Estimate the isoelectric point of a protein sequence.
    """
    aa_pka = {
        'C': 8.3, 'D': 3.86, 'E': 4.07, 'H': 6.10,
        'K': 10.54, 'R': 12.48, 'Y': 10.46
    }
    
    def charge_at_ph(ph):
        return sum(
            1 / (1 + 10**(ph - aa_pka[aa])) 
            for aa in sequence if aa in aa_pka
        ) - sum(
            1 / (1 + 10**(aa_pka[aa] - ph)) 
            for aa in sequence if aa in 'DE'
        )
    
    # Binary search for pH where charge is closest to 0
    low, high = 0, 14
    while high - low > 0.01:
        mid = (low + high) / 2
        if charge_at_ph(mid) > 0:
            low = mid
        else:
            high = mid
    
    return (low + high) / 2

# Example usage
sequence = "MVLSEGEWQLVLHVWAKVEADVAGHGQDILIR"
print(f"Estimated isoelectric point: {estimate_isoelectric_point(sequence):.2f}")

