import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'

import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locals = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const // read only

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}

export const defaultNameSpace = 'home'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // ngôn ngữ mặc định
    ns: ['home', 'product'],
    fallbackLng: 'vi', // trường hợp không biết ngôn ngữ nào,
    defaultNS: defaultNameSpace,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
