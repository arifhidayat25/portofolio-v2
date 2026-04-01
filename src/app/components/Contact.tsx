import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format nomor WA (hapus semua karakter kecuali angka)
    // contactInfo[1] adalah Phone di array contactInfo
    const phoneNumber = contactInfo[1].value.replace(/\D/g, "");
    
    // Siapkan pesan template
    const textMessage = `Halo!\nSaya ingin berdiskusi mengenai projek.\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`;
    
    // Buat link WA
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;
    
    // Arahkan ke WhatsApp
    window.open(waUrl, '_blank');
    
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'achmadarifh25@gmail.com',
      color: 'from-cyan-500 to-pink-500',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+62-859-4255-0791',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Malang, Indonesia',
      color: 'from-green-500 to-teal-500',
    },
  ];

  const socialLinks = [
    { icon: <Github size={24} />, url: 'https://github.com/arifhidayat25', color: 'hover:text-gray-800' },
    { icon: <Linkedin size={24} />, url: 'https://linkedin.com/in/arifhidayat25', color: 'hover:text-blue-600' },
    { icon: <Instagram size={24} />, url: 'https://instagram.com/arifhidayat.25', color: 'hover:text-pink-600' },
  ];

  return (
    <section id="kontak" className="min-h-screen py-20 bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-[#030213] dark:to-[#030213]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Hubungi Saya
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Mari berdiskusi tentang projek Anda selanjutnya
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                  Mari Terhubung
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  Saya terbuka untuk peluang kerja sama baru dan projek yang menarik. 
                  Jangan ragu untuk menghubungi saya!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-transparent dark:border-gray-800"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{info.title}</p>
                      <p className="text-gray-800 dark:text-gray-100 font-semibold">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 font-medium">Follow Me:</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg border border-transparent dark:border-gray-800">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-300"
                    placeholder="Nama Anda"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  <span>Kirim Pesan</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
