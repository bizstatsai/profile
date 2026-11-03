import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'
import About from '../components/About'
import Products from '../components/Products'

describe('Hero component', () => {
  it('renders name and bio', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Srini Centhala')
    expect(screen.getByText(/See the patterns/)).toBeInTheDocument()
    expect(screen.getByText(/Get in Touch/)).toBeInTheDocument()
    expect(screen.getByText(/View Experience/)).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<Hero />)
    expect(screen.getByText('25+')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('renders client badges', () => {
    render(<Hero />)
    expect(screen.getByText('AT&T')).toBeInTheDocument()
    expect(screen.getByText('Walmart')).toBeInTheDocument()
  })

  it('has resume download link', () => {
    render(<Hero />)
    const resumeLink = screen.getByText(/Resume/)
    expect(resumeLink.closest('a')).toHaveAttribute('href', '/Srini_Centhala_Resume.pdf')
    expect(resumeLink.closest('a')).toHaveAttribute('download')
  })
})

describe('About component', () => {
  it('renders section title', () => {
    render(<About />)
    expect(screen.getByText('What I Do')).toBeInTheDocument()
  })
})

describe('Products component', () => {
  it('renders the section title and every product', () => {
    render(<Products />)
    expect(screen.getByText('Products I Architect')).toBeInTheDocument()
    expect(screen.getByText('BotNX')).toBeInTheDocument()
    expect(screen.getByText('DeployNX')).toBeInTheDocument()
    expect(screen.getByText('BizStats Hub')).toBeInTheDocument()
  })

  it('links live products to their public URL', () => {
    render(<Products />)
    const link = screen.getByText(/botnx\.bizstats\.ai/).closest('a')
    expect(link).toHaveAttribute('href', 'https://botnx.bizstats.ai')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
