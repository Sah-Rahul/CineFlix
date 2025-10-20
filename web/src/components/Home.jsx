import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from "./NavBar";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const movies = [
    {
      id: 1,
      title: "Oppenheimer",
      description:
        "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
      image:
        "https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    },
    {
      id: 2,
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
      image:
        "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    },
    {
      id: 3,
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
      image:
        "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    },
    {
      id: 4,
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      image:
        "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    },
    {
      id: 5,
      title: "Avatar: The Way of Water",
      description:
        "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
      image:
        "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <NavBar />
      <div className="relative h-screen w-full text-white overflow-hidden">
        {/* Slides Container */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="min-w-full h-full relative">
              {/* Background Image */}
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>

              {/* Text Content */}
              <div className="absolute bottom-20 left-6 md:left-10 max-w-xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {movie.title}
                </h1>
                <p className="mb-6 text-sm md:text-base animate-fade-in">
                  {movie.description}
                </p>
                <div className="flex space-x-4 animate-fade-in">
                  <button className="bg-white text-black px-5 py-2 rounded hover:bg-gray-300 font-semibold transition flex items-center gap-2">
                    <span>▶</span> Play
                  </button>
                  <button className="bg-gray-700 bg-opacity-70 px-5 py-2 rounded hover:bg-gray-600 font-semibold transition flex items-center gap-2">
                    <span>ℹ</span> More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-red-600 w-8"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
