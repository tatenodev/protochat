import { useAppSelector } from "store/hooks";

export default function TextLogBlock() {
  const { currentChannel } = useAppSelector((state) => state.channel);

  if (!currentChannel) return <div>Loading...</div>;

  return (
    <>
      <h1>#{currentChannel.name}</h1>
      <div>
        <input type="text" />
      </div>
      <div>text log</div>
      <div>text log</div>
      <div>text log</div>
      <div>text log</div>
      <div>text log</div>
    </>
  );
}
