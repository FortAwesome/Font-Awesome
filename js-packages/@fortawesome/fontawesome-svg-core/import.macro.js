const { createMacro, MacroError } = require('babel-plugin-macros')
const { addNamed } = require('@babel/helper-module-imports')

module.exports = createMacro(importer, {
  configName: 'fontawesome-svg-core'
})

const styles = [
  'solid',
  'regular',
  'light',
  'thin',
  'duotone',
  'brands'
]

function importer ({references, state, babel, source, config}) {
  const license = (config !== undefined ? config.license : 'free')

  if (!['free', 'pro'].includes(license)) {
    throw new Error(
      "config license must be either 'free' or 'pro'"
    )
  }

  Object.keys(references).forEach((key) => {
    replace({
      style: key,
      license: (key === 'brands' ? 'free' : license),
      references: references[key],
      state,
      babel,
      source
    })
  })
}

function replace ({ style, license, references, state, babel, source }) {
  references.forEach((nodePath) => {
    if (canBeReplaced({ nodePath, babel, state, style })) {
      const iconName = nodePath.parentPath.node.arguments[0].value
      const name = `fa${capitalize(camelCase(iconName))}`
      const importFrom = `@fortawesome/${license}-${style}-svg-icons/${name}`

      const importName = addNamed(nodePath, name, importFrom)

      nodePath.parentPath.replaceWith(importName)
    }
  })
}

function canBeReplaced ({ nodePath, babel, state, style }) {
  const { types: t } = babel
  const { parentPath } = nodePath

  if (!styles.includes(style)) {
    throw parentPath.buildCodeFrameError(
      `${style} is not a valid style. Use one of ${styles.join(', ')}`,
      MacroError
    )
  }

  if (parentPath.node.arguments) {
    if (parentPath.node.arguments.length !== 1) {
      throw parentPath.buildCodeFrameError(
        `Received an invalid number of arguments (must be 1)`,
        MacroError
      )
    }

    if (
      parentPath.node.arguments.length === 1 &&
      t.isStringLiteral(parentPath.node.arguments[0]) &&
      nodePath.parentPath.node.arguments[0].value.startsWith('fa-')
    ) {
      throw parentPath.buildCodeFrameError(
        `Don't begin the icon name with fa-, just use ${nodePath.parentPath.node.arguments[0].value.slice(3)}`,
        MacroError
      )
    }

    if (parentPath.node.arguments.length === 1 && !t.isStringLiteral(parentPath.node.arguments[0])) {
      throw parentPath.buildCodeFrameError(
        'Only string literals are supported when referencing icons (use a string here instead)',
        MacroError
      )
    }
  } else {
    throw parentPath.buildCodeFrameError(
      'Pass the icon name you would like to import as an argument.',
      MacroError
    )
  }

  return true
}

function capitalize (str) {
  return str[0].toUpperCase() + str.slice(1)
}

function camelCase (str) {
  return str
    .split('-')
    .map((s, index) => {
      return (
        (index === 0 ? s[0].toLowerCase() : s[0].toUpperCase()) +
        s.slice(1).toLowerCase()
      )
    })
    .join('')
}
