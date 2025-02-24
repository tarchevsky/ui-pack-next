import { STORAGE_KEYS, getStorageItem, setStorageItem } from '@/utils/storage'
import { useCallback, useState } from 'react'
import { formFields } from '../formFields'

export const useQuizSteps = () => {
	const [currentStep, setCurrentStep] = useState(() => {
		const savedStep = getStorageItem(STORAGE_KEYS.CURRENT_STEP)
		return savedStep ? Number(savedStep) : 1
	})

	const totalSteps = Math.max(...formFields.map(field => field.step!))

	const nextStep = useCallback(() => {
		setCurrentStep(prev => {
			const newStep = prev + 1
			setStorageItem(STORAGE_KEYS.CURRENT_STEP, newStep.toString())
			return newStep
		})
	}, [])

	const prevStep = useCallback(() => {
		setCurrentStep(prev => {
			const newStep = prev - 1
			setStorageItem(STORAGE_KEYS.CURRENT_STEP, newStep.toString())
			return newStep
		})
	}, [])

	return {
		currentStep,
		totalSteps,
		nextStep,
		prevStep,
		setCurrentStep
	}
}
