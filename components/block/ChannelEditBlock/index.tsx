import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  DialogContent,
  DialogOverlay,
} from "components/primitive/DialogPrimitive";
import { SwitchPrimitive } from "components/primitive/SwitchPrimitive";

export function ChannelEditBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>編集する</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Dialog.Title>編集</Dialog.Title>
          <SwitchPrimitive
            label="パブリックチャンネル"
            setIsCheckCallback={(isCheck) => setIsPublic(isCheck)}
          />
          <fieldset>
            <label htmlFor="name">チャンネル名</label>
            <input
              id="name"
              placeholder="チャンネル名を入力"
              onChange={(e) => setChannelName(e.target.value)}
            />
          </fieldset>
          <button type="button">保存</button>
          <Dialog.Close asChild>
            <button aria-label="閉じる">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
