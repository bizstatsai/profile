import { useState } from 'react'
import { profile, services, servicesDetail, socialLinks } from '../data/profile'
import { SectionHead } from '../components/layout/SectionContainer'

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

/**
 * Posts to a form endpoint when one is configured at build time. Otherwise it opens
 * the visitor's email app with the message filled in, so the form always reaches someone.
 */
function ContactForm() {
  const empty = { name: '', email: '', subject: '', message: '', _gotcha: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState(null)

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (form._gotcha) return
    if (!ENDPOINT) {
      const subject = form.subject || `Message from ${form.name}`
      const body = `${form.message}\n\n${form.name}\n${form.email}`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('opened')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input className="contact-form__trap" type="text" name="_gotcha" value={form._gotcha} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="contact-form__row">
        <label>
          <span className="tech">Name</span>
          <input name="name" type="text" required autoComplete="name" value={form.name} onChange={update} />
        </label>
        <label>
          <span className="tech">Email</span>
          <input name="email" type="email" required autoComplete="email" value={form.email} onChange={update} />
        </label>
      </div>
      <label>
        <span className="tech">Subject (optional)</span>
        <input name="subject" type="text" value={form.subject} onChange={update} />
      </label>
      <label>
        <span className="tech">Message</span>
        <textarea name="message" required rows={5} value={form.message} onChange={update} />
      </label>
      <div className="contact-form__foot">
        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending message' : 'Send message'}
        </button>
        <p className="contact-form__status" role="status">
          {status === 'sent' && 'Message sent.'}
          {status === 'opened' && 'Your email app should now be open with this message. Send it from there.'}
          {status === 'error' && `The message did not send. Email ${profile.email} directly.`}
        </p>
      </div>
    </form>
  )
}

export default function ContactSection() {
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: 'linkedin.com/in/srinicenthala', href: socialLinks.linkedin, external: true },
    { label: 'Phone', value: profile.phone, href: `tel:+1${profile.phone.replaceAll('-', '')}` },
    { label: 'Company', value: 'absolut-e.com', href: socialLinks.absoluteE, external: true },
    { label: 'Product', value: 'bizstats.ai', href: socialLinks.bizstats, external: true },
    { label: 'GitHub', value: 'github.com/Scenthala', href: socialLinks.github, external: true },
    { label: 'Books', value: 'Business Expert Press', href: socialLinks.books, external: true },
  ]
  return (
    <>
      <SectionHead
        n="11"
        label="Connect and collaborate"
        headline="Have a Complex Technology Challenge?"
        lead="Let's explore how architecture, data and intelligent systems can help solve meaningful business challenges."
      >
        <div className="contact__cta">
          <a className="btn btn--primary" href={`mailto:${profile.email}?subject=Architecture%20conversation`}>Start a conversation</a>
          <p className="tech">Available for Corp-to-Corp contracts through {profile.company} Based in {profile.location}.</p>
        </div>
      </SectionHead>

      <div className="contact">
        <dl className="contact__channels">
          {channels.map(c => (
            <div key={c.label}>
              <dt className="tech">{c.label}</dt>
              <dd>
                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{c.value}</a>
              </dd>
            </div>
          ))}
        </dl>
        <ContactForm />
      </div>

      <section id="services" className="services" aria-labelledby="services-title">
        <header>
          <h3 id="services-title">Ways to work together</h3>
          <p>Enterprise architecture consulting through {profile.company}</p>
        </header>
        <ul className="services__list">
          {servicesDetail.map(service => (
            <li key={service.title}>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <p className="tech services__label">Deliverables</p>
              <ul>
                {service.deliverables.map(d => <li key={d}>{d}</li>)}
              </ul>
            </li>
          ))}
        </ul>
        <p className="services__areas"><span className="tech">Areas of practice.</span> {services.join(', ')}.</p>
      </section>
    </>
  )
}
