import { FC, useEffect, useRef, useState } from "react";
import { ForumTopicMessageProps } from "@/store/forum/type";
import style from "@/pages/forumTopic/style.module.scss";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useFormattedDate from "@/hooks/useDate";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getUserState } from "@/store/user/selector";
import randomInteger from "@/utils/randomInteger";
import { baseYandexUrl } from "@/endpoints/apiUrl";

interface EmojiInterface {
  id: number;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
}

const ForumTopicMessage: FC<ForumTopicMessageProps> = ({ item }) => {
  console.log("🚀 ~ item:", item);
  const user = useAppSelector(getUserState).user;

  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji: EmojiInterface) => {
    setSelectedEmojis([...selectedEmojis, emoji.native]);
    setShowPicker(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className={style.message} key={item.id}>
      <div className={style.date}>
        <span>{useFormattedDate(item.createdAt)}</span>
        <span>#{item.id}</span>
      </div>
      <div className={style.body}>
        <div className={style.user}>
          <div className={style.name}>{item.login}</div>
          <div className={style.avatar}>
            <img
              src={
                item.login === user?.login && user.avatar
                  ? `${baseYandexUrl}/resources${user.avatar}`
                  : `/src/assets/img/user${randomInteger(1, 2)}.png`
              }
              alt="Автар пользователя"
            />
          </div>
        </div>
        <div className={style.text}>
          <p>
            {item.forum_messages?.length == 0
              ? "Сообщений нет"
              : "item.forum_messages"}
          </p>
          <div className={style.emojiContainer}>
            <div className={style.selectedEmojis}>
              {selectedEmojis.map((emoji, index) => (
                <span key={index}>{emoji}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showPicker && (
        <div className={style.emojiPicker} ref={pickerRef}>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      <button className={style.emojiButton} onClick={togglePicker} />
    </div>
  );
};

export default ForumTopicMessage;
