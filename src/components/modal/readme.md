# Modal

Базовый компонент. Написан изначально для оповещений после удачной отправки форм связи.

## Добавление к любой кнопке, ссылке

Над return

```tsx
const modalRef = useRef<ModalHandle>(null)

const handleButtonClick = () => {
	if (modalRef.current) {
		modalRef.current.showModal()
	}
}
```

И внутри компонента

```tsx
<Modal ref={modalRef} message='Это сообщение в модальном окне!' />
```

Если в модальное окно нужно добавить больше контента, а message не нужен, его можно не добавлять, а к modal надо добавить парный тег

```tsx
<Modal ref={modalRef}>
	<div>Контент</div>
</Modal>
```
