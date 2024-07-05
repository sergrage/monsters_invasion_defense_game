import React, { FC, useEffect, useRef, useState } from "react";
import { ForumTopicMessageProps } from "@/store/forum/forumTopic/type";
import { useTranslation } from "react-i18next";
import style from "@/pages/forumTopic/style.module.scss";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface EmojiInterface {
  id: number;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
}

const ForumTopicMessage: FC<ForumTopicMessageProps> = ({ item }) => {
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
        <span>{item.date}</span>
        <span>#{item.id}</span>
      </div>
      <div className={style.body}>
        <div className={style.user}>
          <div className={style.name}>{item.user.name}</div>
          <div className={style.avatar}>
            <img src={item.user.avatar} alt="avatar" />
          </div>
        </div>
        <div className={style.text}>
          <p>{item.message}</p>
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
