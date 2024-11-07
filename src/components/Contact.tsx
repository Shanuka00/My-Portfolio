import { Mail, MessageSquare, Send, User } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-chocolate-accent/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-chocolate-primary slide-up">
            Connect with Shanuka
          </h2>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl slide-up card-hover">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="slide-in" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 pl-10 border rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-chocolate-primary focus:border-transparent transition-all duration-300"
                      required
                    />
                    <User className="w-5 h-5 text-chocolate-primary absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="slide-in" style={{ animationDelay: '300ms' }}>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 pl-10 border rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-chocolate-primary focus:border-transparent transition-all duration-300"
                      required
                    />
                    <Mail className="w-5 h-5 text-chocolate-primary absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="slide-in" style={{ animationDelay: '400ms' }}>
                <label className="block text-sm font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 pl-10 border rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-chocolate-primary focus:border-transparent transition-all duration-300"
                    required
                  />
                  <MessageSquare className="w-5 h-5 text-chocolate-primary absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="slide-in" style={{ animationDelay: '500ms' }}>
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-chocolate-primary focus:border-transparent transition-all duration-300"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-chocolate-primary text-[rgb(var(--color-background))] rounded-full hover:bg-chocolate-secondary transition-all duration-300 hover:scale-105 hover-lift flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}