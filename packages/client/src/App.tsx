import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";
import "./App.css";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // Get this from some config
          url: "http://localhost:3000/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: "Bearer 123",
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Hello />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Hello() {
  // Hello is typed as `string` because of the return type of hello
  const { isLoading, data: helloData, error } = trpc.hello.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  return <div>{helloData}</div>;
}

export default App;
