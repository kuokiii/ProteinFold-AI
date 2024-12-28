import Header from '../components/Header'
import Footer from '../components/Footer'
import ClientResultsContent from '../components/ClientResultsContent'

export default function Results() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <ClientResultsContent />
      <Footer />
    </div>
  )
}

