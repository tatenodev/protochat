import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  DialogContent,
  DialogOverlay,
} from "components/primitive/DialogPrimitive";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { supabase } from "utils/supabaseClient";
import { setProfiles } from "components/template/ChannelsTemplate/slice";

export function EditProfileBlock() {
  const dispatch = useAppDispatch();
  const { profiles } = useAppSelector((state) => state.channel);
  const { user } = useAppSelector((state) => state.session);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(profiles?.username ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUserName = async () => {
    if (!user || !userName) return;
    setIsLoading(true);
    const { data } = await supabase
      .from("profiles")
      .update({ username: userName })
      .eq("id", user.id)
      .select();

    if (data?.length) dispatch(setProfiles(data[0]));

    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>Profile編集</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Dialog.Title>編集</Dialog.Title>
          <fieldset>
            <label htmlFor="appUserName">ユーザー名</label>
            <input
              id="appUserName"
              placeholder="ユーザー名を入力"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </fieldset>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <button type="button" onClick={handleUpdateUserName}>
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
