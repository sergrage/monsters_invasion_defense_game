import { FC, useEffect, useRef, useState } from "react";
import { TForumMessage } from "@/store/forum/type";
import style from "@/pages/forumTopic/style.module.scss";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useFormattedDate from "@/hooks/useDate";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getUserState } from "@/store/user/selector";
import randomInteger from "@/utils/randomInteger";
import { baseYandexUrl } from "@/endpoints/apiUrl";
import Button from "@/ui/button";
import { deleteforumMessageThunk } from "@/store/forum/actions";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface EmojiInterface {
  id: number;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
}

const ForumTopicMessage: FC<TForumMessage> = ({
  id,
  login,
  createdAt,
  text,
}) => {
  const user = useAppSelector(getUserState).user;
  const dispatch = useAppDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji: EmojiInterface) => {
    setSelectedEmojis(prevEmojis => [...prevEmojis, emoji.native]);
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

  const deleteMessage = () => {
    dispatch(deleteforumMessageThunk({ id }));
  };

  return (
    <div className={style.message} key={id}>
      <div className={style.date}>
        <span>{useFormattedDate(createdAt)}</span>
        <span>#{id}</span>
      </div>
      <div className={style.body}>
        <div className={style.user}>
          <div className={style.name}>{login}</div>
          <div className={style.avatar}>
            <img
              src={
                login === user?.login && user.avatar
                  ? `${baseYandexUrl}/resources${user.avatar}`
                  : `/src/assets/img/user${randomInteger(1, 2)}.png`
              }
              alt="Автар пользователя"
            />
          </div>
          <Button.Flat
            name="Съесть мозги"
            deepRed={true}
            onClick={deleteMessage}
          />
        </div>
        <div className={style.text}>
          <p>{text}</p>
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
