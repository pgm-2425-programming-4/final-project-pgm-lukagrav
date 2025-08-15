import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

export default App
