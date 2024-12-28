import Header from '../components/Header'
import Footer from '../components/Footer'
import ClientPublicationsContent from '../components/ClientPublicationsContent'

export default function Publications() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header />
      <ClientPublicationsContent />
      <Footer />
    </div>
  )
}

