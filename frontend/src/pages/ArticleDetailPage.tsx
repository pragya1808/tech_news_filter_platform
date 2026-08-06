import { useParams } from 'react-router-dom'
import { PageHeader } from '@/components/ui'

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <PageHeader title={`Article #${id}`} />
      {/* TODO: article detail will be built in the next phase */}
      <div className="text-sm text-gray-500">Article detail coming soon.</div>
    </div>
  )
}
