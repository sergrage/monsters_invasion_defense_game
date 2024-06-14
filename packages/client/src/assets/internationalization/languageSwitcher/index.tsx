import React, { useState, useEffect, useRef } from "react";
import i18n from "i18next";
import style from "./LanguageSwitcher.module.scss";

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState("English");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef(null);
  const options = ["Russian", "English"];

  const handleLanguageChange = (lng: string, langName: string) => {
    changeLanguage(lng);
    setSelectedLang(langName);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    setFocusedIndex(-1);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
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
          handleLanguageChange(lang === "Russian" ? "ru" : "en", lang);
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
    selectedLang === "Russian"
      ? style.selectedLangRussian
      : style.selectedLangEnglish;

  return (
    <nav className={style.nav}>
      <div className={style.langMenu} ref={menuRef}>
        <div
          className={`${style.selectedLang} ${selectedLangClass}`}
          onClick={toggleMenu}
          tabIndex="0"
        >
          {selectedLang}
        </div>
        {isMenuOpen && (
          <ul className={style.dropdownMenu}>
            {options.map((lang, index) => (
              <li key={lang}>
                <a
                  href="#"
                  className={style[lang === "Russian" ? "ru" : "en"]}
                  onClick={e => {
                    e.preventDefault();
                    handleLanguageChange(
                      lang === "Russian" ? "ru" : "en",
                      lang,
                    );
                  }}
                  tabIndex="-1"
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
