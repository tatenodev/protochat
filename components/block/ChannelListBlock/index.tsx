import Link from "next/link";
import { useAppSelector } from "store/hooks";
import { ChannelEditBlock } from "../ChannelEditBlock";
import { ChannelDeleteBlock } from "../ChannelDeleteBlock";

export function ChannelListBlock() {
  const { list } = useAppSelector((state) => state.channel);

  return (
    <ul>
      {list?.map((channel) => (
        <li key={channel.id}>
          <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
          <ChannelEditBlock editChannel={channel} />
          <ChannelDeleteBlock channel={channel} />
        </li>
      ))}
    </ul>
  );
}
