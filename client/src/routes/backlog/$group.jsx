import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/backlog/$group')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/backlog/$group"!</div>
}
