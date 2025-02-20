import type { FormField as QuizFormField } from '@/components/quiz/quiz.types'

export type FormField = Omit<QuizFormField, 'step'> & {
	pattern?: string
	patternFlags?: string
}
