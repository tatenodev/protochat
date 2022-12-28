import * as Switch from "@radix-ui/react-switch";
import { css } from "@emotion/css";

type SwitchPrimitiveProps = {
  label?: string;
  isChecked?: boolean;
  setIsCheckCallback: (arg: boolean) => void;
};

export function SwitchPrimitive({
  label = "toggle",
  isChecked = false,
  setIsCheckCallback,
}: SwitchPrimitiveProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label
        className="Label"
        htmlFor="public-channel-mode"
        style={{ paddingRight: 15 }}
      >
        {label}
      </label>
      <Switch.Root
        defaultChecked={isChecked}
        onCheckedChange={(e) => setIsCheckCallback(e)}
        className={SwitchRoot}
        id="public-channel-mode"
      >
        <Switch.Thumb className={SwitchThumb} />
      </Switch.Root>
    </div>
  );
}

const SwitchRoot = css`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: gray;
  border-radius: 9999px;
  position: relative;
  // box-shadow: 0 2px 10px gray;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &[data-state="checked"] {
    background-color: green;
  }
  &:focus {
    box-shadow: 0 0 0 2px blue;
  }
`;
const SwitchThumb = css`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px gray;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;
