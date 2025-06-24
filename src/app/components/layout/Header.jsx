"use client"
import { useTranslations, useLocale } from 'next-intl'
import { locales, localesFullyWritten } from '@/src/i18n/locales'
import { Link } from '@/src/i18n/navigation'
import { useState } from "react"
import CTAButton from "../ui/buttons/ButtonCTA"

/**
 * Navigation link component for the header
 */
const NavLink = ({ to = "#", onClick = () => {}, children }) => {
  return (
    <button
      onClick={onClick}
      className="max-lg:mx-auto lg:my-auto w-fit text-center max-lg:text-base-content hover:text-gray-500 hover:underline transition-colors"
    >
      <a href={to}>
        {children}
      </a>
    </button>
  )
}

/**
 * Header component with navbar and CTA button
 */
export default function Header() {
  const [showNavMenu, setShowNavMenu] = useState(false)
  const toggleNavMenu = () => {
    setShowNavMenu(!showNavMenu)
  }

  const t = useTranslations("Header")
  const currentLocale = useLocale()
  return (
    <div className="navbar py-3 bg-base-100 border-b-[0.5px] justify-between">
      <div className="navbar-start w-fit">
        <h2 className="my-auto text-xl md:text-3xl font-bold text-center">
          Yamine Daroueche
        </h2>

        {/* Language selection list */}
        <ul className="menu menu-horizontal ml-2 px-1 rounded-md">
          <li>
            <details>
              <summary>
                {/* Language icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                </svg>
                {localesFullyWritten[currentLocale]}
              </summary>
              <ul className="w-full flex flex-col justify-center items-center rounded-t-none">
                {locales.filter(locale => currentLocale != locale).map(locale => (
                  <li key={locale} className="text-center w-full">
                    <Link
                      className="flex justify-center items-center w-full"
                      href="/portfolio"
                      locale={locale}  
                    >
                      {localesFullyWritten[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="navbar-end mr-1 max-lg:w-fit">
        <div className="hidden p-0 lg:flex justify-between text-2xl w-full">
          <NavLink to={`/${currentLocale}/portfolio`}>{t("home")}</NavLink>
          <NavLink to="#about">{t("about")}</NavLink>
          <NavLink to="#projects">{t("projects")}</NavLink>
          <CTAButton>{t("contact")}</CTAButton>
        </div>

        {/* NavMenu toggler (hidden on large viewport) */}
        <button onClick={toggleNavMenu} className="lg:hidden btn text-base-content bg-transparent border-0 shadow-none transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="none"
            viewBox="0 0 45 27"
            className="text-inherit"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M0 1.5h45M0 13.5h45M0 25.5h45"
            ></path>
          </svg>
        </button>
      </div>

      {/* NavMenu (hidden on large viewport) */}
      {showNavMenu && (
        <div className="lg:hidden border-b fixed z-1 top-0 left-0 w-full h-[80vh] flex flex-col justify-between bg-base-100">
          <button onClick={toggleNavMenu} className="btn mt-3 me-3 p-0 w-fit self-end text-base-content bg-transparent border-0 shadow-none transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="pt-20 h-[70vh] flex flex-col gap-6 text-2xl">
            <NavLink to={`/${currentLocale}/portfolio`} onClick={toggleNavMenu}>{t("home")}</NavLink>
            <NavLink to="#about" onClick={toggleNavMenu}>{t("about")}</NavLink>
            <NavLink to="#projects" onClick={toggleNavMenu}>{t("projects")}</NavLink>
            <CTAButton onClick={toggleNavMenu}>{t("contact")}</CTAButton>
          </div>
        </div>
      )}
    </div>
  )
}