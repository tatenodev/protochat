import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import { supabase } from "utils/supabaseClient";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  selectChannelById,
  setChannelList,
  setCurrentChannel,
  setProfiles,
} from "./slice";
import { CreateChannelBlock } from "components/block/CreateChannelBlock";
import { TextLogBlock } from "components/block/TextLogBlock";
import { MeBlock } from "components/block/MeBlock";
import { ChannelListBlock } from "components/block/ChannelListBlock";
import { EditProfileBlock } from "components/block/EditProfileBlock";

export default function ChannelsTemplate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const channelId = router.query.channelId as string | undefined;
  const { user } = useAppSelector((state) => state.session);
  const { channelList, profiles } = useAppSelector((state) => state.channel);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const currentChannel = useAppSelector(selectChannelById(channelId ?? ""));

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    const { error } = await supabase.auth.signOut();
    console.log(error);
    router.replace("/");
  };

  const getChannels = useCallback(async () => {
    if (!user) return console.log("user does not exist.");
    // TODO: getChannelsQuery関数として切り出す
    const { data } = await supabase
      .from("channels")
      .select()
      .eq("user", user.id)
      .order("created_at", { ascending: true });
    if (data?.length) dispatch(setChannelList(data));
  }, [user, dispatch]);

  const getProfiles = useCallback(async () => {
    if (!user) return console.log("user does not exist.");
    const { data } = await supabase.from("profiles").select().eq("id", user.id);
    if (data?.length) dispatch(setProfiles(data[0]));
  }, [user, dispatch]);

  useEffect(() => {
    getChannels();
    getProfiles();
  }, [getChannels, getProfiles]);

  // 存在しないchannelIdであればmepageへ遷移
  useEffect(() => {
    if (channelList.length === 0 || channelId === "me") return;
    if (!channelList.some((channel) => channel.id === channelId)) {
      router.push("/channels/me");
    }
  }, [channelId, channelList, router]);

  useEffect(() => {
    if (currentChannel) dispatch(setCurrentChannel(currentChannel));
  }, [channelId, dispatch, currentChannel]);

  return (
    <div className={Container}>
      <nav className={Nav}>
        <div>
          {profiles?.username ?? "no name"}
          <EditProfileBlock />
        </div>
        <div>
          <Link href="/channels/me">Home</Link>
        </div>
        <CreateChannelBlock />
        <ChannelListBlock />
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
