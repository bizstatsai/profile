import { describe, it, expect } from 'vitest'
import {
  profile, experiences, books, skillGroups, certifications,
  services, clients, caseStudies, faqItems, techRadar,
  servicesDetail, speakingTopics, navLinks, methodology,
  maturityPyramid, architecturePatterns, thoughtLeadership,
  speakerKit, socialLinks, products,
} from '../data/profile'

describe('profile data', () => {
  it('has complete profile info', () => {
    expect(profile.name).toBe('Srini Centhala')
    expect(profile.email).toContain('@')
    expect(profile.linkedin).toContain('linkedin.com')
    expect(profile.stats.yearsExperience).toBeTruthy()
    expect(profile.stats.publishedBooks).toBe(4)
  })

  it('has 13 experience entries', () => {
    expect(experiences).toHaveLength(13)
    experiences.forEach(exp => {
      expect(exp.role).toBeTruthy()
      expect(exp.company).toBeTruthy()
      expect(exp.period).toBeTruthy()
    })
  })

  it('has 4 books with covers and ISBNs', () => {
    expect(books).toHaveLength(4)
    books.forEach(book => {
      expect(book.title).toBeTruthy()
      expect(book.cover).toBeTruthy()
      expect(book.isbn).toBeTruthy()
      expect(book.publisher).toBeTruthy()
    })
  })

  it('has 6 skill groups', () => {
    expect(skillGroups).toHaveLength(6)
    skillGroups.forEach(group => {
      expect(group.category).toBeTruthy()
      expect(group.skills.length).toBeGreaterThan(0)
    })
  })

  it('has 11 certifications with URLs', () => {
    expect(certifications).toHaveLength(11)
    certifications.forEach(cert => {
      expect(cert.name).toBeTruthy()
      expect(cert.url).toContain('http')
    })
  })

  it('has at least 10 clients', () => {
    expect(clients.length).toBeGreaterThanOrEqual(10)
  })

  it('has 5 case studies with architecture flows', () => {
    expect(caseStudies).toHaveLength(5)
    caseStudies.forEach(cs => {
      expect(cs.client).toBeTruthy()
      expect(cs.challenge).toBeTruthy()
      expect(cs.solution).toBeTruthy()
      expect(cs.impact.length).toBeGreaterThan(0)
      expect(cs.architecture.length).toBeGreaterThan(0)
    })
  })

  it('has 30 FAQ items', () => {
    expect(faqItems).toHaveLength(30)
    faqItems.forEach(faq => {
      expect(faq.question).toContain('?')
      expect(faq.answer.length).toBeGreaterThan(50)
    })
  })

  it('has 4 tech radar rings', () => {
    expect(techRadar).toHaveLength(4)
    const rings = techRadar.map(r => r.ring)
    expect(rings).toContain('Adopt')
    expect(rings).toContain('Trial')
    expect(rings).toContain('Assess')
    expect(rings).toContain('Hold')
  })

  it('has 6 detailed services', () => {
    expect(servicesDetail).toHaveLength(6)
    servicesDetail.forEach(s => {
      expect(s.deliverables.length).toBeGreaterThan(0)
    })
  })

  it('has 5 speaking topics', () => {
    expect(speakingTopics).toHaveLength(5)
  })

  it('has valid nav links', () => {
    expect(navLinks.length).toBeGreaterThanOrEqual(7)
    navLinks.forEach(link => {
      expect(link.href).toMatch(/^#/)
      expect(link.label).toBeTruthy()
    })
  })

  it('has methodology with 5 layers and 6 principles', () => {
    expect(methodology.name).toBe('Enterprise Intelligence Architecture')
    expect(methodology.layers).toHaveLength(5)
    expect(methodology.principles).toHaveLength(6)
  })

  it('has maturity pyramid with 5 levels', () => {
    expect(maturityPyramid.levels).toHaveLength(5)
    const levelNums = maturityPyramid.levels.map(l => l.level)
    expect(levelNums).toEqual([5, 4, 3, 2, 1])
  })

  it('has 6 architecture patterns', () => {
    expect(architecturePatterns).toHaveLength(6)
    architecturePatterns.forEach(p => {
      expect(p.layers.length).toBeGreaterThan(0)
      expect(p.tags.length).toBeGreaterThan(0)
    })
  })

  it('has thought leadership platforms', () => {
    expect(thoughtLeadership.length).toBeGreaterThanOrEqual(5)
    const active = thoughtLeadership.filter(t => t.active)
    expect(active.length).toBeGreaterThanOrEqual(1)
  })

  it('has speaker kit data', () => {
    expect(speakerKit.bio).toBeTruthy()
    expect(speakerKit.topics.length).toBeGreaterThanOrEqual(5)
    expect(speakerKit.formats.length).toBeGreaterThan(0)
  })

  it('has social links', () => {
    expect(socialLinks.linkedin).toContain('linkedin.com')
    expect(socialLinks.github).toContain('github.com')
  })
})

describe('products data', () => {
  it('has 13 products with the required fields', () => {
    expect(products).toHaveLength(13)
    products.forEach(p => {
      expect(p.name).toBeTruthy()
      expect(p.tagline).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(['live', 'early', 'building', 'soon']).toContain(p.status)
      expect(p.platform).toBeTruthy()
      expect(p.tags.length).toBeGreaterThan(0)
      if (p.url) expect(p.url).toMatch(/^https:\/\/[a-z.]+bizstats\.ai/)
    })
  })

  it('lists the live products and links them', () => {
    const live = products.filter(p => p.status === 'live').map(p => p.name)
    expect(live).toEqual(expect.arrayContaining(['BotNX', 'BizStats Hub', 'BizStats Labs', 'Status', 'bizstats.ai']))
    products.filter(p => p.status === 'live').forEach(p => expect(p.url).toBeTruthy())
  })

  it('has a Products nav link', () => {
    expect(navLinks.find(l => l.href === '#products')).toBeTruthy()
  })
})
