import * as Minio from 'minio'

export const minioCompanyClient = new Minio.Client({ //read / write permissions
  endPoint: 'minio.tschudea.de',
  port: 443,
  useSSL: true,
  accessKey: process.env.MINIO_BUCKET_COMPANY_ACCESS_KEY,
  secretKey: process.env.MINIO_BUCKET_COMPANY_SECRET_KEY,
})

export const minioCustomerClient = new Minio.Client({ //read permissions
  endPoint: 'minio.tschudea.de',
  port: 443,
  useSSL: true,
  accessKey: process.env.MINIO_BUCKET_CUSTOMER_ACCESS_KEY,
  secretKey: process.env.MINIO_BUCKET_CUSTOMER_SECRET_KEY,
})
