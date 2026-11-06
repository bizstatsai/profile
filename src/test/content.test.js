import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import * as profileData from '../data/profile'
import * as experienceData from '../data/experience'
import * as projectData from '../data/projects'
import * as publicationData from '../data/publications'
import * as credentialData from '../data/credentials'
import * as narrativeData from '../data/narrative'
import { architecturePatterns, architectureChapters, aiChapters, governanceIndex } from '../data/architecturePatterns'
import { diagrams, STATUS } from '../data/architectureDiagrams'

const { profile, clients, servicesDetail, socialLinks, navLinks } = profileData
const { experiences, milestones, careerLine, founderRole } = experienceData
const { caseStudies, products } = projectData
const { books, faqItems, techRadar, speakingTopics, speakerKit, thoughtLeadership } = publicationData
const { skillGroups, certifications, certificationGroups, recognition, education } = credentialData
const { philosophy, dataJourney, methodology, aiSection, maturityPyramid, principles } = narrativeData

const everything = JSON.stringify({
  ...profileData, ...experienceData, ...projectData, ...publicationData, ...credentialData, ...narrativeData, architecturePatterns,
})

describe('existing content is preserved', () => {
  it('keeps the identity', () => {
    expect(profile.name).toBe('Srini Centhala')
    expect(profile.title).toBe('Chief Data & AI Architect')
    expect(profile.stats.publishedBooks).toBe(4)
    expect(education.degree).toMatch(/Bachelor of Engineering/)
    expect(socialLinks.linkedin).toContain('linkedin.com')
    expect(socialLinks.github).toContain('github.com')
  })

  it('keeps every role on the career line', () => {
    expect(experiences).toHaveLength(13)
    experiences.forEach((e) => {
      expect(e.role).toBeTruthy()
      expect(e.company).toBeTruthy()
      expect(e.period).toBeTruthy()
    })
    expect(milestones.length).toBeGreaterThanOrEqual(8)
  })

  it('places every role and milestone on the timeline exactly once', () => {
    const placed = careerLine().flatMap(era => era.items)
    expect(placed.filter(i => i.kind === 'engagement')).toHaveLength(experiences.length - 1)
    expect(placed.filter(i => i.kind === 'milestone')).toHaveLength(milestones.length)
    expect(founderRole.period).toContain('Present')
  })

  it('keeps the books, skills, credentials and clients', () => {
    expect(books).toHaveLength(4)
    expect(skillGroups).toHaveLength(6)
    expect(certifications).toHaveLength(11)
    expect(certificationGroups.flatMap(g => g.certs)).toHaveLength(11)
    expect(clients).toHaveLength(14)
  })

  it('keeps the case studies with their flows', () => {
    expect(caseStudies).toHaveLength(5)
    caseStudies.forEach((c) => {
      expect(c.challenge).toBeTruthy()
      expect(c.solution).toBeTruthy()
      expect(c.impact.length).toBeGreaterThan(0)
      expect(c.architecture.length).toBeGreaterThan(0)
    })
  })

  it('keeps the thought leadership', () => {
    expect(faqItems).toHaveLength(30)
    faqItems.forEach(f => expect(f.question).toContain('?'))
    expect(techRadar.map(r => r.ring)).toEqual(['Adopt', 'Trial', 'Assess', 'Hold'])
    expect(speakingTopics).toHaveLength(5)
    expect(speakerKit.bio).toBeTruthy()
    expect(thoughtLeadership.length).toBeGreaterThanOrEqual(5)
  })

  it('keeps the services and products', () => {
    expect(servicesDetail).toHaveLength(6)
    servicesDetail.forEach(s => expect(s.deliverables.length).toBeGreaterThan(0))
    expect(products).toHaveLength(13)
    products.forEach((p) => {
      expect(['live', 'early', 'building', 'soon']).toContain(p.status)
      if (p.url) expect(p.url).toMatch(/^https:\/\/[a-z.]+bizstats\.ai/)
    })
  })

  it('keeps the method and the maturity model', () => {
    expect(methodology.name).toBe('Enterprise Intelligence Architecture')
    expect(methodology.layers).toHaveLength(5)
    expect(methodology.principles).toHaveLength(6)
    expect(maturityPyramid.levels.map(l => l.level)).toEqual([5, 4, 3, 2, 1])
  })

  it('keeps the ten patterns in pattern-language form, each with its source', () => {
    expect(architecturePatterns).toHaveLength(10)
    architecturePatterns.forEach((p) => {
      expect(p.intent).toBeTruthy()
      expect(p.forces).toBeTruthy()
      expect(p.consequences).toBeTruthy()
      expect(p.knownUses.length).toBeGreaterThan(0)
      expect(diagrams[p.diagram]).toBeTruthy()
      expect(existsSync(`public/diagrams/${p.diagram}.svg`)).toBe(true)
      p.related.forEach(slug => expect(architecturePatterns.find(x => x.slug === slug)).toBeTruthy())
    })
  })

  it('shows every pattern once across the chapters', () => {
    const plates = [...architectureChapters, ...aiChapters].flatMap(c => c.plates)
    architecturePatterns.forEach((p) => {
      expect(plates.filter(x => x.slug === p.slug), p.slug).toHaveLength(1)
    })
  })
})

describe('authenticity', () => {
  it('uses the verified publication details', () => {
    const find = (text) => books.find(b => b.title.includes(text))
    expect(find('for Risk Management')).toMatchObject({ isbn: '978-1-949443-51-6', pages: 164, published: 'March 2020' })
    expect(find('for Security')).toMatchObject({ isbn: '978-1-951527-26-6', pages: 154, published: 'March 2020' })
    expect(find('Design and Solution')).toMatchObject({ isbn: '978-1-951527-48-8', pages: 124, published: 'March 2020' })
    expect(find('OneStop')).toMatchObject({ isbn: '978-1-452062-84-6', pages: 732, published: '2010' })
    expect(find('OneStop').coAuthors).toContain('Muthu Shanmugam')
  })

  it('does not carry figures that could not be corroborated', () => {
    expect(everything).not.toMatch(/4,700/)
    expect(everything).not.toMatch(/manual QA/i)
    expect(everything).not.toMatch(/10\+ Fortune 100/)
    expect(everything).not.toMatch(/(AWS|Azure)[^"]{0,20}\bcertified\b/i)
  })

  it('presents Forrester as an evaluation, never an award', () => {
    expect(recognition.source).toBe('Forrester')
    expect(recognition.caveat).toMatch(/not a formal award/)
    const mentions = everything.match(/\bawards?\b/gi) ?? []
    expect(mentions).toHaveLength(1)
  })

  it('has no testimonials', () => {
    expect(everything).not.toMatch(/testimonial/i)
  })

  it('adds no contact details', () => {
    const emails = new Set(everything.match(/[\w.+-]+@[\w-]+\.[\w.]+/g))
    expect([...emails]).toEqual(['srini@absolut-e.com'])
    expect(everything.match(/\b\d{3}-\d{3}-\d{4}\b/g)?.every(n => n === profile.phone)).toBe(true)
  })

  it('offers no resume, because no authentic file exists', () => {
    expect(everything).not.toMatch(/\.pdf/i)
  })

  it('labels conceptual models as conceptual', () => {
    expect(dataJourney.note).toMatch(/conceptual/i)
    expect(dataJourney.note).toMatch(/not one deployed system/i)
    expect(aiSection.note).toMatch(/conceptual/i)
    expect(aiSection.note).toMatch(/does not depict a deployed system/i)
  })

  it('states the standing of every drawing', () => {
    Object.values(diagrams).forEach((d) => {
      expect(STATUS[d.status], d.id).toBeTruthy()
    })
    expect(diagrams['pattern-pilot-light-failover'].status).toBe('target')
    expect(diagrams['pattern-availability-states'].status).toBe('target')
    expect(STATUS.target.note).toMatch(/Not presented as deployed/)
    expect(STATUS.pattern.note).toMatch(/does not depict any one client system/)
  })

  it('keeps governance references pointing at real drawings', () => {
    expect(governanceIndex.length).toBeGreaterThan(0)
    governanceIndex.forEach((g) => {
      const plate = architecturePatterns.find(p => p.slug === g.plate)
      expect(plate, g.plate).toBeTruthy()
      expect(diagrams[plate.diagram].model.nodes.some(n => n.id === g.node), `${g.plate}/${g.node}`).toBe(true)
    })
  })
})

describe('the career line', () => {
  const items = experienceData.careerLine().flatMap(era => era.items)
  const place = (text) => items.findIndex(i => (i.event ?? i.company).includes(text))

  it('runs oldest first, to the month where a month is known', () => {
    expect(place('B.E. Electronics')).toBeLessThan(place('Started career at Canny Soft'))
    expect(place('VMware')).toBeLessThan(place('AT&T'))
    expect(place('Founded Absolut-e')).toBeLessThan(place('IMS Health'))
  })

  it('knows the starting month of every engagement', () => {
    experienceData.experiences.forEach(e => expect(e.period, e.company).toMatch(/^[A-Z][a-z]{2} \d{4}/))
  })
})

describe('the public repository rule', () => {
  it('has no internal addresses in the data or drawings', () => {
    const drawings = JSON.stringify(Object.values(diagrams).map(d => d.model))
    ;[everything, drawings].forEach((text) => {
      expect(text).not.toMatch(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)
      expect(text).not.toMatch(/\.internal\b|\.svc\.cluster/)
    })
  })
})

describe('the brief', () => {
  it('has the navigation it asks for', () => {
    expect(navLinks.map(l => l.label)).toEqual([
      'Overview', 'Philosophy', 'Architecture', 'AI & Data', 'Journey', 'Projects', 'Publications', 'Contact',
    ])
  })

  it('has its three philosophy principles and six architecture principles', () => {
    expect(philosophy.principles.map(p => p.title)).toEqual(['Understand the problem', 'Design the right system', 'Create lasting impact'])
    expect(principles.items).toHaveLength(6)
  })

  it('walks the data journey in seven stages, each complete', () => {
    expect(dataJourney.stages).toHaveLength(7)
    dataJourney.stages.forEach((s, i) => {
      expect(s.explanation).toBeTruthy()
      expect(s.responsibility).toBeTruthy()
      expect(s.documented.length).toBeGreaterThan(0)
      if (i < 6) expect(s.next).toBeTruthy()
    })
  })

  it('stacks the five AI layers in order', () => {
    expect(aiSection.layers.map(l => l.name)).toEqual([
      'Data foundation', 'Knowledge layer', 'Intelligence layer', 'Orchestration', 'Business applications',
    ])
  })
})
