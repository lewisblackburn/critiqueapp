import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link } from "blitz"
import React, { useState } from "react"
import { RiAddFill, RiBookmarkFill, RiHeartFill, RiStarFill } from "react-icons/ri"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const currentUser = useCurrentUser()
  const [term, setTerm] = useState("")
  return (
    <div className="container mx-auto flex items-center justify-between h-32">
      <div className="flex items-center">
        <Link href="/">
          <a className="text-lg font-serif font-bold tracking-wide">
            critique<span className="text-yellow-500 font-bold">.</span>
          </a>
        </Link>
      </div>
      <div className="w-full mx-20">
        <form action={`/search/${term}`}>
          <input
            className="appearance-none block w-full bg-woodsmoke-900 text-woodsmoke-50 rounded leading-tight focus:outline-none"
            type="text"
            placeholder="Search..."
            onChange={(e: any) => {
              setTerm(e.target.value)
            }}
          />
        </form>
      </div>
      {currentUser ? (
        <div className="flex items-center">
          <Link href="/movies/new">
            <a className="mr-6">
              <RiAddFill className="text-xl" />
            </a>
          </Link>
          <Link href="/favourites">
            <a className="mr-6">
              <RiHeartFill className="text-red-500 text-xl" />
            </a>
          </Link>
          <Link href="/reviews">
            <a className="mr-6">
              <RiBookmarkFill className="text-xl" />
            </a>
          </Link>
          <Link href="/ratings">
            <a className="mr-6">
              <RiStarFill className="text-yellow-500 text-xl" />
            </a>
          </Link>
          <Link href={`/${currentUser.name}`}>
            <a className="">{currentUser.name}</a>
          </Link>
        </div>
      ) : (
        <div className="flex w-full justify-end">
          <div className="grid grid-flow-col gap-5">
            <Link href="/signup">
              <a className="bg-woodsmoke-500 text-woodsmoke-50 text-xs font-bold uppercase rounded py-2 px-4">
                <strong>Sign Up</strong>
              </a>
            </Link>
            <Link href="/login">
              <a className="bg-woodsmoke-500 text-woodsmoke-50 text-xs font-bold uppercase rounded py-2 px-4">
                <strong>Login</strong>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
