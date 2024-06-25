import React, { FC, useState, useRef, useEffect } from "react";
import style from "./style.module.scss";
import Title from "@/ui/title";
import { useParams } from "react-router";
import temp_data from "@/pages/forumTopic/temp_data";
import Button from "@/ui/button";
import Layout from "@/components/layout";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ForumTopicMessageProps } from "@/store/forum/forumTopic/type";

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

const ForumTopics: FC = () => {
  const params = useParams();
  const page = params.topicId;
  // TODO get message by topic id
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
  };

  return (
    <Layout.Page>
      <div className={style.titleBox}>
        <Title.H2
          title={"Lorem ipsum dolor sit amet, consectetur adipisicing elit"}
          className={style.topic}
        />
      </div>

      {temp_data.map(item => (
        <ForumTopicMessage item={item} key={item.id} />
      ))}

      <form onSubmit={onSubmitHandler}>
        <div className={style.footer}>
          <textarea
            className={style.textarea}
            name="message"
            defaultValue="I really enjoyed killing Zomby yesterday!"
          />
          <Button.Flat name="Send Message" type="submit" deepRed={true} />
        </div>
      </form>
    </Layout.Page>
  );
};

export default ForumTopics;
