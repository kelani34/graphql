import React, { useEffect } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { Launch } from "./Types";
const GET_DATA = gql`
  {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    console.log("data", data, "error", error, "loading", loading);
  });
  return (
    <div>
      {data
        ? data.launchesPast.map((launch: Launch) => {
            return (
              <div>
                {launch.mission_name} {launch.launch_date_local}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
