# Компонент YandexMap

Компонент для отображения Яндекс Карт в React/Next.js приложении.

## Установка

Компонент не требует дополнительных зависимостей, кроме API-ключа Яндекс Карт.

API-ключ можно передать тремя способами:

1. Через переменную окружения (рекомендуемый способ):

```env
NEXT_PUBLIC_YA_MAP_API_KEY="ваш-api-ключ"
```

2. Напрямую в компоненте через prop apiKey:

```tsx
<YandexMap center={[55.757359, 37.602669]} apiKey='ваш-api-ключ' />
```

3. При импорте компонента:

```tsx
const YandexMap = ({ apiKey = 'ваш-api-ключ' }) => {
	// ...компонент
}
```

## Получение API-ключа

1. Зарегистрируйтесь в [Кабинете разработчика](https://developer.tech.yandex.ru/)
2. Создайте новое приложение
3. Получите API-ключ для JavaScript API и HTTP Геокодера

## Основное использование

```tsx
// Динамический импорт клиентского компонента без SSR
const YandexMap = dynamic(() => import('@/components/yandexMap/YandexMap'), {
	ssr: false
})

// Простой пример - карта с маркером в центре
;<YandexMap
	center={[55.757359, 37.602669]} // Координаты центра карты [широта, долгота]
	apiKey='ваш-api-ключ'
/>
```

> **Примечание:** Если параметр `markers` не указан, компонент автоматически добавит маркер в точке `center`. Это удобно, когда нужен только один маркер в центре карты.

## Способы указания координат

Координаты на карте можно указать несколькими способами:

1. Через проп `center`:

```tsx
<YandexMap center={[55.757359, 37.602669]} />
```

2. Через массив `markers`:

```tsx
<YandexMap markers={[{ coordinates: [55.757359, 37.602669] }]} />
```

3. Комбинированно (центр карты и маркеры в разных местах):

```tsx
<YandexMap
	center={[55.757359, 37.602669]}
	markers={[
		{ coordinates: [55.752574, 37.574856] },
		{ coordinates: [55.753574, 37.575856] }
	]}
/>
```

4. Использование дефолтных координат (центр Москвы):

```tsx
// Компонент уже содержит предустановленные координаты центра Москвы [55.757359, 37.602669], можно просто зайти в компонент и поправить пропсы
<YandexMap />
```

## Параметры (Props)

### center: [number, number]

Координаты центра карты в формате [широта, долгота].

- Пример: `[55.757359, 37.602669]`

### apiKey: string

API-ключ Яндекс Карт.

- Получить можно в кабинете разработчика Яндекс

### zoom: number

Уровень масштабирования карты.

- По умолчанию: `15`
- Диапазон: от 0 до 19

### height: string

Высота карты.

- По умолчанию: `'400px'`
- Можно указывать в px, rem, vh и других CSS единицах

### width: string

Ширина карты.

- По умолчанию: `'100%'`
- Можно указывать в px, rem, % и других CSS единицах

### className: string

CSS-класс для контейнера карты. Особенно полезен при использовании Tailwind CSS.

- При использовании className параметры width и height игнорируются
- Пример с Tailwind CSS: `className="w-full h-[500px]"`

```tsx
// Использование с Tailwind CSS
<YandexMap
  center={[55.757359, 37.602669]}
  className="w-full h-[500px] rounded-lg shadow-lg"
/>

// Использование со стандартными размерами
<YandexMap
  center={[55.757359, 37.602669]}
  width="100%"
  height="500px"
/>
```

### markers: Array<Marker>

Массив маркеров для отображения на карте.

- По умолчанию: если не указано, будет создан один маркер в точке center
- Подробнее о структуре маркера см. раздел "Типы маркеров"

### clusterer: boolean

Включает группировку близко расположенных маркеров.

- По умолчанию: `false`

### controls: Array<Control>

Набор элементов управления на карте.

- По умолчанию: `['zoomControl']`
- Доступные значения: см. раздел "Доступные элементы управления"

### behaviors: Array<Behavior>

Список разрешенных действий с картой.

- По умолчанию: `['drag', 'scrollZoom', 'dblClickZoom']`
- Доступные значения: см. раздел "Доступные поведения карты"

### style: React.CSSProperties

Дополнительные CSS-стили для контейнера карты.

- По умолчанию: `{}`

### Типы маркеров (Marker)

```typescript
interface Marker {
	coordinates: [number, number] // Координаты маркера [широта, долгота]
	color?: string // Цвет маркера (red, darkOrange, nightBlue, black, blue, darkBlue, pink, violet, yellow, brown, orange, darkGreen, lightBlue, green, grey)
	title?: string // Заголовок в балуне
	description?: string // Описание в балуне
	openByDefault?: boolean // Открыть балун при инициализации
	balloonStyle?: {
		balloonContentLayout?: string // Кастомный HTML-шаблон для балуна
		balloonPanelMaxMapArea?: number // Максимальная площадь карты, при которой балун будет отображаться в виде панели
		balloonAutoPan?: boolean // Автоматическое позиционирование карты при открытии балуна
		openBalloonOnClick?: boolean // Открывать балун при клике
		hideIconOnBalloonOpen?: boolean // Скрывать иконку при открытии балуна
		balloonOffset?: [number, number] // Смещение балуна относительно метки [x, y]
	}
	iconStyle?: {
		iconLayout?: string // Макет иконки метки
		iconImageHref?: string // URL изображения иконки
		iconImageSize?: [number, number] // Размер иконки [ширина, высота]
		iconImageOffset?: [number, number] // Смещение иконки относительно точки привязки [x, y]
	}
}
```

### Доступные элементы управления (Control)

- 'zoomControl' - кнопки масштабирования
- 'searchControl' - поиск на карте
- 'trafficControl' - информация о пробках
- 'fullscreenControl' - кнопка полноэкранного режима

### Доступные поведения карты (Behavior)

- 'drag' - перетаскивание карты
- 'scrollZoom' - зум колесиком мыши
- 'dblClickZoom' - зум по двойному клику
- 'multiTouch' - мультитач на тачскринах

## Примеры использования

### Базовая карта с одним маркером

```tsx
<YandexMap
	center={[55.757359, 37.602669]}
	apiKey='ваш-api-ключ'
	zoom={12}
	height='500px'
/>
```

### Карта с множественными маркерами и кластеризацией

```tsx
<YandexMap
	center={[55.757359, 37.602669]}
	apiKey='ваш-api-ключ'
	markers={[
		{
			coordinates: [55.757359, 37.602669],
			color: 'red',
			title: 'Офис 1',
			description: 'Главный офис компании'
		},
		{
			coordinates: [55.752574, 37.574856],
			color: 'blue',
			title: 'Офис 2',
			description: 'Дополнительный офис'
		}
	]}
	clusterer={true}
	controls={['zoomControl', 'fullscreenControl']}
/>
```

### Карта с кастомными стилями

```tsx
<YandexMap
	center={[55.757359, 37.602669]}
	apiKey='ваш-api-ключ'
	height='600px'
	style={{
		borderRadius: '10px',
		boxShadow: '0 0 10px rgba(0,0,0,0.1)'
	}}
	behaviors={['drag']}
/>
```

### Примеры использования маркеров

#### Простой маркер с балуном

```tsx
<YandexMap
	center={[55.757359, 37.602669]}
	apiKey='ваш-api-ключ'
	markers={[
		{
			coordinates: [55.757359, 37.602669],
			color: 'red',
			title: 'Заголовок',
			description: 'Описание маркера'
		}
	]}
/>
```

#### Маркер с кастомной иконкой

```tsx
<YandexMap
	center={[55.757359, 37.602669]}
	apiKey='ваш-api-ключ'
	markers={[
		{
			coordinates: [55.757359, 37.602669],
			iconStyle: {
				iconImageHref: '/path/to/icon.png',
				iconImageSize: [32, 32],
				iconImageOffset: [-16, -16]
			}
		}
	]}
/>
```

#### Маркер с настроенным балуном

```tsx
<YandexMap
	center={[55.757359, 37.602669]}
	apiKey='ваш-api-ключ'
	markers={[
		{
			coordinates: [55.757359, 37.602669],
			title: 'Место',
			description: 'Описание места',
			openByDefault: true,
			balloonStyle: {
				balloonAutoPan: true,
				hideIconOnBalloonOpen: false,
				balloonOffset: [0, -20]
			}
		}
	]}
/>
```
