import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { Suspense } from 'react'
import { render, screen, waitFor, within, fireEvent, cleanup } from '@testing-library/react'
import App from '../App'
import { navLinks } from '../data/profile'
import { diagrams, planningRecords } from '../data/architectureDiagrams'

const section = (id) => document.getElementById(id)

async function renderSite() {
  const view = render(<Suspense fallback={null}><App /></Suspense>)
  await waitFor(() => {
    expect(document.querySelector('footer.footer')).toBeTruthy()
    expect(section('contact').querySelector('h2')).toBeTruthy()
  }, { timeout: 30000 })
  return view
}

// A first load of every lazy section can be slow. Later renders reuse them.
beforeAll(async () => {
  await renderSite()
  cleanup()
}, 60000)

beforeEach(async () => {
  window.history.replaceState(null, '', '/')
  await renderSite()
}, 40000)

describe('the page', () => {
  it('runs in the order the brief sets, with its headlines', () => {
    const expected = [
      ['overview', /The Mind Behind the Architecture/],
      ['philosophy', /Technology Is the Medium\. Business Impact Is the Objective\./],
      ['architecture', /Behind Every Intelligent Business Is An Architecture Worth Understanding\./],
      ['data-journey', /Data Is Not Intelligence Yet\./],
      ['ai', /AI Is Powerful\. Architecture Makes It Useful\./],
      ['journey', /Experience Built Across Complex Enterprise Environments\./],
      ['projects', /From Architectural Thinking to Real-World Systems\./],
      ['publications', /Ideas That Shape Better Technology\./],
      ['recognition', /Architecture Recognized\. Knowledge Continuously Expanded\./],
      ['principles', /Principles Behind Every Architecture Decision\./],
      ['contact', /Have a Complex Technology Challenge\?/],
    ]
    const order = [...document.querySelectorAll('main section[id]')].map(el => el.id)
      .filter(id => expected.some(([e]) => e === id))
    expect(order).toEqual(expected.map(([id]) => id))
    expected.forEach(([id, text]) => {
      expect(section(id).querySelector('h2')).toHaveTextContent(text)
    })
  })

  it('names each section by its headline', () => {
    document.querySelectorAll('main section[aria-labelledby]').forEach((el) => {
      expect(document.getElementById(el.getAttribute('aria-labelledby')), el.id).toBeTruthy()
    })
  })

  it('has one first-level heading, stating who this is and the headline', () => {
    const h1 = screen.getAllByRole('heading', { level: 1 })
    expect(h1).toHaveLength(1)
    expect(h1[0]).toHaveTextContent('Srini Centhala')
    expect(h1[0]).toHaveTextContent('Great Technology Is Not About Building More.')
    expect(h1[0]).toHaveTextContent("It's About Designing What Matters.")
  })

  it('links every call to action and navigation item to a place that exists', () => {
    expect(screen.getByRole('link', { name: 'Explore My Architecture' })).toHaveAttribute('href', '#architecture')
    expect(screen.getByRole('link', { name: 'Discover My Journey' })).toHaveAttribute('href', '#journey')
    navLinks.forEach(link => expect(document.querySelector(link.href), link.href).toBeTruthy())
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const id = a.getAttribute('href').slice(1).split('/')[0]
      expect(document.getElementById(id), a.getAttribute('href')).toBeTruthy()
    })
  })

  it('writes no coordinate at full float precision, which browsers round differently from the build', () => {
    const long = /\d\.\d{6,}/
    document.querySelectorAll('svg, svg *').forEach((el) => {
      ;[...el.attributes].filter(a => a.name !== 'style').forEach((a) => {
        expect(a.value, `${el.tagName} ${a.name}`).not.toMatch(long)
      })
    })
  })

  it('offers no resume download', () => {
    expect(screen.queryByRole('link', { name: /resume/i })).toBeNull()
  })

  it('gives every image alternative text', () => {
    document.querySelectorAll('img').forEach(img => expect(img.hasAttribute('alt'), img.src).toBe(true))
  })

  it('opens external links safely', () => {
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      expect(a.getAttribute('rel'), a.href).toMatch(/noopener/)
    })
  })
})

describe('the architecture showcase', () => {
  const atlas = () => within(section('architecture'))

  it('draws the chosen plate and moves between chapters', () => {
    expect(document.getElementById('plate-lakehouse')).toBeVisible()
    fireEvent.click(atlas().getByRole('tab', { name: /Cloud and distributed/ }))
    expect(document.getElementById('plate-cloud-migration')).toBeVisible()
    expect(document.getElementById('plate-lakehouse')).not.toBeVisible()
    fireEvent.click(atlas().getByRole('tab', { name: /platform as built/ }))
    expect(document.getElementById('plate-platform-context')).toBeVisible()
  })

  it('selects a component and explains it', () => {
    const plate = within(document.getElementById('plate-lakehouse'))
    fireEvent.click(plate.getByRole('button', { name: /^Bronze/ }))
    expect(plate.getByText(/The raw tier/)).toBeInTheDocument()
    expect(plate.getByText('Receives from')).toBeInTheDocument()
    expect(plate.getByText('Leads to')).toBeInTheDocument()
  })

  it('opens a text version of the drawing, listing its relationships', () => {
    const plate = within(document.getElementById('plate-lakehouse'))
    fireEvent.click(plate.getByRole('button', { name: 'Read as text' }))
    expect(plate.getByText(/cleanse · conform · dedupe/, { selector: 'li *, li' })).toBeInTheDocument()
  })

  it('opens a layer, lists what it holds and what crosses its boundary', () => {
    const strip = section('architecture').querySelector('#panel-data-platforms .atlas__strip')
    fireEvent.click(within(strip).getByRole('link', { name: /Data Mesh/ }))
    const plate = within(document.getElementById('plate-data-mesh'))
    const toggle = plate.getByRole('button', { name: /Self-serve platform team/ })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(plate.getByText('Layer, 3 components')).toBeInTheDocument()
    expect(plate.getByText('Enters from')).toBeInTheDocument()
    fireEvent.click(plate.getByRole('button', { name: 'Close layer' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('lets a phone reader expand the layers of the context drawing', () => {
    fireEvent.click(within(section('architecture')).getByRole('tab', { name: /platform as built/ }))
    const layers = document.querySelectorAll('#plate-platform-context details.ac-layers__group')
    expect(layers).toHaveLength(5)
    expect(layers[0]).toHaveAttribute('open')
    expect(layers[1]).not.toHaveAttribute('open')
  })

  it('opens full screen and closes again', () => {
    const plate = document.getElementById('plate-lakehouse')
    fireEvent.click(within(plate).getByRole('button', { name: 'Open full screen' }))
    const dialog = plate.querySelector('dialog')
    expect(dialog).toHaveAttribute('open')
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close full screen' }))
    expect(dialog).not.toHaveAttribute('open')
  })

  it('offers a phone alternative for the sequences and the wide context drawing', () => {
    fireEvent.click(within(section('architecture')).getByRole('tab', { name: /Cloud and distributed/ }))
    const strip = section('architecture').querySelector('#panel-cloud-operations .atlas__strip')
    fireEvent.click(within(strip).getByRole('link', { name: /Self-Hosted Primary/ }))
    const sequence = document.getElementById('plate-pilot-light-failover')
    expect(sequence.querySelector('ol')).toBeTruthy()

    fireEvent.click(within(section('architecture')).getByRole('tab', { name: /platform as built/ }))
    const context = document.getElementById('plate-platform-context')
    expect(within(context).getAllByText('People').length).toBeGreaterThan(0)
  })
})

describe('the journey from data to decisions', () => {
  it('moves between stages by click and arrow key', () => {
    const tabs = within(section('data-journey')).getAllByRole('tab')
    expect(tabs).toHaveLength(7)
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    fireEvent.click(tabs[2])
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(tabs[2], { key: 'ArrowRight' })
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true')
  })
})

describe('the AI section', () => {
  it('opens one layer at a time', () => {
    const list = within(section('ai'))
    const knowledge = list.getByRole('button', { name: /Knowledge layer/ })
    fireEvent.click(knowledge)
    expect(knowledge).toHaveAttribute('aria-expanded', 'true')
    expect(list.getByRole('button', { name: /Intelligence layer/ })).toHaveAttribute('aria-expanded', 'false')
  })

  it('states that the layers are not a deployed system', () => {
    expect(section('ai')).toHaveTextContent(/does not depict a deployed system/)
  })
})

describe('the publications', () => {
  it('shows the first questions and reveals the rest on request', () => {
    const lib = section('publications')
    const count = () => [...lib.querySelectorAll('.ask__list details')].filter(d => !d.hidden).length
    expect(count()).toBe(8)
    fireEvent.click(within(lib).getByRole('button', { name: 'Show all 30 questions' }))
    expect(count()).toBe(30)
  })

  it('filters questions by topic', () => {
    const lib = within(section('publications'))
    fireEvent.click(lib.getByRole('button', { name: /Cloud and cost/ }))
    expect(lib.getByRole('button', { name: /Cloud and cost/ })).toHaveAttribute('aria-pressed', 'true')
    expect(section('publications').querySelectorAll('.ask__list details')).toHaveLength(3)
  })
})

describe('recognition', () => {
  it('gives Forrester its context and calls it an evaluation', () => {
    const rec = section('recognition')
    expect(rec).toHaveTextContent('Excellent Architecture & Design')
    expect(rec).toHaveTextContent(/evaluated the NextGen Credit Bureau/)
    expect(rec).toHaveTextContent(/not a formal award/)
  })
})

describe('contact', () => {
  it('reaches someone even without a form service', () => {
    const contact = within(section('contact'))
    fireEvent.change(contact.getByLabelText('Name'), { target: { value: 'A Visitor' } })
    fireEvent.change(contact.getByLabelText('Email'), { target: { value: 'visitor@example.com' } })
    fireEvent.change(contact.getByLabelText('Message'), { target: { value: 'Hello' } })
    fireEvent.submit(section('contact').querySelector('form'))
    expect(contact.getByRole('status')).toHaveTextContent(/email app/)
  })
})

describe('preferences', () => {
  it('lets a visitor pause motion', () => {
    const hero = within(document.querySelector('.hero'))
    const pause = hero.getByRole('button', { name: 'Pause motion' })
    fireEvent.click(pause)
    expect(document.documentElement.dataset.motion).toBe('off')
    fireEvent.click(hero.getByRole('button', { name: 'Resume motion' }))
    expect(document.documentElement.dataset.motion).not.toBe('off')
  })

  it('lets a visitor switch theme', () => {
    const before = document.documentElement.dataset.theme
    fireEvent.click(document.querySelector('[aria-label*="theme" i]'))
    expect(document.documentElement.dataset.theme).not.toBe(before)
  })
})

describe('the planning records', () => {
  it('keeps each one on the page, marked as superseded', () => {
    const archive = document.getElementById('site-archive')
    planningRecords.forEach((id) => {
      expect(archive).toHaveTextContent(diagrams[id].title)
    })
    expect(archive).toHaveTextContent(/Page wireframe, as planned/)
  })
})
