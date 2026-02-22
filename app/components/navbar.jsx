'use client';

import { useLanguage } from '@/context/LanguageContext';
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';

const LANGS = ['en', 'ru', 'uz'];

const NAV_LINKS = [
  { href: '/#about', key: 'about' },
  { href: '/#experience', key: 'experience' },
  { href: '/#skills', key: 'skills' },
  { href: '/#education', key: 'education' },
  { href: '/#projects', key: 'projects' },
];

function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent relative z-50">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
            {personalData.name.split(' ')[0].toUpperCase()}
          </Link>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center md:space-x-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href={link.href}>
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {t('nav', link.key)}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: lang buttons + hamburger */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-200 border ${
                  lang === l
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white border-transparent'
                    : 'bg-transparent text-gray-400 border-gray-600 hover:text-white hover:border-gray-400'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white p-1 rounded-md hover:bg-[#1a1443] transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-[#0d1224] border border-[#1b2c68a0] rounded-lg mx-0 mb-4 py-2 shadow-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 text-sm text-white hover:text-pink-600 hover:bg-[#1a1443] transition-colors duration-200 border-b border-[#1b2c68a0] last:border-b-0"
            >
              {t('nav', link.key)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
