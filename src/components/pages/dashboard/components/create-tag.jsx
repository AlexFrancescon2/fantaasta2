import { SketchPicker } from "react-color";
import { Flex } from "../../../primitives/flex/flex";
import { Text } from "../../../primitives/text/text";
import { IconPicker } from "./icon-picker";
import { cloneElement, useState } from "react";
import { Input } from "../../../primitives/input/input";
import { icons } from "./icons";
import { useStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { Button } from "../../../primitives/button/button";
import { ErrorMessage } from "../../../primitives/text/error";

export const CreateTagModal = ({ setModal }) => {
  const [icon, setIcon] = useState(null);
  const [iconColor, setIconColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#fff");
  const [name, setName] = useState(null);

  const [error, setError] = useState(false);

  const { magheggi, updateTag } = useStore(
    (state) => ({
      magheggi: state.magheggi,
      updateTag: state.updateTag,
    }),
    shallow
  );

  const onCreateTag = () => {
    // Validate
    if (!icon || !name || !iconColor || !bgColor) {
      setError("Compila tutti i campi");
      return;
    }
    setError('');
    // Create tag
    const newData = [
      ...magheggi?.tag,
      {
        icon: icon,
        color: iconColor,
        bg: bgColor,
        name: name
      }
    ];
    updateTag(newData)
    // Save everything to localstorage
    const newMagheggiData = {
      ...magheggi,
      tags: [
        ...magheggi?.tags,
        ...newData
      ]
    }
    localStorage.setItem('magheggi', JSON.stringify(newMagheggiData))

  };

  return (
    <div>
      <Text size="xlarge">Crea tag</Text>
      <Flex css={{ marginTop: "20px" }}>
        <div>
          <Input
            label="Nome"
            placeholder="Scegli nome del tag"
            value={name}
            size="large"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Flex>
      <Flex
        css={{
          marginTop: "20px",
          "@bp2max": {
            display: "block",
          },
        }}
      >
        <div>
          <Text size="large" css={{ marginBottom: "10px" }}>
            Scegli icona
          </Text>
          <IconPicker value={icon} onChange={setIcon} />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <Text size="large" css={{ marginBottom: "10px" }}>
            Scegli colore
          </Text>
          <SketchPicker
            color={iconColor}
            onChangeComplete={(e) => setIconColor(e.hex)}
          />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <Text size="large" css={{ marginBottom: "10px" }}>
            Scegli sfondo
          </Text>
          <SketchPicker
            color={bgColor}
            onChangeComplete={(e) => setBgColor(e.hex)}
          />
        </div>
      </Flex>
      <Flex css={{ marginTop: "40px" }}>
        <Text size="large">Anterprima:</Text>
        <Flex css={{ marginLeft: "20px" }}>
          {icon && (
            <Flex
              css={{
                backgroundColor: bgColor,
                width: "65px",
                height: "65px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "$pill",
              }}
            >
              {cloneElement(
                icons.find((loopIcons) => loopIcons.value === icon).component,
                { color: iconColor, size: 40 }
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Flex css={{ marginTop: "20px" }}>
        <Button color="black" onClick={onCreateTag}>Crea tag</Button>
      </Flex>
    </div>
  );
};
