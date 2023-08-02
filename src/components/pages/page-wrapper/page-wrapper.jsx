import { Header } from "../../shared/header/header";
import { css } from "../../../styles/system";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";

import fieldBg from '../../../media/field-dark.png'

export const PageWrapper = ({ children }) => {
  // Set store
  const { setUser } = useStore((state) => ({ setUser: state.setUser }), shallow);
  setUser(JSON.parse(localStorage.getItem("fantauser")))

  return (
    <div className={wrapper()}>
      <Header />
      <div className={contentWrapper()}>{children}</div>
    </div>
  );
};

const wrapper = css({
  maxWidth: "100vw",
  minHeight: '100vh',
  backgroundColor: "$black",
  background: `url(${fieldBg})`,
  // backgroundPosition: 'center',
  // backgroundSize: 'cover'
});

const contentWrapper = css({
  padding: '20px',
  paddingTop: '100px',
});
