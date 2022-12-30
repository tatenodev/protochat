import Link from "next/link";
import { useAppSelector } from "store/hooks";
import { ChannelEditBlock } from "../ChannelEditBlock";
import { ChannelDeleteBlock } from "../ChannelDeleteBlock";

export function ChannelListBlock() {
  const { channelList } = useAppSelector((state) => state.channel);

  return (
    <ul>
      {channelList?.map((channel) => (
        <li key={channel.id}>
          <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
          <ChannelEditBlock editChannel={channel} />
          <ChannelDeleteBlock channel={channel} />
        </li>
      ))}
    </ul>
  );
}
