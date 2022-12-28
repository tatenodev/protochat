import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  DialogContent,
  DialogOverlay,
} from "components/primitive/DialogPrimitive";
import { SwitchPrimitive } from "components/primitive/SwitchPrimitive";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { supabase } from "utils/supabaseClient";
import {
  ChannelItem,
  setChannelList,
} from "components/template/ChannelsTemplate/slice";

type ChannelEditBlockProps = {
  editChannel: ChannelItem;
};

export function ChannelEditBlock({ editChannel }: ChannelEditBlockProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(editChannel.is_public);
  const [channelName, setChannelName] = useState(editChannel.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateChannel = async () => {
    if (!user) return;
    setIsLoading(true);
    await supabase
      .from("channels")
      .update({ name: channelName, is_public: isPublic })
      .eq("id", editChannel.id);
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
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>編集する</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Dialog.Title>編集</Dialog.Title>
          <SwitchPrimitive
            label="パブリックチャンネル"
            isChecked={editChannel.is_public}
            setIsCheckCallback={(isChecked) => setIsPublic(isChecked)}
          />
          <fieldset>
            <label htmlFor="name">チャンネル名</label>
            <input
              id="name"
              placeholder="チャンネル名を入力"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </fieldset>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <button type="button" onClick={handleUpdateChannel}>
              保存
            </button>
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
