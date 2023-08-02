import { css } from "../../../../styles/system";
import { useEffect, useState } from "react";
import { StatusDot } from "../../../primitives/statusdot/status-dot";
import { Text } from "../../../primitives/text/text";
import { Flex } from "../../../primitives/flex/flex";

import { createUser, getUsers, updateUser } from "../../../../requests/users";

import { useHandleResponse } from "../../../../hooks/response/response";
import { Loader } from "../../../primitives/loader/loader";
import { ErrorMessage } from "../../../primitives/text/error";
import { UserSettings } from "./user";

// icons
import { FaPlus } from "react-icons/fa";
import { Button } from "../../../primitives/button/button";
import { Modal } from "../../../primitives/modal/modal";
import { modalCommonStyles } from "../../../../styles/global";
import { Input } from "../../../primitives/input/input";
import uuid from "react-uuid";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../../store/store";

export const UsersSettings = () => {
  // Starting setting
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserKey, setSelectedUserKey] = useState(uuid()); // Set store
  const { user: loggedUser, setUser } = useStore(
    (state) => ({ user: state.user, setUser: state.setUser }),
    shallow
  );

  const [isLoading, setIsLoading] = useState(false);
  // Response handling
  const { isError, handleResponse } = useHandleResponse();
  const onFetchUsers = async () => {
    setIsLoading(true);
    const response = await getUsers();
    handleResponse(response);
    if (response.data) {
      setUsers(response.data);
    }
    setIsLoading(false);
  };

  // Fetch users
  useEffect(() => {
    onFetchUsers();
  }, []);

  const onSelectUser = (id) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user);
    setSelectedUserKey(uuid());
  };

  // Create new user
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [createUserUsername, setCreateUserUsername] = useState("");
  const [createUserTeam, setCreateUserTeam] = useState("");
  const [createUSerrErrorMessage, setCreateUSerrErrorMessage] = useState("");
  const onCreateUser = async () => {
    // Validation
    if (!createUserUsername || !createUserTeam) {
      setCreateUSerrErrorMessage("Compila tutti i campi prima di procedere.");
      return;
    }
    setCreateUSerrErrorMessage("");
    setIsLoading(true);
    const response = await createUser(
      createUserUsername,
      "",
      createUserTeam,
      false
    );
    if (response.status === 200) {
      setUsers([...users, response.data]);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    } else {
      setCreateUSerrErrorMessage(response.error);
    }
    setIsLoading(false);
  };

  // Update user
  const [updateError, setUpdateError] = useState("");
  const onUpdateUser = async (userData) => {
    // Validation
    setUpdateError("");
    if (!userData.username || !userData.team_name) {
      setUpdateError("Compila tutti i campi prima di procedere");
      return;
    }
    setIsLoading(true);
    const response = await updateUser(userData, userData.id);
    if (response.status === 200) {
      // Update user array
      const newUsers = users.map((user) =>
        user.id === userData.id ? { ...user, ...userData } : user
      );
      setUsers(newUsers);
      // If is admin itself, update
      if (userData.id === loggedUser.id) {
        setUser(userData);
        localStorage.setItem("fantauser", JSON.stringify(userData));
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={IsModalOpen} setIsOpen={setIsModalOpen}>
        <div className={modalSizes()}>
          <Text size="xlarge" css={{ marginBottom: "20px" }}>
            Crea utente
          </Text>
          <Input
            label="Nome squadra"
            size="full"
            value={createUserTeam}
            onChange={(e) => setCreateUserTeam(e.target.value)}
            hasSpaceBottom
            placeholder="Il nome della squadra"
          />
          <Input
            label="Username"
            size="full"
            value={createUserUsername}
            onChange={(e) => setCreateUserUsername(e.target.value)}
            hasSpaceBottom
            placeholder="L'username che utilizzera' per accedere"
          />
          {createUSerrErrorMessage && (
            <ErrorMessage>{createUSerrErrorMessage}</ErrorMessage>
          )}
          <Button color="black" onClick={onCreateUser} hasSpaceTop>
            Crea utente
          </Button>
        </div>
      </Modal>
      <div className={wrapper()}>
        {isLoading && <Loader />}
        {isError && (
          <ErrorMessage>
            Si sono verificati dei problemi nel reperimento dei dati.
          </ErrorMessage>
        )}
        {!isError && (
          <>
            <div className={userList()}>
              <Button
                color="black"
                css={{ width: "100%", marginBottom: "30px", height: "40px" }}
                onClick={() => setIsModalOpen(true)}
              >
                <Flex css={{ marginRight: "8px" }}>
                  <FaPlus color="white" />
                </Flex>
                Crea utente
              </Button>
              {users.map((user) => {
                return (
                  <div
                    className={userListItem({
                      isActive: user.id === selectedUser?.id,
                    })}
                    onClick={() => onSelectUser(user.id)}
                    key={user.id}
                  >
                    <StatusDot
                      isActive={user.is_registered}
                      size="medium"
                      hasSpaceRight
                    ></StatusDot>
                    <Text size="medium">{user.username}</Text>
                  </div>
                );
              })}
            </div>
            <div className={userDetails()}>
              {selectedUser && (
                <>
                  <div>
                    <Text size="xlarge" isBold css={{ textAlign: "center" }}>
                      {`${selectedUser.username} · ${selectedUser.team_name}`}
                    </Text>
                  </div>
                  <UserSettings
                    user={selectedUser}
                    key={selectedUserKey}
                    onSubmit={onUpdateUser}
                    error={updateError}
                  />
                </>
              )}
              {!selectedUser && <Text size="large">Seleziona un utente.</Text>}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const wrapper = css({
  display: "flex",
  marginTop: "20px",
  height: "100%",
  position: "relative",
  "@bp2max": {
    display: "block",
  },
});

const userList = css({
  width: "30%",
  borderRight: "1px solid $grey6",
  overflowY: "scroll",
  padding: "0 $4 0 0",
  "@bp2max": {
    borderRight: "none",
    borderBottom: "1px solid $grey6",
    marginBottom: "20px",
    width: "100%",
  },
});

const userDetails = css({
  width: "70%",
  height: "100%",
  padding: "$2 $5",
  "@bp2max": {
    width: "inherit",
  },
});

const userListItem = css({
  height: "50px",
  backgroundColor: "$grey2",
  marginBottom: "$4",
  borderRadius: "$2",
  padding: "$1 $4",
  "&:hover": {
    backgroundColor: "$grey3",
    cursor: "pointer",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
  display: "flex",
  alignItems: "center",
  variants: {
    isActive: {
      true: {
        backgroundColor: "$grey3",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      },
    },
  },
});

const modalSizes = css({
  width: "40vw",
  ...modalCommonStyles(),
});
