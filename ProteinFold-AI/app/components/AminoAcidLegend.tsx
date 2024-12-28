import React from 'react';

const aminoAcidColors = {
  'A': '#FF6B6B', // Alanine - Red
  'R': '#4ECDC4', // Arginine - Teal
  'N': '#45B7D1', // Asparagine - Light Blue
  'D': '#F9C74F', // Aspartic Acid - Yellow
  'C': '#FF9FF3', // Cysteine - Pink
  'E': '#43AA8B', // Glutamic Acid - Green
  'Q': '#F8961E', // Glutamine - Orange
  'G': '#90BE6D', // Glycine - Light Green
  'H': '#577590', // Histidine - Blue
  'I': '#277DA1', // Isoleucine - Dark Blue
  'L': '#9C89B8', // Leucine - Purple
  'K': '#F94144', // Lysine - Bright Red
  'M': '#F3722C', // Methionine - Dark Orange
  'F': '#43AA8B', // Phenylalanine - Teal Green
  'P': '#577590', // Proline - Steel Blue
  'S': '#90BE6D', // Serine - Lime Green
  'T': '#F9C74F', // Threonine - Gold
  'W': '#F8961E', // Tryptophan - Dark Yellow
  'Y': '#F94144', // Tyrosine - Crimson
  'V': '#4ECDC4', // Valine - Turquoise
  'B': '#FF9FF3', // Aspartic acid or Asparagine - Light Pink
  'J': '#277DA1', // Leucine or Isoleucine - Navy
  'O': '#F3722C', // Pyrrolysine - Burnt Orange
  'U': '#9C89B8', // Selenocysteine - Lavender
  'X': '#577590', // Unknown - Steel Blue
  'Z': '#43AA8B'  // Glutamic acid or Glutamine - Sea Green
};

const AminoAcidLegend: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Amino Acid Color Legend</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.entries(aminoAcidColors).map(([aa, color]) => (
          <div key={aa} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm text-gray-700">{aa} - {getAminoAcidName(aa)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function getAminoAcidName(code: string): string {
  const names: { [key: string]: string } = {
    'A': 'Alanine', 'R': 'Arginine', 'N': 'Asparagine', 'D': 'Aspartic Acid',
    'C': 'Cysteine', 'E': 'Glutamic Acid', 'Q': 'Glutamine', 'G': 'Glycine',
    'H': 'Histidine', 'I': 'Isoleucine', 'L': 'Leucine', 'K': 'Lysine',
    'M': 'Methionine', 'F': 'Phenylalanine', 'P': 'Proline', 'S': 'Serine',
    'T': 'Threonine', 'W': 'Tryptophan', 'Y': 'Tyrosine', 'V': 'Valine',
    'B': 'Aspartic acid or Asparagine', 'J': 'Leucine or Isoleucine',
    'O': 'Pyrrolysine', 'U': 'Selenocysteine', 'X': 'Unknown',
    'Z': 'Glutamic acid or Glutamine'
  };
  return names[code] || code;
}

export default AminoAcidLegend;

