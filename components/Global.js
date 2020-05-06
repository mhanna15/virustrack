import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";

import Card from "./Card";

const Global = (props) => {
  const [globalCases, setGlobalCases] = useState("");
  const [globalDeaths, setGlobalDeaths] = useState("");

  const getCasesGlobally = () => {
    const url = "https://api.thevirustracker.com/free-api?global=stats";
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setGlobalCases(r.results[0].total_active_cases);
        setGlobalDeaths(r.results[0].total_deaths);
      });
  };

  useEffect(() => {
    getCasesGlobally();
  }, []);

  return (
    <Card>
      <TouchableOpacity>
        <Text>
          The whole world current has {globalCases} current cases and{" "}
          {globalDeaths} deaths
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

export default Global;
