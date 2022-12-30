import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {
  AlertDialogContent,
  AlertDialogOverlay,
} from "components/primitive/AlertDialogPrimitive";
import {
  ChannelItem,
  deleteChannelItem,
} from "components/template/ChannelsTemplate/slice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { supabase } from "utils/supabaseClient";

type ChannelDeleteBlockProps = {
  channel: ChannelItem;
};

export function ChannelDeleteBlock({ channel }: ChannelDeleteBlockProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userInfo);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteChannel = async (_channelId: string) => {
    if (!user) return console.log("user does not exist.");
    const res = await supabase.from("channels").delete().eq("id", _channelId);
    console.log(res);
    dispatch(deleteChannelItem(_channelId));
    setIsOpen(false);
  };

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(_isOpen) => setIsOpen(_isOpen)}
    >
      <AlertDialog.Trigger>削除</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialog.Title>チャンネルを削除</AlertDialog.Title>
          <AlertDialog.Description>
            本当に#{channel.name}
            を削除してもよろしいですか？元に戻すことはできません。
          </AlertDialog.Description>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
            <button onClick={() => handleDeleteChannel(channel.id)}>
              削除
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
