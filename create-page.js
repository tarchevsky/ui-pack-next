#!/usr/bin/env bun

const fs = require('fs')
const path = require('path')

// Парсинг аргументов командной строки
const args = process.argv.slice(2)
const pageName = args[0]
let pageTitle = pageName
let pageDescription = ''

// Проверка наличия обязательного аргумента - имени страницы
if (!pageName) {
	console.error('Укажите имя страницы')
	process.exit(1)
}

// Парсинг дополнительных опций
for (let i = 1; i < args.length; i++) {
	if (args[i].startsWith('--title=')) {
		pageTitle = args[i].split('=')[1]
	}
	if (args[i].startsWith('--description=')) {
		pageDescription = args[i].split('=')[1]
	}
}

const pageTemplate = `import FadeIn from '@/components/fadeIn/FadeIn'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '${pageTitle}',${
			pageDescription
				? `
    description: '${pageDescription}',`
				: ''
		}
}

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
    return (
        <>
            <FadeIn className='cont'>
                <main>
                    <h1 className='text-4xl font-bold'>${pageTitle}</h1>
                </main>
            </FadeIn>
        </>
    )
}
`

const pageDir = path.join(process.cwd(), 'src', 'app', pageName)
const pagePath = path.join(pageDir, 'page.tsx')

// Создаем директорию для страницы
fs.mkdirSync(pageDir, { recursive: true })

// Создаем файл page.tsx
fs.writeFileSync(pagePath, pageTemplate)

console.log(`Страница ${pageName} создана в ${pagePath}`)
