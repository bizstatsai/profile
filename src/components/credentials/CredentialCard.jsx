export default function CredentialCard({ cert }) {
  return (
    <li className="credential">
      <p className="credential__name">{cert.name}</p>
      <p className="tech">{cert.issuer}</p>
      {cert.url
        ? <a className="tech credential__verify" href={cert.url} target="_blank" rel="noopener noreferrer" aria-label={`View credential: ${cert.name}`}>View credential</a>
        : <span className="tech credential__note">Issuer no longer hosts this record</span>}
    </li>
  )
}
