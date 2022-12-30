import Link from "next/link";
import { useAppSelector } from "store/hooks";
import { EditChannelBlock } from "../EditChannelBlock";
import { ChannelDeleteBlock } from "../DeleteChannelBlock";

export function ChannelListBlock() {
  const { channelList } = useAppSelector((state) => state.channel);

  return (
    <ul>
      {channelList?.map((channel) => (
        <li key={channel.id}>
          <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
          <EditChannelBlock editChannel={channel} />
          <ChannelDeleteBlock channel={channel} />
        </li>
      ))}
    </ul>
  );
}
