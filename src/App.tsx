import React, { useEffect } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { Customer } from "./Types";
const GET_DATA = gql`
  {
    customers {
      id
      name
      industry
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    console.log("data", data, "error", error, "loading", loading);
  });
  return (
    <>
      {error ? <p>Somrthing Went wrong</p> : null}
      {loading ? <p>Loading ...</p> : null}
      <div>
        {data
          ? data.customers.map((customer: Customer) => {
              return (
                <div key={customer.id}>
                  {customer.name} {customer.industry}
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default App;
