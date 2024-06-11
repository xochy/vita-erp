import { createI18n } from 'vue-i18n'
import en from './translations/en.json'
import es from './translations/es.json'

export const createInstance = () => {
  return createI18n({
    locale: localStorage.getItem('locale') || navigator.language || 'en',
    messages: {
      en,
      'en-US': en,
      es
    }
  })
}

export const i18n = createInstance()