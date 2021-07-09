import * as components from './components'

export * from './components'

/**
 * @param {import('vue').VueConstructor} Vue
 */
export default Vue => {
  Object.keys(components).forEach(name => {
    Vue.component(`C${name}`, components[name])
  })
}
