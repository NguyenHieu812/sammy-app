'use client'
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import ArrowUpIcon from '@/icon/ArrowUpIcon';

export default function Home() {
  const test = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
  const [films, setFilms] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [showButton, setShowButton] = useState(false)
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    const handleScrolToTopButtonVisiblity = () => {
      window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false)
    }
    window.addEventListener('scroll', handleScrolToTopButtonVisiblity)
    fetch(test)
      .then(res => res.json())
      .then(async (data) => {
        await (new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000)
        }));
        setIsLoaded(true)
        setFilms(data)
      }).catch((error) => {
        setIsLoaded(true);
        console.log("Co loi" + error);
      })
    return () => {
      window.removeEventListener('scroll', handleScrolToTopButtonVisiblity)
    }
  }, [])

  if (!isLoaded) {
    return <div className='body' style={{
      width: '100wh',
      height: '100vh',
      padding: 0,
      margin: 0,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1 className=''>Loading...</h1>
    </div>
  } else if (isLoaded) {
    return (
      <div className='w-full h-full'>
        <div className='w-screen h-20 bg-sky-700 text-center fixed'>
          <input className='border-none outline-none w-80 h-10 pl-2 rounded-xl mt-4' placeholder='Search...' type='text' onChange={(event) => { setSearchTerm(event.target.value) }} />
        </div>
        <div className='pt-20 px-10 mobile:px-14'>
          <div className='grid grid-cols-fluid gap-16'>
            {films.results.filter((film) => {
              if (searchTerm == "") {
                return film;
              } else if (film.title.toUpperCase().includes(searchTerm.toUpperCase())) {
                return film;
              }
            }).map(film => (
              <Movie
                key={film.id}
                id={film.id}
                title={film.title}
                poster_path={film.poster_path}
                release_date={film.release_date}
              />
            ))}
          </div>
        </div>
        <div className=''>
          {showButton && (
            <div className={`scrollToTop`}>
              <button className='fixed bottom-10 right-1 laptop:right-5 desktop:right-2 z-10 cursor-pointer mobile:p-3 laptop:p-3 desktop:p-3 rounded-full bg-purple-700' onClick={handleScrollToTop}>
                <ArrowUpIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
