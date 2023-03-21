import ScrollToTop from "@/base-components/scroll-to-top/Main";
import Header from "@/components/header/Main";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Router from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnmount: "always",
      refetchOnReconnect: "always",
      retry: 1,
      retryDelay: 2000,
    },
  },
});
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
          <ScrollToTop />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
