import { useState } from 'react'
import FadeIn from '@/components/fadeIn/FadeIn'
import styles from './Tab.module.scss'

const Tab = () => {
	const [tabOpen, setTabOpen] = useState<null | string>(null)

	// Функция задержки
	const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

	const handleTabClick = async (tabName: string) => {
		// Если таб уже открыт, просто закрываем его
		if (tabOpen === tabName) {
			setTabOpen(null)
		} else {
			// Если переключаемся на другой таб, сначала закрываем текущий, ждем немного и открываем новый
			if (tabOpen !== null) {
				setTabOpen(null)
				await delay(500) // Задержка для анимации закрытия, например, 300 мс
			}
			setTabOpen(tabName)
		}
	}

	// Функция для определения, открыт ли таб
	const isTabOpen = (tabName: string) => tabOpen === tabName

	return (
		<FadeIn>
			<div className='text-xl' onClick={() => handleTabClick('tab1')}>
				Tab 1
				<span
					className={`${styles.arrow} ${isTabOpen('tab1') ? styles.rotate : ''}`}
				></span>
			</div>
			<div
				className={`p-[20px] ${styles.tabContent} ${isTabOpen('tab1') ? styles.open : ''}`}
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
				aliquam consectetur deleniti, doloremque ex nesciunt nulla quae. A
				adipisci architecto cum cumque debitis et fuga fugiat impedit, ipsam,
				iusto magnam maiores natus officia pariatur rerum vel, voluptate? A
				aliquid amet architecto aspernatur assumenda aut corporis, debitis dicta
				dolore ea enim error excepturi facilis, fuga hic ipsam itaque labore
				maiores maxime minus molestias nemo perferendis praesentium quibusdam
				quod quos sed suscipit tenetur unde vel! Asperiores consectetur
				consequuntur fugiat officia placeat quibusdam voluptatem. Illo
				laboriosam molestiae reprehenderit sunt! A at, cumque, dolores eos est
				id illo incidunt neque quidem recusandae repellat similique?
			</div>
			<div className='text-xl' onClick={() => handleTabClick('tab2')}>
				Tab 2
				<span
					className={`${styles.arrow} ${isTabOpen('tab2') ? styles.rotate : ''}`}
				></span>
			</div>
			<div
				className={`p-[20px] ${styles.tabContent} ${isTabOpen('tab2') ? styles.open : ''}`}
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
				aliquam consectetur deleniti, doloremque ex nesciunt nulla quae. A
				adipisci architecto cum cumque debitis et fuga fugiat impedit, ipsam,
				iusto magnam maiores natus officia pariatur rerum vel, voluptate? A
				aliquid amet architecto aspernatur assumenda aut corporis, debitis dicta
				dolore ea enim error excepturi facilis, fuga hic ipsam itaque labore
				maiores maxime minus molestias nemo perferendis praesentium quibusdam
				quod quos sed suscipit tenetur unde vel! Asperiores consectetur
				consequuntur fugiat officia placeat quibusdam voluptatem. Illo
				laboriosam molestiae reprehenderit sunt! A at, cumque, dolores eos est
				id illo incidunt neque quidem recusandae repellat similique?
			</div>
		</FadeIn>
	)
}

export default Tab
