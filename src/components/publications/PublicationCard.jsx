import { asset } from '../../lib/asset'
import { profile } from '../../data/profile'

export default function PublicationCard({ book }) {
  const authors = [profile.name, ...book.coAuthors]
  return (
    <article className="book">
      <a className="book__cover" href={book.publisherUrl} target="_blank" rel="noopener noreferrer" aria-label={`${book.title} at ${book.publisher}`}>
        <img src={asset(book.cover)} alt={`Cover of ${book.title}`} width="400" height={book.coverHeight ?? 600} loading="lazy" decoding="async" />
      </a>
      <div className="book__body">
        <h3>{book.title}</h3>
        <p>{book.description}</p>
        <dl className="book__facts tech">
          <div><dt>Authors</dt><dd>{authors.join(', ')}</dd></div>
          <div><dt>Publisher</dt><dd>{book.publisher}</dd></div>
          <div><dt>Published</dt><dd>{book.published}</dd></div>
          <div><dt>Length</dt><dd>{book.pages} pages</dd></div>
          <div><dt>ISBN</dt><dd>{book.isbn}</dd></div>
        </dl>
        <a className="link-out" href={book.publisherUrl} target="_blank" rel="noopener noreferrer">
          View at {book.publisher === 'AuthorHouse' ? 'Amazon' : book.publisher}
        </a>
      </div>
    </article>
  )
}
