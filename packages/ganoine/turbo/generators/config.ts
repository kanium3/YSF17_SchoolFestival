import type { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('ganoine', {
    description: 'Create a basic component of Ganoine',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{ kebabCase name }}.tsx',
        templateFile: 'templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{ kebabCase name }}.module.css',
        templateFile: 'templates/component.module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/{{ kebabCase name }}.stories.tsx',
        templateFile: 'templates/component.story.tsx.hbs',
      },
    ],
  })
}
