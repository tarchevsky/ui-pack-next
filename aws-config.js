// aws-config.ts
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
	accessKeyId: '5UESROIVJP2P1UNBUJ7X',
	secretAccessKey: '8kolSiNgndSDMDtFwk3U3cP3LV492D4WIjpj3Rvc',
	endpoint: 'https://s3.timeweb.cloud', // Timeweb S3 endpoint
	region: 'ru-1', // Например, 'ru-1'
	s3ForcePathStyle: true // Важно для Timeweb S3
})

export default s3
