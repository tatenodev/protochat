import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  DialogContent,
  DialogOverlay,
} from "components/primitive/DialogPrimitive";
import { SwitchPrimitive } from "components/primitive/SwitchPrimitive";
import { setChannelList } from "components/template/ChannelsTemplate/slice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { supabase } from "utils/supabaseClient";

export function CreateChannelBlock() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.session);
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log("CreateChannelBlock")

  const handleCreateChannel = async () => {
    if (!user || !channelName) return;
    setIsLoading(true);
    await supabase
      .from("channels")
      .insert({ user: user.id, name: channelName, is_public: isPublic });
    // TODO: https://supabase.com/docs/reference/javascript/insert
    const { data } = await supabase
      .from("channels")
      .select()
      .eq("user", user.id)
      .order("created_at", { ascending: true });

    if (data) dispatch(setChannelList(data));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(_isOpen) => setIsOpen(_isOpen)}>
      <Dialog.Trigger>チャンネルを作成</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
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
          {isLoading ? (
            <div>Loading..</div>
          ) : (
            <button onClick={handleCreateChannel}>保存</button>
          )}
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
