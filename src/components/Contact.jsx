import { useState } from 'react'
import { profile, services } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData._gotcha) return // honeypot
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ display: 'inline-block' }}>Let's Connect</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 48px' }}>
              Looking for a data architect, AI strategist, or enterprise consultant?
              Available for Corp-to-Corp contracts through Absolut-e Data Com Inc.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '40px' }}>
          {/* Contact form */}
          <ScrollReveal>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" name="_gotcha" value={formData._gotcha} onChange={handleChange}
                style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div>
                <label htmlFor="name" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Name *</label>
                <input id="name" name="name" type="text" required value={formData.name}
                  onChange={handleChange} style={inputStyle} placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Email *</label>
                <input id="email" name="email" type="email" required value={formData.email}
                  onChange={handleChange} style={inputStyle} placeholder="your@email.com" />
              </div>

              <div>
                <label htmlFor="subject" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Subject</label>
                <input id="subject" name="subject" type="text" value={formData.subject}
                  onChange={handleChange} style={inputStyle} placeholder="Architecture Assessment, Consulting, etc." />
              </div>

              <div>
                <label htmlFor="message" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Message *</label>
                <textarea id="message" name="message" required rows={5} value={formData.message}
                  onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Tell me about your project or engagement needs..." />
              </div>

              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}
                style={{ justifyContent: 'center' }}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && <span>&rarr;</span>}
              </button>

              {status === 'sent' && (
                <p style={{ color: 'var(--success)', fontSize: '0.9rem', textAlign: 'center' }}>
                  Message sent. I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: '#e05050', fontSize: '0.9rem', textAlign: 'center' }}>
                  Something went wrong. Please email me directly.
                </p>
              )}
            </form>
          </ScrollReveal>

          {/* Info side */}
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  LinkedIn Profile &rarr;
                </a>
                <a href={`mailto:${profile.email}`} className="btn btn-outline">
                  {profile.email}
                </a>
              </div>

              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span>{profile.phone}</span>
                <span>{profile.location}</span>
              </div>

              {/* Services code block */}
              <div style={{
                padding: '24px',
                background: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  fontSize: '0.78rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'var(--text-secondary)',
                  lineHeight: 2,
                }}>
                  <span style={{ color: 'var(--accent-light)' }}>const</span> services = [<br />
                  {services.map((s, i) => (
                    <span key={i}>
                      &nbsp;&nbsp;<span style={{ color: 'var(--success)' }}>"{s}"</span>
                      {i < services.length - 1 ? ',' : ''}
                      <br />
                    </span>
                  ))}
                  ];<br /><br />
                  <span style={{ color: 'var(--accent-light)' }}>const</span> companies = {'{'}<br />
                  &nbsp;&nbsp;consultancy: <span style={{ color: 'var(--success)' }}>"<a href={profile.companyUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--success)' }}>{profile.company}</a>"</span>,<br />
                  &nbsp;&nbsp;product: <span style={{ color: 'var(--success)' }}>"<a href={profile.productUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--success)' }}>{profile.product}</a>"</span>,<br />
                  {'}'};
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
