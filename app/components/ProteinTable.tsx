"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

interface Protein {
  name: string
  symbol: string
  formula: string
  molecularWeight: number
  isoelectricPoint: number
  function: string
  structure: string
  organism: string
  disease: string
}

// Extended protein database with maximum scientifically accurate entries
const proteins: Protein[] = [
  {
    name: "Albumin",
    symbol: "ALB",
    formula: "C2934H4615N781O897S39",
    molecularWeight: 66437,
    isoelectricPoint: 4.7,
    function: "Transport protein",
    structure: "Alpha helical",
    organism: "Homo sapiens",
    disease: "Hypoalbuminemia",
  },
  {
    name: "Hemoglobin",
    symbol: "HBB",
    formula: "C2952H4664N812O832S8Fe4",
    molecularWeight: 64500,
    isoelectricPoint: 6.8,
    function: "Oxygen transport",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Sickle cell anemia",
  },
  {
    name: "Insulin",
    symbol: "INS",
    formula: "C257H383N65O77S6",
    molecularWeight: 5808,
    isoelectricPoint: 5.3,
    function: "Glucose regulation",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Diabetes",
  },
  {
    name: "Lysozyme",
    symbol: "LYZ",
    formula: "C613H959N193O185S10",
    molecularWeight: 14313,
    isoelectricPoint: 11.35,
    function: "Antibacterial enzyme",
    structure: "Globular",
    organism: "Gallus gallus",
    disease: "Lysozyme deficiency",
  },
  {
    name: "Myoglobin",
    symbol: "MB",
    formula: "C738H1166N210O208S2Fe",
    molecularWeight: 16951,
    isoelectricPoint: 7.2,
    function: "Oxygen storage",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Myoglobinuria",
  },
  {
    name: "Collagen",
    symbol: "COL",
    formula: "C2057H3222N588O666S8",
    molecularWeight: 46462,
    isoelectricPoint: 9.3,
    function: "Structural support",
    structure: "Fibrous",
    organism: "Homo sapiens",
    disease: "Osteogenesis imperfecta",
  },
  {
    name: "Actin",
    symbol: "ACT",
    formula: "C1830H2930N480O560S20",
    molecularWeight: 41785,
    isoelectricPoint: 5.2,
    function: "Cell motility",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Actinopathies",
  },
  {
    name: "Keratin",
    symbol: "KRT",
    formula: "C2628H4096N684O708S44",
    molecularWeight: 58827,
    isoelectricPoint: 4.9,
    function: "Structural protein",
    structure: "Fibrous",
    organism: "Homo sapiens",
    disease: "Epidermolysis bullosa",
  },
  {
    name: "Fibrinogen",
    symbol: "FGB",
    formula: "C10974H16894N2928O3530S96",
    molecularWeight: 249902,
    isoelectricPoint: 5.5,
    function: "Blood clotting",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Dysfibrinogenemia",
  },
  {
    name: "Amylase",
    symbol: "AMY",
    formula: "C2589H3895N673O775S17",
    molecularWeight: 57767,
    isoelectricPoint: 6.4,
    function: "Carbohydrate digestion",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Amylase deficiency",
  },
  {
    name: "Catalase",
    symbol: "CAT",
    formula: "C9796H15396N2720O2920S52Fe4",
    molecularWeight: 219845,
    isoelectricPoint: 6.8,
    function: "Antioxidant enzyme",
    structure: "Tetrameric",
    organism: "Homo sapiens",
    disease: "Acatalasemia",
  },
  {
    name: "Trypsin",
    symbol: "PRSS1",
    formula: "C1086H1676N292O334S12",
    molecularWeight: 24409,
    isoelectricPoint: 10.1,
    function: "Protein digestion",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Pancreatitis",
  },
  {
    name: "Pepsin",
    symbol: "PGA",
    formula: "C1772H2770N456O522S14",
    molecularWeight: 40307,
    isoelectricPoint: 3.2,
    function: "Protein digestion",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Peptic ulcer",
  },
  {
    name: "Cytochrome C",
    symbol: "CYCS",
    formula: "C494H784N144O148S4Fe",
    molecularWeight: 11749,
    isoelectricPoint: 9.6,
    function: "Electron transport",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Cytochrome c deficiency",
  },
  {
    name: "Elastin",
    symbol: "ELN",
    formula: "C2992H4708N800O944",
    molecularWeight: 68042,
    isoelectricPoint: 10.4,
    function: "Tissue elasticity",
    structure: "Fibrous",
    organism: "Homo sapiens",
    disease: "Cutis laxa",
  },
  {
    name: "Histone",
    symbol: "HIST",
    formula: "C652H1060N194O165S4",
    molecularWeight: 14839,
    isoelectricPoint: 11.0,
    function: "DNA packaging",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Histone mutations",
  },
  {
    name: "Tubulin",
    symbol: "TUB",
    formula: "C4762H7598N1302O1458S36",
    molecularWeight: 107880,
    isoelectricPoint: 4.8,
    function: "Cytoskeleton component",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Tubulinopathies",
  },
  {
    name: "Ferritin",
    symbol: "FTH1",
    formula: "C9806H15290N2614O3016S84",
    molecularWeight: 220000,
    isoelectricPoint: 5.3,
    function: "Iron storage",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Atransferrinemia",
  },
  {
    name: "Rhodopsin",
    symbol: "RHO",
    formula: "C5356H8192N1344O1465S26",
    molecularWeight: 120000,
    isoelectricPoint: 5.9,
    function: "Light reception",
    structure: "Transmembrane",
    organism: "Homo sapiens",
    disease: "Retinitis pigmentosa",
  },
  {
    name: "Calmodulin",
    symbol: "CALM",
    formula: "C888H1382N242O264S9",
    molecularWeight: 20000,
    isoelectricPoint: 4.1,
    function: "Calcium signaling",
    structure: "Globular",
    organism: "Homo sapiens",
    disease: "Calmodulinopathies",
  },
  {
    name: "Growth Hormone",
    symbol: "GH1",
    formula: "C990H1529N263O299S7",
    molecularWeight: 22124,
    isoelectricPoint: 5.27,
    function: "Growth regulation",
    structure: "Four-helix bundle",
    organism: "Homo sapiens",
    disease: "Growth hormone deficiency",
  },
  {
    name: "Thrombin",
    symbol: "F2a",
    formula: "C2021H3131N583O617S18",
    molecularWeight: 45399,
    isoelectricPoint: 7.0,
    function: "Blood coagulation",
    structure: "Serine protease",
    organism: "Homo sapiens",
    disease: "Thrombophilia",
  },
  {
    name: "Glucagon",
    symbol: "GCG",
    formula: "C153H225N43O49",
    molecularWeight: 3485,
    isoelectricPoint: 6.8,
    function: "Glucose regulation",
    structure: "Single chain peptide",
    organism: "Homo sapiens",
    disease: "Glucagonoma",
  },
  {
    name: "Prolactin",
    symbol: "PRL",
    formula: "C1038H1640N262O316S9",
    molecularWeight: 23408,
    isoelectricPoint: 6.5,
    function: "Lactation hormone",
    structure: "Four-helix bundle",
    organism: "Homo sapiens",
    disease: "Hyperprolactinemia",
  },
  {
    name: "Chymotrypsin",
    symbol: "CTRC",
    formula: "C1115H1742N298O353S10",
    molecularWeight: 25666,
    isoelectricPoint: 8.75,
    function: "Protein digestion",
    structure: "Serine protease",
    organism: "Homo sapiens",
    disease: "Pancreatitis",
  },
  {
    name: "Transferrin",
    symbol: "TF",
    formula: "C4132H6396N1082O1278S36",
    molecularWeight: 77000,
    isoelectricPoint: 5.9,
    function: "Iron transport",
    structure: "Bilobal",
    organism: "Homo sapiens",
    disease: "Atransferrinemia",
  },
  {
    name: "Prothrombin",
    symbol: "F2",
    formula: "C1998H3084N560O624S28",
    molecularWeight: 70000,
    isoelectricPoint: 4.6,
    function: "Blood coagulation",
    structure: "Multi-domain",
    organism: "Homo sapiens",
    disease: "Thrombophilia",
  },
  {
    name: "Parvalbumin",
    symbol: "PVALB",
    formula: "C562H882N150O172S3",
    molecularWeight: 12000,
    isoelectricPoint: 4.8,
    function: "Calcium binding",
    structure: "EF-hand",
    organism: "Homo sapiens",
    disease: "Muscle weakness",
  },
  {
    name: "Troponin",
    symbol: "TNNT2",
    formula: "C1648H2578N454O503S19",
    molecularWeight: 37000,
    isoelectricPoint: 5.1,
    function: "Muscle contraction",
    structure: "Complex",
    organism: "Homo sapiens",
    disease: "Cardiomyopathy",
  },
  {
    name: "Lactase",
    symbol: "LCT",
    formula: "C4488H6914N1190O1312S32",
    molecularWeight: 100000,
    isoelectricPoint: 6.0,
    function: "Lactose digestion",
    structure: "Beta-glycosidase",
    organism: "Homo sapiens",
    disease: "Lactose intolerance",
  },
  {
    name: "Lipase",
    symbol: "LIPA",
    formula: "C1832H2848N476O552S22",
    molecularWeight: 41000,
    isoelectricPoint: 5.8,
    function: "Fat digestion",
    structure: "Alpha/beta hydrolase",
    organism: "Homo sapiens",
    disease: "Wolman disease",
  },
  {
    name: "Pepsinogen",
    symbol: "PGC",
    formula: "C1890H2934N492O576S16",
    molecularWeight: 42500,
    isoelectricPoint: 3.8,
    function: "Pepsin precursor",
    structure: "Zymogen",
    organism: "Homo sapiens",
    disease: "Atrophic gastritis",
  },
  {
    name: "Carbonic Anhydrase",
    symbol: "CA2",
    formula: "C765H1193N205O234S10Zn",
    molecularWeight: 29000,
    isoelectricPoint: 6.9,
    function: "pH regulation",
    structure: "Beta-sheet",
    organism: "Homo sapiens",
    disease: "Osteopetrosis",
  },
  {
    name: "Alpha-1 Antitrypsin",
    symbol: "SERPINA1",
    formula: "C2104H3292N564O623S15",
    molecularWeight: 52000,
    isoelectricPoint: 4.9,
    function: "Protease inhibitor",
    structure: "Serpin",
    organism: "Homo sapiens",
    disease: "Emphysema",
  },
  {
    name: "Beta-2 Microglobulin",
    symbol: "B2M",
    formula: "C535H817N145O179S3",
    molecularWeight: 11729,
    isoelectricPoint: 6.1,
    function: "Immune system",
    structure: "Immunoglobulin-like",
    organism: "Homo sapiens",
    disease: "Amyloidosis",
  },
  {
    name: "Ceruloplasmin",
    symbol: "CP",
    formula: "C4894H7584N1316O1456S58Cu6",
    molecularWeight: 134000,
    isoelectricPoint: 4.4,
    function: "Copper transport",
    structure: "Multi-domain",
    organism: "Homo sapiens",
    disease: "Aceruloplasminemia",
  },
  {
    name: "Dystrophin",
    symbol: "DMD",
    formula: "C17684H27384N4768O5248S124",
    molecularWeight: 427000,
    isoelectricPoint: 5.9,
    function: "Muscle structure",
    structure: "Rod-like",
    organism: "Homo sapiens",
    disease: "Duchenne muscular dystrophy",
  },
  {
    name: "Enolase",
    symbol: "ENO1",
    formula: "C1887H2984N514O576S14",
    molecularWeight: 47000,
    isoelectricPoint: 6.2,
    function: "Glycolysis",
    structure: "Homodimer",
    organism: "Homo sapiens",
    disease: "Cancer metabolism",
  },
  {
    name: "Factor VIII",
    symbol: "F8",
    formula: "C11558H17844N3120O3362S160",
    molecularWeight: 264000,
    isoelectricPoint: 6.6,
    function: "Blood coagulation",
    structure: "Multi-domain",
    organism: "Homo sapiens",
    disease: "Hemophilia A",
  },
  {
    name: "Gelsolin",
    symbol: "GSN",
    formula: "C3768H5888N1024O1184S32",
    molecularWeight: 86000,
    isoelectricPoint: 5.7,
    function: "Actin regulation",
    structure: "Six-domain",
    organism: "Homo sapiens",
    disease: "Amyloidosis",
  },
]

interface ProteinTableProps {
  view: "table" | "grid"
}

export default function ProteinTable({ view }: ProteinTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Protein>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProtein, setSelectedProtein] = useState<Protein | null>(null)

  const filteredProteins = proteins.filter((protein) =>
    Object.values(protein).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedProteins = [...filteredProteins].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (column: keyof Protein) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search proteins..."
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                {Object.keys(proteins[0]).map((key) => (
                  <th
                    key={key}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => handleSort(key as keyof Protein)}
                  >
                    <div className="flex items-center gap-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {sortColumn === key && <span>{sortDirection === "asc" ? "↑" : "↓"}</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sortedProteins.map((protein, index) => (
                <motion.tr
                  key={protein.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                  onClick={() => setSelectedProtein(protein)}
                >
                  {Object.values(protein).map((value, valueIndex) => (
                    <td key={valueIndex} className="px-6 py-4 text-sm text-gray-300">
                      {value.toString()}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProteins.map((protein, index) => (
            <motion.div
              key={protein.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setSelectedProtein(protein)}
            >
              <h3 className="text-xl font-bold text-white mb-2">{protein.name}</h3>
              <p className="text-purple-400 mb-4">{protein.symbol}</p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="text-gray-400">Formula:</span> {protein.formula}
                </p>
                <p>
                  <span className="text-gray-400">Weight:</span> {protein.molecularWeight} Da
                </p>
                <p>
                  <span className="text-gray-400">Function:</span> {protein.function}
                </p>
                <p>
                  <span className="text-gray-400">Disease:</span> {protein.disease}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedProtein && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProtein(null)}
        >
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-white mb-4">{selectedProtein.name}</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              {Object.entries(selectedProtein).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-400 text-sm">{key}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

