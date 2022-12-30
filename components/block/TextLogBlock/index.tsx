import { setChannelList } from "components/template/ChannelsTemplate/slice";
import { KeyboardEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { supabase } from "utils/supabaseClient";

// https://www.supabase.jp/docs/reference/javascript/select#querying-json-data

export function TextLogBlock() {
  const dispatch = useAppDispatch();
  const { currentChannel, channelList } = useAppSelector(
    (state) => state.channel
  );
  const [message, setMessage] = useState("");

  const handleSubmitComment = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !message) return;

    const oldLogs = currentChannel?.logs;
    const newLogs = oldLogs
      ? [{ date: new Date(), message }, ...oldLogs]
      : [{ date: new Date(), message }];
    const { data } = await supabase
      .from("channels")
      .update({ logs: newLogs })
      .eq("id", currentChannel?.id)
      .select();

    if (!data?.length) return console.log("no resposne.");
    const newList = channelList.map((item) => {
      if (item.id === data[0].id) return data[0];
      return item;
    });
    dispatch(setChannelList(newList));
    setMessage("");
  };

  if (!currentChannel) return <div>Loading...</div>;

  return (
    <>
      <h1>#{currentChannel.name}</h1>
      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleSubmitComment}
          type="text"
        />
      </div>
      {currentChannel.logs?.map((log, i) => (
        <div key={i}>
          {log.date}: {log.message}
        </div>
      ))}
    </>
  );
}
