import { ColorItem, ColorPalette, Title } from '@storybook/addon-docs/blocks'
import token from '@latimeria/design-token'
import type { ReactNode } from 'react'

export const BasicColors = (): ReactNode => {
  return (
    <div>
      <Title>Basic Colors</Title>
      <p>
        CSSでは
        <code>--token-[variableType]-[title]-[kind]</code>
        の形で変数を指定できます
      </p>
      <p>
        例えば、色を指定する場合に
        <code>[title]</code>
        が
        <code>[black]</code>
        、
        <code>[kind]</code>
        が
        <code>[default]</code>
        の場合は
        <code>--token-color-black-default</code>
        になります。
      </p>
      <p>
        しかしながら、Basic Colorsから変数を直接使用することは必ずしもいいこととは限りません。
        そのため、基本はSematic Colorsを使用するか、あるいは作成することを推奨します。
      </p>
      <ColorPalette>
        <ColorItem
          title="token.color.white"
          subtitle="white colors"
          colors={{
            default: token.token.color.white.default,
          }}
        />
        <ColorItem
          title="token.color.black"
          subtitle="black colors"
          colors={{
            default: token.token.color.black.default,
            truely: token.token.color.black.truely,
            highlight: token.token.color.black.hightlight,
            shadow: token.token.color.black.shadow,
          }}
        />
        <ColorItem
          title="token.color.gray"
          subtitle="gray colors"
          colors={{
            default: token.token.color.gray.default,
            text: token.token.color.gray.text,
          }}
        />
        <ColorItem
          title="token.color.blue"
          subtitle="blue colors"
          colors={{
            300: token.token.color.blue['300'],
            400: token.token.color.blue['400'],
            500: token.token.color.blue['500'],
            600: token.token.color.blue['600'],
            700: token.token.color.blue['700'],
          }}
        />
        <ColorItem
          title="token.color.light-blue"
          subtitle="light blue colors"
          colors={{
            400: token.token.color['light-blue']['400'],
            500: token.token.color['light-blue']['500'],
            600: token.token.color['light-blue']['600'],
          }}
        />
        <ColorItem
          title="token.color.light-blue"
          subtitle="light blue colors"
          colors={{
            800: token.token.color['dark-blue']['800'],
            900: token.token.color['dark-blue']['900'],
            1000: token.token.color['dark-blue']['900'],
          }}
        />
        <ColorItem
          title="token.color.green"
          subtitle="green colors"
          colors={{
            400: token.token.color.green['400'],
            500: token.token.color.green['500'],
            600: token.token.color.green['600'],
          }}
        />
        <ColorItem
          title="token.color.red"
          subtitle="red colors"
          colors={{
            500: token.token.color.red['500'],
            600: token.token.color.red['600'],
            700: token.token.color.red['700'],
          }}
        />
        <ColorItem
          title="token.color.purple"
          subtitle="purple colors"
          colors={{
            400: token.token.color.purple['400'],
            500: token.token.color.purple['500'],
            600: token.token.color.purple['600'],
          }}
        />
        <ColorItem
          title="token.color.violet"
          subtitle="violet colors"
          colors={{
            375: token.token.color.violet['375'],
            450: token.token.color.violet['450'],
            525: token.token.color.violet['525'],
          }}
        />
        <ColorItem
          title="token.color.yellow"
          subtitle="yellow colors"
          colors={{
            400: token.token.color.yellow['400'],
            450: token.token.color.yellow['450'],
            500: token.token.color.yellow['500'],
          }}
        />
        <ColorItem
          title="token.color.orange"
          subtitle="orange colors"
          colors={{
            default: token.token.color.orange.default,
          }}
        />
      </ColorPalette>
    </div>
  )
}

export const SematicColors = (): ReactNode => {
  return (
    <div>
      <Title>Sematic Colors</Title>
      <p>
        CSSでは
        <code>--semantic-[title]-[kind]</code>
        の形で変数を指定できます
      </p>
      <p>
        例えば、
        <code>[title]</code>
        が
        <code>[semantic.color]</code>
        、
        <code>[kind]</code>
        が
        <code>[primary]</code>
        の場合は
        <code>--semantic-color-primary</code>
        になります。
      </p>
      <p>
        Sematic Colorsは、基本的に意味のある色を指します。
        プライマリカラーや、 コンポーネントに由来する色がSematic Colorsに該当します。
      </p>
      <ColorPalette>
        <ColorItem
          title="semantic.color"
          subtitle="major colors"
          colors={{
            primary: token.semantic.color.primary,
            secondly: token.semantic.color.secondly,
            tertiary: token.semantic.color.tertiary,
            accent: token.semantic.color.accent,
          }}
        />
        <ColorItem
          title="semantic.background"
          subtitle="background colors"
          colors={{
            white: token.semantic.background.white,
            dark: token.semantic.background.dark,
          }}
        />
        <ColorItem
          title="semantic.text"
          subtitle="text colors"
          colors={{
            dark: token.semantic.text.dark,
            white: token.semantic.text.white,
            supple: token.semantic.text.supple,
          }}
        />
        <ColorItem
          title="semantic.shadow"
          subtitle="shadow color"
          colors={{
            default: token.semantic.shadow.default,
          }}
        />
        <ColorItem
          title="semantic.link"
          subtitle="link colors"
          colors={{
            default: token.semantic.link.default,
            active: token.semantic.link.active,
          }}
        />
      </ColorPalette>
    </div>
  )
}
