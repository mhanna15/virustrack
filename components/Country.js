import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

import Card from "./Card";

const Country = (props) => {
  const [countryCases, setCountryCases] = useState("");
  const [countryDeaths, setCountryDeaths] = useState("");

  const getCasesByCountry = () => {
    const url = "https://api.thevirustracker.com/free-api?countryTotal=US";
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setCountryCases(r.countrydata[0].total_cases);
        setCountryDeaths(r.countrydata[0].total_deaths);
      });
  };

  useEffect(() => {
    getCasesByCountry();
  }, []);

  return (
    <TouchableOpacity>
      <Card>
        <Text>
          The United States currently has {countryCases} cases and{" "}
          {countryDeaths} deaths
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default Country;
