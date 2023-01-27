import React, { useState } from "react";
import { ProductProps } from "../Types";

const AddProducts = ({ customerId }: ProductProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [total, setTotal] = useState<number>(NaN);

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

      {active && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label htmlFor="description">Description: </label>
              <input
                id="description"
                type="text"
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
                value={total}
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
            <button>Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
