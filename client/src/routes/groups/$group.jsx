import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/groups/$group')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/groups/$group"!</div>
}
