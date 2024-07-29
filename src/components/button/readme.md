# Button

Компонент позволяет выбрать тег button или встроенный в next js Link (а). 

Кнопка затипизирована в src/types.ts

```ts
// Button.tsx

export interface ButtonProps {
    tag: 'button' | 'link'
    type?: 'button' | 'submit'
    text: string
    ariaLabel: string
    href?: Url | string
    className?: string
    modalContent?: string | ReactNode
}
```

Если мы выбираем `tag='link'`, нам надо прописать href, text, ariaLabel.
Если `tag='button'` - type, ariaLabel, text.

## Accessibility

Обязательным является для button и Link(a) атрибует aria-label, его можно внести, указав

```tsx
ariaLabel='Назначение кнопки'
```

### button

Укажите type (button, submit). Это необязательно, но в типах и в компонентне прописано.

## Подключение модального окна

В кнопке сразу прописано действие при клике 

```tsx
onClick={handleButtonClick}
```

Это действие нужно для вывода модального окна. Это очень удобно, чтобы не писать каждый раз для кнопки новое модальное окно и взаимодействие с ним. Достаточно в кнопке указать

```tsx
modalContent='Спасибо за нажатие!'
```

### Как описать содержимое модального окна не одной строчкой?

Вдруг в модальное окно понадобится вставить форму или просто больше контента?

```tsx
modalContent={
    <>
        <h3>Заголовок</h3>
        <ContactForm />
    </>
}
```

Внутри фигурных скобок атрибута modalContent благодаря типизации у нас полноценный ReactNode, так что вставляйте компоненты, вёртску - делайте модалку на месте, не описывая её работу