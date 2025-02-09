import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface FileFieldProps {
	field: FormField
	register: any
	errors: any
}

const FileField: React.FC<FileFieldProps> = ({ field, register, errors }) => {
	return (
		<>
			<div className='form-control'>
				<div className='font-medium mb-2'>{field.title}</div>
				<input
					type='file'
					accept={field.accept}
					{...register(field.name, {
						required: field.required,
						validate: {
							fileSize: (files: FileList | null) => {
								if (!files?.[0] || !field.maxSize) return true
								return (
									typeof files[0] === 'object' &&
									'size' in files[0] &&
									(files[0].size <= field.maxSize ||
										`Файл должен быть меньше ${field.maxSize / 1024 / 1024}MB`)
								)
							}
						}
					})}
					className='file-input file-input-bordered w-full'
				/>
			</div>
			<ErrorMessage
				message={
					errors[field.name]
						? errors[field.name]?.message ||
							field.error ||
							'Это поле обязательно'
						: undefined
				}
			/>
		</>
	)
}

export default FileField
