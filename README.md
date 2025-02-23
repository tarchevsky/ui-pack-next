# ui-pack-next | version 0.2.0

Это обновляющаяся современная версия библиотеки ui-pack, основанная на:

- next js
- tailwindcss
- daisyUI
- framer-motion
- ui-pack

## Ценность сборки и смысл проекта

Для лёгкого старта проектов на next js. Идея, давшая старт проекту - желание избавиться от большинства рутинных действий и сделать простым то, что в начале карьеры казалось магией.

В этой сборке реализованы:

- быстрая установка размеров контейнера
- переключение тем с сохранением состояния
- простая форма
- анимация подзагрузки блоков
- бесконечный скролл картинок
- легкий бургер
- крутой дефолтный слайдер (карусель с пагинацией)
- карусель, заходящая за границы экрана
- одностраничный квиз с анимациями и сохранением полей и текущего шага
- быстрая вставка метрики
- кнопка перемотки страницы наверх

## Установка, основные принципы

```shell
yarn create next-app -e https://github.com/tarchevsky/ui-pack-next
```

В качестве package manager используется bun, по крайней мере пока.

### Создание страниц

Настройка создания страниц - в файле `create-page.js`
Команда для создания страницы:

```shell
bun create:page <name> --title="Название страницы" --description="Описание страницы"
```

Создание дескрипшена опционально, если не создадите, то он просто не пропишется в мета-тегах.

### Начало работы

Для начала надо определить переменные контейнеров и отступов. Это делается в `./constants/theme.constants.ts`

Константы

```tsx
export const THEME = 'cupcake'
export const DARK_THEME = 'dim'
```

отвечают за дефолтные темы с предустановками. Посмотреть существующие темы можно в [daisyUI](https://daisyui.com/docs/themes/)

Если разделение на темы нужно, просто укажите нужную тему (даже если она тёмная) в THEME, а в компоненте Header.tsx удалите блок

```tsx
<li className='justify-center'>
	<ThemeToggle />
</li>
```

Константы

```tsx
export const ind_xs = '0 0 10px 0'
export const ind_sm = '0 0 20px 0'
export const ind_md = '0 0 50px 0'
export const ind_xxl = '0 0 100px 0'
```

отвечают за отступы в margin и сделаны для отступов между блоками. Удобно, чтобы сразу указать адаптацию отступов и сразу про них забыть, а также чтобы не путать и не делать вручную отступы то сверху от блока, то снизу, как бывает при стихийной вёрстке.

Контстанты

```tsx
export const cont_xs = '16px'
export const cont_sm = '40px'
export const cont_md = '100px'
export const cont_xxl = '200px'
```

нужны для контейнера с адаптацией.

Если хотите сами детально настроить тему, обращайтесь к файлу `tailwind.config.ts`, пару примечаний по функциям.

- `.cont-left` и `.cont-right` - классы на случай, если по макету нужно, чтобы контейнер был только слева или справа. Полезно для каруселей.

#### Компоненты

##### Header

Включает в себя компонент Burger и ThemeToggle для переключения темы.

Есть дополнительное свойство highlighting. Если указать при выводе компонента `<Header highlighting />, текущая страница в меню, если она есть, будет подсвечиваться. Оформление править в теге

```tsx
<Link
	className={cn('px-[10px] btn font-normal', {
		'btn-primary text-base-100':
				highlighting && item.path === pathname,
			'btn-ghost':
				!highlighting || (highlighting && item.path !== pathname)
	})}
```

##### PageHeading

Позволяет настроить Heading типовых страниц
Если указать ind

```tsx
<PageHeading title='Название страницы' ind />
```

У заголовка появится отступ из констант.

##### FadeIn - эффект всплытия блоков при скролле и первой загрузке блоков

Сделан на основе библиотеки framer-motion.

В FadeIn надо оборачивать блоки, которые мы хотим анимировать при загрузке/переходе.

Компонент FadeIn также по-умолчанию содержит класс .cont - который создаёт отступы контейнера. Таким образом FadeIn - это предусмотренный основной контейнер для блоков на сайте.

```tsx
<FadeIn className='cont'>
	<h1>Hello</h1>
</FadeIn>
```

! Если мы создаём блок без полей, то есть на полную ширину, то нам достаточно написать компонент так:

```tsx
<FadeIn></FadeIn>
```

Также полезная функция. По-умолчанию FadeIn - это div-контейнер. Но при вставке на странице можно указать тег, вот список доступных тегов (из типов types.ts > LayoutProps):

```tsx
tag?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'article'
```

##### Quiz

Компонент позволяет настроить поля одним файлом указания полей.

Если укажете в объявлении компонента `Quiz` steps, компонент будет показывать навигацию по количество выполненных и оставшихся шагов.

#### Список улучшений и удобств для разработчика

Многие библиотеки не учитывают реальный опыт разработки. Допустим, при создании квиза я вспомнил, как часто приходится делать textarea и настраивать его под работу телефонов с учетом, например, работы ios. Поэтому были введены атрибуты, типа `enterKeyHint='done'`. Здесь будет список улучшений и удобств для разработчика.

1. в мобильных устройствах при работе с textarea при фокусе экран увеличивается, что не удобно по ux, потому что пользователю надо снова делать zoom-out пальцами в нормальное состояние сайта. Для этого

- в layout добавлен мета -

```tsx
<meta
	name='viewport'
	content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
/>
```

- добавлен полю принудительный размер 16px в виде tailwind класса `text-base`

2. для улучшения опыта взаимодействия и облегчения ввода текста с телефонов добавлен атрибут `enterKeyHint='done'`

##### Modal

Модальное окно с возможностью вставки как простого текста, так и компонентов. Есть несколько способов использования:

1. Базовое использование:

```tsx
const modalRef = useRef<ModalHandle>(null)

const handleButtonClick = () => {
	if (modalRef.current) {
		modalRef.current.showModal()
	}
}
```

Подключение в компоненте внутри return

```tsx
<Modal ref={modalRef} message='Это сообщение в модальном окне!' />
```

2. Расширенное использование с кастомным контентом:

```tsx
<Modal ref={modalRef}>
	<div>Любой контент</div>
</Modal>
```

3. Через компонент Button (самый простой способ):

```tsx
<Button
	tag='button'
	text='Открыть модальное окно'
	ariaLabel='Открыть модальное окно'
	modalContent='Текст в модальном окне'
/>
```

4. Через компонент Button с расширенным контентом:

```tsx
<Button
	tag='button'
	text='Открыть модальное окно'
	ariaLabel='Открыть модальное окно'
	modalContent={
		<>
			<h3>Заголовок</h3>
			<ContactForm />
		</>
	}
/>
```

5. В Hero компоненте с формой обратной связи:

```tsx
<Hero
	src='/image.jpg'
	alt='Alt текст'
	title='Заголовок'
	buttonText='Обратная связь'
	modalContent={<ModalContactForm fields={contactFormFields} />}
/>
```

Модальное окно автоматически закрывается по кнопке "Закрыть". Также поддерживает callback `onClose` для выполнения действий при закрытии.

Если модальное окно используется в ContactForm, Quiz или Hero, вы можете указывать сообщение, которое будет отображаться в модальном окне:

```tsx
<ContactForm fields={fields} message='Ваше сообщение' />
```

или

```tsx
<Hero
	src='/fog-sea.jpg'
	alt='Альт картинки'
	title='Заголовок'
	buttonText='Обратная связь'
	modalContent={
		<ModalContactForm fields={contactFormFields} message='Моё сообщение' />
	}
/>
```

6. Кнопка закрытия модального окна.

При указании компонента если надо, чтобы вместо кнопки закрыть была иконка, надо указать closeIcon

```tsx
<Modal ref={modalRef} closeIcon>
	<div>Любой контент</div>
</Modal>
```

7. Компоненты, которые используют модальное окно.

- ContactForm
- Quiz
- Hero

Достаточно при выводе компонентов на страницу указать свойство closeIcon и вместо закрыть будет иконка крестик.

##### Carousel

Карусель или слайдер. В странице со слайдером создаём документ с перечислением слайдов и свойств, как в примере

```ts
import type { SlidesProps } from '@/types'

export const carousel: SlidesProps[] = [
	{
		id: 1,
		src: '/fog-sea.jpg',
		alt: 'описание картинки',
		title: 'Текст 1',
		description: 'Описание'
	},
	{
		id: 2,
		src: '/forest-river.jpg',
		alt: 'описание картинки',
		title: 'Текст 2',
		description: 'Описание'
	},
	{
		id: 3,
		src: '/more-dark.jpg',
		alt: 'описание картинки',
		title: 'Текст 3',
		description: 'Описание'
	}
]
```

И к странице подключаем компонент

```tsx
<Carousel slides={carousel} />
```

У слайдера возможность выбирать вариант расположения навигационных стрелок. Ниже слайдера и по бокам. Для выбора варианта со стрелками по сторонам добавляем свойство

```tsx
<Carousel slides={carousel} navigationPosition='side' />
```

или

```tsx
<Carousel slides={carousel} navigationPosition='bottom' />
```

Также для быстрой настроки добавлены две конфигурации для адаптации

Стрелки сбоку

```tsx
<Carousel
	slides={carousel}
	navigationPosition='side'
	height={{
		mobile: '300px',
		desktop: '600px'
	}}
	sideNavWidth={{
		mobile: '90%', // Уменьшаем ширину на мобильных для дополнительного отступа
		desktop: '85%'
	}}
/>
```

Стрелки снизу

```tsx
<Carousel
	slides={carousel}
	navigationPosition='bottom'
	bottomNav={{
		marginBottom: {
			mobile: '45px',
			desktop: '60px'
		},
		arrowsOffset: {
			mobile: '35px',
			desktop: '60px'
		}
	}}
/>
```

И можно задать размер стрелок

```tsx
<Carousel
	slides={carousel}
	navigationPosition='side'
	sideNavWidth={{
		mobile: '95%', // Уменьшаем ширину на мобильных для дополнительного отступа
		desktop: '85%'
	}}
/>
```

Также можно настроить пагинацию - внутри и снаружи с отступами

<Carousel
slides={carousel}
paginationPosition='outside'
pagination={{
					offset: {
						mobile: '30px',
						desktop: '30px'
					}
				}}
/>

Вот полная версия на всякий случай

```tsx
<Carousel
	slides={carousel}
	navigationPosition='side'
	paginationPosition='outside'
	height={{
		mobile: '300px',
		desktop: '600px'
	}}
	bottomNav={{
		marginBottom: {
			mobile: '45px',
			desktop: '60px'
		},
		arrowsOffset: {
			mobile: '35px',
			desktop: '60px'
		}
	}}
	sideNavWidth={{
		mobile: '95%', // Уменьшаем ширину на мобильных для дополнительного отступа
		desktop: '85%'
	}}
	pagination={{
		offset: {
			mobile: '30px',
			desktop: '30px'
		}
	}}
/>
```
