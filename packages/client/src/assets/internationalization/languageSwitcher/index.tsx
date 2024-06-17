import React, { useState, useEffect, useRef } from "react";
import i18n from "i18next";
import style from "./LanguageSwitcher.module.scss";

const LANGUAGES = {
  RUSSIAN: "Russian",
  ENGLISH: "English",
} as const;

type LanguageKeys = keyof typeof LANGUAGES;

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageKeys>("ENGLISH");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const options = Object.values(LANGUAGES);

  const langStyles = {
    RUSSIAN: style.selectedLangRussian,
    ENGLISH: style.selectedLangEnglish,
  };

  const handleLanguageChange = (lng: string, langName: LanguageKeys) => {
    changeLanguage(lng);
    setSelectedLang(langName);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    setFocusedIndex(-1);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isMenuOpen) return;

    switch (event.key) {
      case "ArrowDown":
        setFocusedIndex(prevIndex =>
          prevIndex < options.length - 1 ? prevIndex + 1 : 0,
        );
        break;
      case "ArrowUp":
        setFocusedIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : options.length - 1,
        );
        break;
      case "Enter":
        if (focusedIndex !== -1) {
          const lang = options[focusedIndex];
          handleLanguageChange(
            lang === LANGUAGES.RUSSIAN ? "ru" : "en",
            lang as LanguageKeys,
          );
        }
        break;
      case "Escape":
        setIsMenuOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, focusedIndex]);

  const selectedLangClass =
    langStyles[selectedLang] || style.selectedLangEnglish;

  return (
    <nav className={style.nav}>
      <div className={style.langMenu} ref={menuRef}>
        <div
          className={`${style.selectedLang} ${selectedLangClass}`}
          onClick={toggleMenu}
          tabIndex={0}
        >
          {LANGUAGES[selectedLang]}
        </div>
        {isMenuOpen && (
          <ul className={style.dropdownMenu}>
            {options.map((lang, index) => (
              <li key={lang}>
                <a
                  href="#"
                  className={style[lang === LANGUAGES.RUSSIAN ? "ru" : "en"]}
                  onClick={e => {
                    e.preventDefault();
                    handleLanguageChange(
                      lang === LANGUAGES.RUSSIAN ? "ru" : "en",
                      lang as LanguageKeys,
                    );
                  }}
                  tabIndex={-1}
                  style={{
                    backgroundColor:
                      focusedIndex === index ? "#f2f2f2" : "transparent",
                  }}
                >
                  {lang}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default LanguageSwitcher;
