import Image from "next/image"

export default async function MovieDetail({ params }) {
  const { movie } = params
  const imagePath = "https://image.tmdb.org/t/p/original"
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
  )
  const res = await data.json()

  return (
    <div className="m-20 mobile:m-10">
      <div className="">
        <h2 className="text-4xl">{res.title}</h2>
        <h1 className="text-lg ">{res.release_date}</h1>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2 className="bg-green-600 inline-block my-2 py-2 px-4 rounded-lg text-sm">
          {res.status}
        </h2>
      </div>
      <Image
        className="my-12 w-1/2 mobile:w-5/6"
        src={imagePath + res.backdrop_path}
        alt={res.title}
        width={1000}
        height={1000}
        priority
      />
      <div className="my-12 w-1/2 mobile:w-5/6">
        <p className="text-lg mobile:text-base">{res.overview}</p>
      </div>
    </div>
  )
}
