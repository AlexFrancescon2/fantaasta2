import { css } from "../../../styles/system";
import { Card } from "../../primitives/card/card";
import { Text } from "../../primitives/text/text";
import { FaTag, FaTags, FaCoins } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RiTeamFill } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BiFootball } from "react-icons/bi";

import { Flex } from "../../primitives/flex/flex";
import { useState } from "react";
import { Modal } from "../../primitives/modal/modal";

import {
  getMantraRoleWeight as mantraRoleWeight,
  getPlayerFavourableRole,
} from "../../../utils/players";
import { UserOverview } from "../../shared/user/user-overview";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import { IoMdStats } from "react-icons/io";
import { Table } from "../../primitives/table/table";
import { TableHead } from "../../primitives/table/head";
import { TableRow } from "../../primitives/table/row";
import { TableCell } from "../../primitives/table/cell";
import { Sort } from "../../primitives/sort/sort";
import { TableBody } from "../../primitives/table/body";
import { Tooltip } from "../../primitives/tooltip/tooltip";
import { Image } from "../../primitives/image/image";
import { PlayerRoles } from "../../shared/player/player-roles";
import { currentSeason } from "../../../settings/season";
import { CreateTagModal } from "./components/create-tag";

export const Dashboard = () => {
  const { users, players, settings, magheggi } = useStore(
    (state) => ({
      users: state.users,
      players: state.players,
      updatePlayer: state.updatePlayer,
      settings: state.settings,
      setSettings: state.setSettings,
      magheggi: state.magheggi,
    }),
    shallow
  );

  // Handle modals
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);

  return (
    <>
      <div className={wrapper()}>
        <Flex css={boxStyle} onClick={() => setIsCreateTagModalOpen(true)}>
          <FaTag size={90} color="grey" />
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Crea tag</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlinePlus size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle}>
          <FaTags size={90} color="grey" />
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Modifica tags</Text>
            <Flex css={secondIconWrapper}>
              <FiEdit3 size={20} />
            </Flex>
          </div>
        </Flex>
      </div>
      <div className={wrapper()}>
        <Flex css={boxStyle}>
          <RiTeamFill size={90} color="grey" />
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Rosa</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlineEye size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle}>
          <IoMdStats size={90} color="grey" />
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Statistiche</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlineEye size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle}>
          <FaCoins size={90} color="grey" />
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Crediti</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlineEye size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle}>
          <BiFootball size={90} color="grey" />
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Moduli</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlineEye size={20} />
            </Flex>
          </div>
        </Flex>
      </div>
      <div className={wrapper()}>
        <Flex css={{ ...boxStyle, width: "100%" }}>
          <div>
            <Text size="xlarge" css={{ marginBottom: "15px" }}>
              Obiettivi
            </Text>
            <Table css={{ overflowX: "scroll" }}>
              <TableHead>
                <TableRow>
                  <TableCell minWidth="200px">
                    {/* <Sort
                    direction={sortState.direction}
                    isActive={sortState.sort === "name"}
                    onClick={() => handleSort("name")}
                  > */}
                    Nome
                    {/* </Sort> */}
                  </TableCell>
                  <TableCell isCentered width="8%">
                    Squadra
                  </TableCell>
                  <TableCell width="15%">Ruolo</TableCell>
                  <TableCell isCentered width="8%">
                    Media
                  </TableCell>
                  <TableCell isCentered width="8%">
                    Fantamedia
                  </TableCell>
                  <TableCell isCentered width="8%">
                    Quotazione
                  </TableCell>
                  <TableCell isCentered width="8%">
                    Proprietario
                  </TableCell>
                  <TableCell width="8%"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody isStriped>
                {players.map((player) => {
                  const owner = users.find((user) => user.id === player.owned);
                  return (
                    <TableRow key={player.id}>
                      <TableCell padding="small">
                        <Text isBold={owner?.id ? false : true}>
                          {player.name}
                        </Text>
                      </TableCell>
                      <TableCell isCentered padding="small">
                        <Tooltip
                          text={player.team}
                          variant="dark"
                          fontSize="small"
                          followCursor={false}
                          position="top"
                        >
                          <Image
                            src={`/media/teams/${player.team}.png`}
                            css={{ maxHeight: "22px", maxWidth: "22px" }}
                            alt={player.team}
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell padding="small">
                        <PlayerRoles
                          gameType="mantra"
                          rolesMantra={player.role_mantra}
                          roleClassic={player.role_classic}
                          size="small"
                        />
                      </TableCell>
                      <TableCell isCentered padding="small">
                        <Text size="small">
                          {player.stats[currentSeason]?.mv || "-"}
                        </Text>
                      </TableCell>
                      <TableCell isCentered padding="small">
                        <Text size="small">
                          {player.stats[currentSeason]?.mfv || "-"}
                        </Text>
                      </TableCell>
                      <TableCell isCentered padding="small">
                        <Text size="small">{player.quot_m}</Text>
                      </TableCell>
                      <TableCell isCentered padding="small">
                        <Text size="small">-</Text>
                      </TableCell>
                      <TableCell padding="small">
                        <Flex
                          css={{ justifyContent: "flex-end", gap: "0px 5px" }}
                        >
                          /
                        </Flex>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Flex>
      </div>
      <Modal isOpen={isCreateTagModalOpen} setIsOpen={setIsCreateTagModalOpen}>
        <div className={userStatsModalWrapper()}>
          <CreateTagModal />
        </div>
      </Modal>
    </>
  );
};

const wrapper = css({
  display: "flex",
  alignItems: "center",
  gap: "30px",
  flexWrap: "wrap",
  padding: "0 40px",
  height: "max-content",
  "&:not(:first-child)": {
    marginTop: "60px",
  },

  "@bp2max": {
    marginTop: "0px",
    padding: "0px",
    gap: "20px 0px",
    minHeight: "inherit",
  },
});

const boxStyle = {
  backgroundColor: "$white",
  borderRadius: "$3",
  padding: "$4",
  cursor: "pointer",
  "@bp2max": {
    width: "100%",
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    "& svg": {
      fill: "black",
    },
  },
};

const userStatsModalWrapper = css({
  width: "92vw",
  maxHeight: "84vh",
  overflowY: "scroll",
  backgroundColor: "$white",
  borderRadius: "$2",
  padding: "$4",
  "@bp2max": {
    width: "85vw",
  },
});

const boxInfoWrapper = {
  marginLeft: "25px",
  "@bp2max": {
    width: "100%",
  },
};
const secondIconWrapper = {
  justifyContent: "end",
  marginTop: "20px",
  "@bp2max": {
    width: "100%",
  },
};
