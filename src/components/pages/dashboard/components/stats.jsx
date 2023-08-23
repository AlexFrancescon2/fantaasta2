import { shallow } from "zustand/shallow";
import { useStore } from "../../../../store/store";
import { Flex } from "../../../primitives/flex/flex";

import { RoleCostDistributionStat } from "../../../shared/graphs/role-cost-distribution";
import { Tabs } from "../../../primitives/tabs/tabs";
import { TabContent } from "../../../primitives/tabs/tab-content";
import { useState } from "react";

export const DashboardStatsModal = () => {
  const { players, magheggi, settings, updateTargets, user } = useStore(
    (state) => ({
      user: state.user,
      players: state.players,
      magheggi: state.magheggi,
      settings: state.settings,
      updateTargets: state.updateTargets,
    }),
    shallow
  );

  // Set tabs
  const [currentTab, setCurrentTab] = useState("rcd");

  // Define tabs
  const tabs = [
    {
      label: "Distrib. costo rosa",
      id: "rcd",
    },
  ];

  return (
    <Tabs items={tabs} selectedTabId={currentTab} onTabChange={setCurrentTab}>
      <TabContent isActive={currentTab === "rcd"}>
        <Flex css={{ height: "500px", width: "100%" }}>
          <RoleCostDistributionStat
            settings={settings}
            players={players.filter((player) => player.owned === user.id)}
          />
        </Flex>
      </TabContent>
    </Tabs>
  );
};
