import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden  py-32 bg-gradient-to-l from-primary to-secondary"
    >

      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started now
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Build and publish your first app in minutes.
          </p>
          <Button href="/editor" color="white" className="mt-10">
            Go to the editor
          </Button>
        </div>
      </Container>
    </section>
  )
}
