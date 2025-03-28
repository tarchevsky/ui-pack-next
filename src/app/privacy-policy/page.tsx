import FadeIn from '@/components/fadeIn/FadeIn'
import PageHeading from '@/components/pageHeading/PageHeading'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности',
	description: 'Страница политики конфиденциальности'
}

export default async function PrivacyPolicyPage() {
	return (
		<>
			<PageHeading ind title='Политика конфиденциальности' />
			<FadeIn className='ind cont flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-16'>
				Какой-то текст страницы
			</FadeIn>
		</>
	)
}
