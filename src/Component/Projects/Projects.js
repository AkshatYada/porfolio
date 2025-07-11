import React, { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import clsx from "clsx"

const slides = [
  {
    src: "/ProjectLogo/upEvent.png",
    title: "UpEvent",
    description: "myUpEvent is a smart event management platform streamlining event creation, registration, and engagement for students and organizers alike",
    link: "/projects/1", // optional for routing
  },
  {
    src: "/ProjectLogo/degitalMenu.png",
    title: "Degital Menu",
    description: "A digital menu is an interactive, electronic menu display that allows users to browse food or product options, view descriptions, and make selections through digital devices like tablets or smartphones.",
    link: "https://meennnuuuu.netlify.app/",
  },
  {
    src: "/project1.jpg",
    title: "Project 3",
    description: "Advanced features demoed here.",
    link: "/projects/3",
  },
]

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="w-full bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8">
          Projects
        </h1>
        {/* Carousel */}
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full relative p-4 flex flex-col items-center justify-center"
              >
                <div className="w-full h-[300px]">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="rounded-xl w-full h-full object-contain shadow-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">{slide.title}</h3>
                <p className="text-sm text-gray-300 text-center mt-1">{slide.description}</p>
  
                <a
                  href={slide.link}
                  className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Explore
                </a>
              </div>
            ))}
          </div>
        </div>
  
        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={scrollPrev}
            className="rounded-full p-2 border bg-white text-black hover:bg-gray-100 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
  
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={clsx(
                  "w-3 h-3 rounded-full transition-colors",
                  selectedIndex === index
                    ? "bg-blue-600"
                    : "bg-gray-500 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
  
          <button
            onClick={scrollNext}
            className="rounded-full p-2 border bg-white text-black hover:bg-gray-100 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
  
}
