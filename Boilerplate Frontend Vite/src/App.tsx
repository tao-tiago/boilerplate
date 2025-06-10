import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Fetching } from "./components/Loading"

import { queryClient } from "./services/queryClient"
import Routes from "./routes"

import "./global/styles.css"

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Fetching />
    <Routes />
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default App
