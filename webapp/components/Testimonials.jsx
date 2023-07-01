import Image from 'next/image'

import { Container } from '@/components/Container'
import avatarImage1 from '../../docs/static/img/templates/nouns.png'
import avatarImage2 from '@/images/avatars/avatar-2.png'
import avatarImage3 from '@/images/avatars/avatar-3.png'
import avatarImage4 from '@/images/avatars/avatar-4.png'
import avatarImage5 from '@/images/avatars/avatar-5.png'

const testimonials = [
  {
    title: 'Nouns auction page',
    description: 'Bid on your next Nouns',
    image: avatarImage3,
    url: "/app/nouns"
  },
  {
    title: 'Nouns auction page',
    description: 'Bid on your next Nouns',
    image: "https://docs.fastdapp.xyz/assets/images/nouns_1-b5b149026d4af10c5a6e14aa38433dd0.png",
    url: "/app/nouns"
  },
  {
    title: 'Nouns auction page',
    description: 'Bid on your next Nouns',
    image: "https://docs.fastdapp.xyz/assets/images/nouns_1-b5b149026d4af10c5a6e14aa38433dd0.png",
    url: "/app/nouns"
  },
  {
    title: 'Nouns auction page',
    description: 'Bid on your next Nouns',
    image: "https://docs.fastdapp.xyz/assets/images/nouns_1-b5b149026d4af10c5a6e14aa38433dd0.png",
    url: "/app/nouns"
  },
  {
    title: 'Nouns auction page',
    description: 'Bid on your next Nouns',
    image: "https://docs.fastdapp.xyz/assets/images/nouns_1-b5b149026d4af10c5a6e14aa38433dd0.png",
    url: "/app/nouns"
  },
  {
    title: 'Nouns auction page',
    description: 'Bid on your next Nouns',
    image: "https://docs.fastdapp.xyz/assets/images/nouns_1-b5b149026d4af10c5a6e14aa38433dd0.png",
    url: "/app/nouns"
  },
]

function QuoteIcon(props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Amazing DApps
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Try some of the featured DApps, you like one? Get the code and remix it!
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, testimonialIndex) => (
            <a href={testimonial.url} 
              class="overflow-hidden  aspect-video bg-red-400 cursor-pointer rounded-xl relative group"
            >
              <div
                class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end"
              >
                <div>
                  <div
                    class="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out"
                  >
                    <div class="font-bold">{testimonial.title}</div>

                    <div class="opacity-60 text-sm ">
                      {testimonial.description}
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                class="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={testimonial.image}
              />
            </a>
          ))}
        </ul>
      </Container>
    </section>
  )
}
