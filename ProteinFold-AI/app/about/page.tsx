import Header from '../components/Header'
import Footer from '../components/Footer'
import ClientAboutContent from '../components/ClientAboutContent'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <Header />
      <ClientAboutContent />
      <Footer />
    </div>
  )
}

