import Link from "next/link"
import Image from "next/image"

export default function Movie({ title, release_date, poster_path, id }) {
  const img_url = 'https://image.tmdb.org/t/p/w1280';
  return (
    <div className="">
      <h1>{title}</h1>
      <h2>{release_date}</h2>
      <Link href={`/${id}`}>
        <Image
          className=""
          src={img_url + poster_path}
          width={250}
          height={250}
          alt={title}
          priority
        />
      </Link>
    </div>
  )
}
