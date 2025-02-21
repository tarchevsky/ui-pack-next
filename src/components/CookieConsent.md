# CookieConsent

Компонент для управления согласием на использование файлов cookie.

## Использование

В корневом компоненте Next.js (например, `_app.tsx` или `layout.tsx`):

```tsx
import CookieConsent from '@/components/CookieConsent'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<CookieConsent />
		</>
	)
}
```

## Функциональность

- При первом входе показывает модальное окно с запросом согласия
- Сохраняет состояние согласия в `localStorage`
- Позволяет пользователю принять или отклонить использование cookie
- Не показывается повторно, если согласие уже дано
