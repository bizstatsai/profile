import {
  certificationGroups, education, educationYear, additionalTraining, skillGroups, recognition,
} from '../../data/credentials'
import { SectionHead } from '../layout/SectionContainer'
import CredentialCard from './CredentialCard'

export default function CredentialsSection() {
  return (
    <>
      <SectionHead
        n="09"
        label="Recognition and credentials"
        headline={['Architecture Recognized.', 'Knowledge Continuously Expanded.']}
      />

      <section className="recognition" aria-labelledby="recognition-block-title">
        <h3 id="recognition-block-title" className="tech">Recognition</h3>
        <blockquote>
          <p>“{recognition.quote}”</p>
          <footer>{recognition.source}</footer>
        </blockquote>
        <div>
          <p>{recognition.context}</p>
          <p className="recognition__caveat tech">{recognition.caveat}</p>
          <a className="link-out" href={recognition.link}>Read the engagement</a>
        </div>
      </section>

      <div className="credentials">
        <section className="credentials__education" aria-labelledby="education-title">
          <h3 id="education-title" className="tech">Education</h3>
          <p className="credentials__degree">{education.degree}</p>
          <p>{education.university}, {educationYear}</p>
        </section>

        <section className="credentials__certs" aria-labelledby="certs-title">
          <h3 id="certs-title" className="tech">Certifications and course credentials</h3>
          <div className="credentials__groups">
            {certificationGroups.map(group => (
              <div key={group.group}>
                <h4>{group.group}</h4>
                <ul>
                  {group.certs.map(cert => <CredentialCard key={cert.name} cert={cert} />)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="credentials__training" aria-labelledby="training-title">
          <h3 id="training-title" className="tech">Additional training</h3>
          <p>{additionalTraining.join(', ')}.</p>
        </section>
      </div>

      <section id="skills" className="skills" aria-labelledby="skills-title">
        <h3 id="skills-title">Technical credentials</h3>
        <p className="skills__lead">Deep expertise across the full data and AI stack, built over 25+ years.</p>
        <div className="skills__grid">
          {skillGroups.map(group => (
            <div key={group.category}>
              <h4 className="tech">{group.category}</h4>
              <ul>
                {group.skills.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
