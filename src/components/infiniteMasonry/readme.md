# Infinite Masonry

Этот блок как infinite-scroll, только принцип подгрузки элементов по колонкам.

## Использование

Добавьте на страницу, где будет выводиться, массив изображений любой длины

```js
export const images = [
    {
        id: '1',
        src: 'https://images.unsplash.com/photo-1619417606952-552a15237367?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Алтай'
    },
    {
        id: '2',
        src: 'https://images.unsplash.com/photo-1630535879508-9a3a8967d9be?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Санкт-Петербург'
    },
    {
        id: '3',
        src: 'https://images.unsplash.com/photo-1623335177873-2caed992d1c7?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Переславль-Залесский'
    },
    {
        id: '4',
        src: 'https://images.unsplash.com/photo-1606841002936-38996d5eea7f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Териберка'
    },
    {
        id: '5',
        src: 'https://images.unsplash.com/photo-1665073140507-0bad3d962476?q=80&w=3303&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Камчатка'
    }
]
```

Сам компонент добавляется на страницу таким образом

```tsx
<InfiniteMasonry images={images} />
```