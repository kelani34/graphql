import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ProductProps } from "../Types";

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

const MUTATE_PRODUCT = gql`
  mutation addProduct($customer: ID, $description: String!, $total: Int!) {
    createProduct(
      customer: $customer
      description: $description
      total: $total
    ) {
      product {
        id
        customer {
          id
        }
        description
        total
      }
    }
  }
`;

const AddProducts = ({ customerId }: ProductProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [total, setTotal] = useState<number>(NaN);

  const [createProduct, { loading, error, data }] = useMutation(
    MUTATE_PRODUCT,
    {
      refetchQueries: [
        {
          query: GET_CUSTOMERS,
        },
      ],
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setDescription("");
      setTotal(NaN);
    }
  }, [data]);

  return (
    <div>
      {active || (
        <button
          type="button"
          onClick={() => {
            setActive(true);
          }}
        >
          Add Order
        </button>
      )}

      {active ? (
        <div>
          <form
            id="product"
            onSubmit={(e) => {
              e.preventDefault();
              if (!total || !description) return;

              createProduct({
                variables: {
                  customer: customerId,
                  description: description,
                  total: total * 100,
                },
              });
            }}
          >
            <div>
              <label htmlFor="description">Description: </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <br />
            <div>
              <label htmlFor="total">Industry: </label>
              <input
                id="total"
                type="number"
                value={isNaN(total) ? "0" : total}
                onChange={(e) => {
                  setTotal(parseFloat(e.target.value));
                }}
              />
            </div>
            <br />
            {/* <button
              disabled={createCustomerLoading ? true : false}
              type="submit"
            >
              Submit
            </button>

            {createCustomerError ? <p>OOps... an error occured</p> : null} */}
            <button disabled={loading ? true : false} form="product">
              Add Product
            </button>
          </form>
          {error && <div>OOps... something went wrong</div>}
        </div>
      ) : null}
    </div>
  );
};

export default AddProducts;
