import NavLinks from "./nav-links"

export default function Header() {

  return (
    <header>
      <nav className="bg-sky-900 flex">
        <div className="flex justify-center grow gap-8 p-4">
          <NavLinks />
        </div>
      </nav>
    </header>
  )
}