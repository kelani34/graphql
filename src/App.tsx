import React, { useEffect, useState } from "react";
import "./App.css";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Customer, Product } from "./Types";
import { create } from "domain";
import AddProducts from "./components/AddProducts";

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
      <h1>Add a Customer</h1>
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
        <br />
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
        <br />
        <button disabled={createCustomerLoading ? true : false} type="submit">
          Submit
        </button>

        {createCustomerError ? <p>OOps... an error occured</p> : null}

        <h1>Customers</h1>
        <div>
          {data
            ? data.customers.map((customer: Customer) => {
                return (
                  <div key={customer.id}>
                    <hr />
                    <h2>{`${customer.name} (${customer.industry})`}</h2>
                    {customer.products.map((product: Product) => {
                      return (
                        <div key={product.id}>
                          <p>
                            <b>Description:</b> {product.description}
                          </p>
                          <p>
                            <b>Amount paid: </b> ${" "}
                            {(product.total / 100).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      );
                    })}
                    <AddProducts customerId={customer.id} />
                  </div>
                );
              })
            : null}
        </div>
      </form>
    </>
  );
}

export default App;
