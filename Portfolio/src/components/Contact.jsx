import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, MessageSquare, Clock } from 'lucide-react';

export default function Contact({ onShowToast }) {
  const [copiedType, setCopiedType] = useState(null);
  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (onShowToast) {
      onShowToast(`${type === 'email' ? 'Email address' : 'Phone number'} copied to clipboard!`);
    }
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Allows default submit to formsubmit.co or uses fetch
    // To provide the smoothest SPA experience, we submit via fetch:
    e.preventDefault();
    setFormStatus({ state: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('https://formsubmit.co/ajax/vishwakarmaranjit8109@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setFormStatus({
          state: 'success',
          message: 'Thank you! Your message has been transmitted successfully.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (onShowToast) {
          onShowToast('Message delivered! Ranjeet will respond shortly.');
        }
      } else {
        // Fallback
        setFormStatus({
          state: 'error',
          message: 'Could not send automatically. Please reach out directly via email.',
        });
      }
    } catch (err) {
      // Fallback submit
      setFormStatus({
        state: 'error',
        message: 'Could not send automatically. Please reach out directly via email.',
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden border-t border-zinc-900/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs rounded-full uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Communication</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Let's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-600">
              Build Together
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-4 mx-auto md:mx-0 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
          <p className="text-zinc-400 mt-6 max-w-xl text-base md:text-lg font-light leading-relaxed">
            Have an open role, an exciting startup idea, or need architectural expertise on your project? Let's connect and turn it into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Left Column: Direct Contact Details & Badges */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="group p-8 rounded-[2.5rem] bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-7 h-7" />
                </div>

                <button
                  onClick={() => handleCopy('vishwakarmaranjit8109@gmail.com', 'email')}
                  className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Copy email address"
                >
                  {copiedType === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Direct Email</span>
                <a
                  href="mailto:vishwakarmaranjit8109@gmail.com"
                  className="text-lg sm:text-xl font-bold text-white hover:text-amber-400 transition-colors block mt-1 break-all"
                >
                  vishwakarmaranjit8109@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group p-8 rounded-[2.5rem] bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-105 transition-transform duration-300">
                  <Phone className="w-7 h-7" />
                </div>

                <button
                  onClick={() => handleCopy('+919519228002', 'phone')}
                  className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-400/50 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Copy phone number"
                >
                  {copiedType === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Direct Telephone</span>
                <a
                  href="tel:+919519228002"
                  className="text-2xl font-bold text-white hover:text-amber-400 transition-colors block mt-1"
                >
                  +91 9519228002
                </a>
              </div>
            </div>

            {/* Quick Status / Availability Card */}
            <div className="p-6 rounded-[2rem] bg-zinc-950/40 border border-zinc-800/60 backdrop-blur-md flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">Current Status</div>
                <div className="text-sm font-bold text-white">Open to Full-Time &amp; High-Impact Contract Work</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-bl-full pointer-events-none" />

              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                Send a Transmission
              </h3>
              <p className="text-zinc-400 text-sm mb-8 font-light">
                Fill out the fields below and the message will route directly to my personal inbox.
              </p>

              {formStatus.state === 'success' ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Transmission Received</h4>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto">
                    {formStatus.message}
                  </p>
                  <button
                    onClick={() => setFormStatus({ state: 'idle', message: '' })}
                    className="px-6 py-2.5 bg-zinc-900 border border-zinc-700 text-white rounded-full text-xs font-mono uppercase tracking-wider hover:border-amber-400"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        Your Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all font-light"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        Your Email <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Collaboration / Full-Time Role"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all font-light"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Your Message <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project, goals, or schedule a conversation..."
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all font-light resize-none"
                    ></textarea>
                  </div>

                  {formStatus.state === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                      {formStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus.state === 'loading'}
                    className="w-full py-5 px-8 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold uppercase text-sm tracking-widest hover:shadow-[0_0_35px_rgba(251,191,36,0.45)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <span>{formStatus.state === 'loading' ? 'Transmitting...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
