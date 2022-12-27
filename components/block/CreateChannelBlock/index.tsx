import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { css, keyframes } from "@emotion/css";
import { SwitchPrimitive } from "components/primitive/SwitchPrimitive";

export function CreateChannelBlock() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>チャンネルを作成</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={DialogOverlay} />
        <Dialog.Content className={DialogContent}>
          <Dialog.Title>チャンネル作成</Dialog.Title>
          <Dialog.Description>チャンネルを作成しましょう</Dialog.Description>
          <SwitchPrimitive />
          <fieldset>
            <label htmlFor="name">チャンネル名</label>
            <input id="name" placeholder="チャンネル名を入力" />
          </fieldset>
          <Dialog.Close>保存</Dialog.Close>
          <Dialog.Close asChild>
            <button aria-label="閉じる">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;
// https://coliss.com/articles/build-websites/operation/css/position-fixed-centering-new-way.html
const DialogOverlay = css`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;
const DialogContent = css`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;
