import { books } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import { asset } from '../lib/asset'
import '../App.css'

export default function Books() {
  return (
    <section id="books" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Published Books</h2>
        <p className="section-subtitle">
          Co-author of 4 books on AI, security, risk management, and project management.
          Published by{' '}
          <a href="https://www.businessexpertpress.com/srini-centhala/" target="_blank" rel="noopener noreferrer">
            Business Expert Press
          </a>{' '}
          and AuthorHouse.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '24px' }}>
          {books.map((book, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <a href={book.publisherUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'block',
                width: '100%',
                height: '220px',
                borderRadius: '8px',
                marginBottom: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--bg-primary)',
              }}>
                <img
                  src={asset(book.cover)}
                  alt={`Cover of ${book.title}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '8px',
                  }}
                />
              </a>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '10px', lineHeight: 1.4 }}>
                <a href={book.publisherUrl} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--text-primary)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-light)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                >
                  {book.title}
                </a>
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                marginBottom: '12px',
                flex: 1,
                lineHeight: 1.6,
              }}>
                {book.description}
              </p>
              <div style={{
                fontSize: '0.78rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--text-muted)',
                marginBottom: '12px',
                lineHeight: 1.8,
              }}>
                <div>{book.publisher}{book.year ? ` · ${book.year}` : ''}{book.pages ? ` · ${book.pages} pages` : ''}</div>
                {book.isbn && <div>ISBN: {book.isbn}</div>}
                {book.coAuthors && <div>with {book.coAuthors.join(', ')}</div>}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {book.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
