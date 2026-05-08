import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {

  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {

    i18n.changeLanguage(lng)

    document.documentElement.dir =
      lng === "ar"
        ? "rtl"
        : "ltr"

    localStorage.setItem("lng", lng)
  }

  return (
    <div className="flex items-center gap-2">

      <button
        onClick={() => changeLanguage("en")}
        className={`
          px-3 py-1 rounded-lg border
          ${i18n.language === "en"
            ? "bg-white text-black"
            : "bg-transparent text-white border-white/20"}
        `}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("ar")}
        className={`
          px-3 py-1 rounded-lg border
          ${i18n.language === "ar"
            ? "bg-white text-black"
            : "bg-transparent text-white border-white/20"}
        `}
      >
        AR
      </button>

    </div>
  )
}

export default LanguageSwitcher