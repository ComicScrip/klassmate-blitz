import { Link } from "blitz"
import { useState } from "react"

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="block mt-4 md:inline-block md:mt-0 text-gray-300 hover:text-white mr-4">
        {children}
      </a>
    </Link>
  )
}

export default function Header() {
  const [menuIsHidden, setMenuIsHidden] = useState(true)
  const toggleMenuHidden = () => setMenuIsHidden((hidden) => !hidden)
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
        <div className="flex items-center flex-no-shrink text-white mr-16">
          <Link href="/">
            <a className="font-semibold text-xl tracking-tight">Klassmate</a>
          </Link>
        </div>
        <div
          className="block md:hidden"
          onClick={toggleMenuHidden}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            e.preventDefault()
            toggleMenuHidden()
          }}
        >
          <button className="flex items-center px-3 py-2 text-gray-200 hover:text-white">
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full ${menuIsHidden ? "hidden" : "block"} 
          md:flex-grow flex flex-col md:flex-row md:items-center md:w-auto`}
        >
          <div className="text-sm md:flex-grow">
            <NavLink href="/teams">Teams</NavLink>
            <NavLink href="/teamsets">Team lists</NavLink>
          </div>
          <div>
            <Link href="/profile">
              <a className="inline-block text-sm pt-4 md:pt-0 mt-5 md:mt-0 border-t md:border-t-0 border-gray-600 w-full text-gray-300 hover:text-white">
                Profile
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
