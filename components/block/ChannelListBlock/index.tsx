import Link from "next/link";
import { supabase } from "utils/supabaseClient";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { deleteChannelItem } from "components/template/ChannelsTemplate/slice";
import { ChannelEditBlock } from "../ChannelEditBlock";

export function ChannelListBlock() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userInfo);
  const { list } = useAppSelector((state) => state.channel);

  const handleDeleteChannel = async (_channelId: string) => {
    if (!user) return console.log("user does not exist.");
    const res = await supabase.from("channels").delete().eq("id", _channelId);
    dispatch(deleteChannelItem(_channelId));
    console.log(res);
  };

  return (
    <ul>
      {list?.map((channel) => (
        <li key={channel.id}>
          <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
          <ChannelEditBlock editChannel={channel} />
          <button type="button" onClick={() => handleDeleteChannel(channel.id)}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}
