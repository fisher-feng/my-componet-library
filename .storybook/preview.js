import {} from '@fortawesome/fontawesome-svg-core'
import { faS } from '@fortawesome/free-solid-svg-icons'
import '../src/styles/index.scss'
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },//on开头的为action
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}