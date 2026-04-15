'use client'

import { useRouter } from 'next/navigation'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next'
import '@uploadcare/react-uploader/core.css'

type Props = {
  onUpload: (e: string) => Promise<unknown>
}

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()

  const handleFileUploadSuccess = async (fileInfo: { cdnUrl: string | null }) => {
    if (!fileInfo.cdnUrl) return

    const file = await onUpload(fileInfo.cdnUrl)

    if (file) {
      router.refresh()
    }
  }

  return (
    <FileUploaderRegular
      sourceList="local, camera, facebook, gdrive"
      cdnCname="https://1la2o18zak.ucarecd.net/"
      classNameUploader="uc-dark"
      pubkey="e6c3756b9cf39806e0ce"
      onFileUploadSuccess={handleFileUploadSuccess}
    />
  )
}

export default UploadCareButton