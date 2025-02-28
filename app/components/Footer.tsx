"use client"

import Link from "next/link"
import { Instagram, Github, Linkedin, Heart } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-semibold mb-4 text-green-600">About ProteinFold AI</h3>
            <p className="text-sm text-gray-600">
              Revolutionizing protein structure prediction and drug discovery through advanced AI and molecular
              modeling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-600">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Predict", "Proteins", "About"].map((item, index) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-600">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: niruwu2006@gmail.com</p>
              <p>Phone: +917318876896</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-600">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/_kuoki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/kuokiii"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/kuoki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-gray-200 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            Made with <Heart className="text-green-600" size={16} /> by Nirupam Thapa a.k.a kuoki
            <span className="mx-2">•</span>© {currentYear} All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

