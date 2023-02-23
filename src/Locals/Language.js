// import React, { useEffect } from "react";
// import i18n from "i18next";
// import { useTranslation, initReactI18next } from "react-i18next";

// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//       translation: "tEn",
//     },
//     de: {
//       translation: "tDe",
//     },
//   },
//   lng: "en",
//   fallBackLng: "en",
//   interpolation: {
//     escapeValue: false,
//   },
// });

// const changeLang = (l) => {
//   return () => {
//     i18n.changeLanguage(l);
//     localStorage.setItem("lang", l);
//   };
// };

// const Language = () => {
//   const { t } = useTranslation();
//   useEffect(() => {
//     const currentLang = localStorage.getItem("lang");
//     i18n.changeLanguage(currentLang);
//   }, []);
// };

// export default Language;
