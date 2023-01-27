import React, { useEffect, useState } from "react";
import "./App.css";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Customer } from "./Types";
import { create } from "domain";

const GET_CUSTOMERS = gql`
  {
    customers {
      id
      name
      industry
      products {
        id
        description
        total
      }
    }
  }
`;

const MUTATE_CUSTOMERS = gql`
  mutation addCustomer($name: String!, $industry: String!) {
    createCustomer(name: $name, industry: $industry) {
      customer {
        id
        name
        industry
      }
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const [
    createCustomer,
    {
      loading: createCustomerLoading,
      error: createCustomerError,
      data: createCustomerData,
    },
  ] = useMutation(MUTATE_CUSTOMERS, {
    refetchQueries: [
      {
        query: GET_CUSTOMERS,
      },
    ],
  });

  const [name, setName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");

  useEffect(() => {
    console.log("data", data, "error", error, "loading", loading);
    console.log(
      "create customer",
      createCustomer,
      "create customer data",
      createCustomerData,
      "create customer loading",
      createCustomerLoading,
      "create customer error",
      createCustomerError
    );
  }, []);
  return (
    <>
      {error ? <p>Somrthing Went wrong</p> : null}
      {loading ? <p>Loading ...</p> : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCustomer({ variables: { name: name, industry: industry } });

          if (!error) {
            setName("");
            setIndustry("");
          }
        }}
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="industry">Industry: </label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
            }}
          />
        </div>
        <button disabled={createCustomerLoading ? true : false} type="submit">
          Submit
        </button>
      </form>
      {createCustomerError ? <p>OOps... an error occured</p> : null}
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
