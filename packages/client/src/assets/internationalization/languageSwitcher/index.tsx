import React, { useState } from "react";
import i18n from "i18next";
import style from "./LanguageSwitcher.module.scss";

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState("English");

  const handleLanguageChange = (lng: string, langName: string) => {
    changeLanguage(lng);
    setSelectedLang(langName);
  };

  // Determine the class name for the selected language
  const selectedLangClass =
    selectedLang === "Russian"
      ? style.selectedLangRussian
      : style.selectedLangEnglish;

  return (
    <nav className={style.nav}>
      <div className={style.langMenu}>
        <div className={`${style.selectedLang} ${selectedLangClass}`}>
          {selectedLang}
        </div>
        <ul>
          <li>
            <a
              href="#"
              className={style.ru}
              onClick={() => handleLanguageChange("ru", "Russian")}
            >
              Russian
            </a>
          </li>
          <li>
            <a
              href="#"
              className={style.en}
              onClick={() => handleLanguageChange("en", "English")}
            >
              English
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LanguageSwitcher;
