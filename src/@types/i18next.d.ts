import 'i18next'
import { defaultNameSpace, resources } from 'src/i18n/i18n'

declare module 'i18next' {
  // Kế thừa ( thêm vào type )
  interface CustomTypeOptions {
    defaultNS: typeof defaultNameSpace
    resources: typeof resources['vi']
  }
}
