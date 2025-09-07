import { createFileRoute} from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import { fetchIdeas } from '@/api/ideas';
import IdeaCard from '@/Components/IdeaCard';



const ideaQueryOptions = () => queryOptions({
  queryKey: ['ideas'],
  queryFn: () => fetchIdeas(),
});

export const Route = createFileRoute('/ideas/')({
  head:() => ({
    meta: [
      {
        title: 'IdeaHub - Browse Ideas'
      }
    ]
  }),
  component: IdeasPage,
  loader: async({context: {queryClient}}) => {
    return queryClient.ensureQueryData(ideaQueryOptions())
  }
})

function IdeasPage() {
  const {data:ideas} = useSuspenseQuery(ideaQueryOptions());
  
  
  return <div className='p-4'>
    <h1 className='text-2xl font-bold mb-4'>Ideas</h1>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {ideas.map((idea) => (
        <IdeaCard key={idea._id} idea={idea}/>
      ))}
    </div>
  </div>
}
