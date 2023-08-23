import React from "react";

import { Text } from "../../primitives/text/text";
import { Flex } from "../../primitives/flex/flex";
import { CgMathPercent } from "react-icons/cg";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getMantraRoleColors,
  getPlayerFavourableRole,
} from "../../../utils/players";

interface Props {
  players?: any;
  settings?: any;
}

export const BidTrendStat = ({ players, settings }: Props) => {
  const chartDataTemplate = {
    POR: { name: "POR", value: 0 },
    DC: { name: "DC", value: 0 },
    DD: { name: "DD", value: 0 },
    DS: { name: "DS", value: 0 },
    M: { name: "M", value: 0 },
    E: { name: "E", value: 0 },
    C: { name: "C", value: 0 },
    W: { name: "W", value: 0 },
    T: { name: "T", value: 0 },
    A: { name: "A", value: 0 },
    PC: { name: "PC", value: 0 },
  };

  const calcChartData = () => {
    let data = { ...chartDataTemplate };
    players.forEach((player) => {
      const role = getPlayerFavourableRole(player.role_mantra).toUpperCase();
      data[role].value = data[role].value + player.owned_amount;
    });

    // Now re-calculate the percentage
    return Object.values(data).map((role) => {
      return {
        ...role,
        value: parseFloat((role.value / settings.budget) * 100).toFixed(2),
      };
    });
  };



  const rangeData = [
    {
      "day": "05-01",
      "temperature": [
        -1,
        10
      ]
    },
    {
      "day": "05-02",
      "temperature": [
        2,
        15
      ]
    },
    {
      "day": "05-03",
      "temperature": [
        3,
        12
      ]
    },
    {
      "day": "05-04",
      "temperature": [
        4,
        12
      ]
    },
    {
      "day": "05-05",
      "temperature": [
        12,
        16
      ]
    },
    {
      "day": "05-06",
      "temperature": [
        5,
        16
      ]
    },
    {
      "day": "05-07",
      "temperature": [
        3,
        12
      ]
    },
    {
      "day": "05-08",
      "temperature": [
        0,
        8
      ]
    },
    {
      "day": "05-09",
      "temperature": [
        -3,
        5
      ]
    }
  ]


  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        width={730}
        height={250}
        data={rangeData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey="num" />
        <YAxis />
        <Area dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};
