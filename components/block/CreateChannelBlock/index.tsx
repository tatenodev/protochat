import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SwitchPrimitive } from "components/primitive/SwitchPrimitive";
import { setChannelList } from "components/template/ChannelsTemplate/slice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { supabase } from "utils/supabaseClient";
import { DialogOverlay, DialogContent } from "./style";

export function CreateChannelBlock() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log("CreateChannelBlock")

  const handleCreateChannel = async () => {
    if (!user || !channelName) return;
    setIsLoading(true);
    const res = await supabase
      .from("channels")
      .insert({ user: user.id, name: channelName, is_public: isPublic });
    const { data } = await supabase
      .from("channels")
      .select()
      .eq("user", user.id);

    if (data) dispatch(setChannelList(data));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>チャンネルを作成</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={DialogOverlay} />
        <Dialog.Content className={DialogContent}>
          <Dialog.Title>チャンネル作成</Dialog.Title>
          <Dialog.Description>チャンネルを作成しましょう</Dialog.Description>
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
          <button onClick={handleCreateChannel}>
            {isLoading ? "Loading..." : "保存"}
          </button>
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
