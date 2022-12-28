import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import { supabase } from "utils/supabaseClient";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { CreateChannelBlock } from "components/block/CreateChannelBlock";
import { deleteChannelItem, setChannelList } from "./slice";
import Link from "next/link";
import TextLogBlock from "components/block/TextLogBlock";
import MeBlock from "components/block/MeBlock";

export default function ChannelsTemplate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { channelId } = router.query;
  const { user } = useAppSelector((state) => state.userInfo);
  const channelList = useAppSelector((state) => state.channel.list);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    const { error } = await supabase.auth.signOut();
    console.log(error);
    router.replace("/");
  };

  const getChannels = useCallback(async () => {
    if (!user) return console.log("user does not exist.");
    const { data } = await supabase
      .from("channels")
      .select()
      .eq("user", user.id);
    if (data) dispatch(setChannelList(data));
  }, [user, dispatch]);

  const handleDeleteChannel = async (channelId: string) => {
    if (!user) return console.log("user does not exist.");
    const res = await supabase.from("channels").delete().eq("id", channelId);
    dispatch(deleteChannelItem(channelId));
    console.log(res);
  };

  useEffect(() => {
    getChannels();
  }, [getChannels, user]);

  return (
    <div className={Container}>
      <nav className={Nav}>
        <div>{user?.user_metadata.name}</div>
        <div>
          <Link href="/channels/me">Home</Link>
        </div>
        <CreateChannelBlock />
        <ul>
          {channelList?.map((channel) => (
            <li key={channel.id}>
              <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
              <button
                type="button"
                onClick={() => handleDeleteChannel(channel.id)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
        <div>
          {isLoadingLogout ? (
            <div>ログアウト中</div>
          ) : (
            <button type="button" onClick={handleLogout}>
              ログアウト
            </button>
          )}
        </div>
      </nav>
      <main className={Main}>
        {channelId === "me" ? <MeBlock /> : <TextLogBlock />}
      </main>
    </div>
  );
}

const Container = css`
  display: flex;
`;
const Nav = css`
  flex-shrink: 0;
`;
const Main = css`
  width: 100%;
`;
