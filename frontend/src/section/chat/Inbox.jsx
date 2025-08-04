import React, { useEffect, useRef, useState } from "react";
import {
  ChatTeardropSlash,
  Gif,
  Microphone,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import EmojiPicker from "../../components/EmojiPicker";
import UserInfo from "./UserInfo";
import Giphy from "../../components/Giphy";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAudioModal } from "../../redux/slices/app";
import Attachment from "../../components/Attachment";
import MsgSeparator from "../../components/MsgSeparator";
import TypingIndicator from "../../components/TypingIndicator";
import {
  DocumentMessage,
  GiphyMessage,
  MediaMessage,
  TextMessage,
  VoiceMessage,
} from "../../components/Messages";
import {
  emitStartTyping,
  emitStopTyping,
  getDirectChatHistory,
  sendDirectMessage,
} from "../../socket/socketConnection";
import { format } from "date-fns";
import dateFormat, { masks } from "dateformat";

export default function Inbox() {
  const dispatch = useDispatch();
  const [userInfoOpen, setUserInfoOpen] = useState(true);
  const containerRef = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { currentConversation, conversations = [], typing } = useSelector(
    (state) => state.chat
  );

  const [isTyping, setIsTyping] = useState(false);

  if (!user) return null; // prevent undefined user errors

  const this_conversation = conversations.find(
    (el) => el._id?.toString() === currentConversation?.toString()
  );

  const other_user = this_conversation?.participants?.find(
    (e) => e._id !== user._id
  );

  useEffect(() => {
    if (isTyping) {
      const startTypingData = {
        userId: other_user?._id,
        conversationId: currentConversation,
      };
      emitStartTyping(startTypingData);

      const timeout = setTimeout(() => {
        emitStopTyping(startTypingData);
        setIsTyping(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getDirectChatHistory({ conversationId: currentConversation });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [currentConversation]);

  const [videoCall, setVideoCall] = useState(false);
  const [audioCall, setAudioCall] = useState(false);
  const [gifOpen, setGifOpen] = useState(false);

  const handleToggleUserInfo = () => setUserInfoOpen((prev) => !prev);
  const handleToggleGif = (e) => {
    e.preventDefault();
    setGifOpen((prev) => !prev);
  };
  const handleMicClick = (e) => {
    e.preventDefault();
    dispatch(ToggleAudioModal(true));
  };

  const thisConversation = conversations.find(
    (el) => el._id === currentConversation
  );

  const this_user = thisConversation?.participants?.find(
    (e) => e._id !== user._id
  );

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    if (!isTyping) setIsTyping(true);
    setInputValue(e.target.value);
  };

  const handleEmojiSelect = (emoji) => {
    setInputValue((prev) => prev + emoji.native);
  };

  function formatTime(dateString) {
    masks.hammerTime = "HH:MM";
    return dateFormat(dateString, "hammerTime");
  }

  const MSG_LIST = this_conversation?.messages?.map((msg) => {
    const incoming = msg.author !== user._id;
    const authorName = incoming ? other_user?.name : user.name;
    const timestamp = formatTime(msg.date);
    const id = msg?._id;
    const type = msg?.type;

    switch (type) {
      case "Text":
        return { id, incoming, content: msg.content, timestamp, authorName, type, date: msg.date };
      case "Document":
        return { id, incoming, content: msg.content, timestamp, authorName, type, document: msg.document, date: msg.date };
      case "Media":
        return { id, incoming, content: msg.content, timestamp, authorName, type, media: msg.media, date: msg.date };
      case "Giphy":
        return { id, incoming, content: msg.content, timestamp, authorName, type, giphy: msg.giphyUrl, date: msg.date };
      case "Audio":
        return { id, incoming, content: msg.content, timestamp, authorName, type, audioUrl: msg.audioUrl, date: msg.date };
      default:
        return null;
    }
  }).filter(Boolean) || [];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentConversation, MSG_LIST]);

  const handleSendMsg = () => {
    if (inputValue) {
      const data = {
        conversationId: currentConversation,
        message: {
          author: user._id,
          type: "Text",
          content: inputValue,
        },
      };
      sendDirectMessage(data);
      setInputValue("");
    }
  };

  return (
    <>
      {currentConversation ? (
        <div className={`flex h-full flex-col border-l border-stroke dark:border-strokedark w-full ${userInfoOpen ? "xl:w-1/2" : "xl:w-3/4"}`}>
          <div className="sticky flex items-center justify-between border-b border-stroke dark:border-strokedark px-6 py-4.5">
            <div className="flex items-center" onClick={handleToggleUserInfo}>
              <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                {this_user?.avatar ? (
                  <img src={this_user?.avatar} alt="avatar" className="h-13 w-13 rounded-full object-cover object-center" />
                ) : (
                  <div className="h-11 w-11 rounded-full border border-stroke dark:border-strokedark bg-gray dark:bg-boxdark flex items-center justify-center text-body dark:text-white capitalize cursor-pointer">
                    {this_user?.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="cursor-pointer">
                <h5 className="font-medium text-black dark:text-white text-nowrap">{this_user?.name}</h5>
                {typing?.conversationId && typing?.typing ? (
                  <p className="text-sm">Typing...</p>
                ) : (
                  <div className={`text-sm font-medium ${this_user?.status === "Online" ? "text-green-500" : "text-red"}`}>
                    {this_user?.status}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div ref={containerRef} className="max-h-full space-y-3.5 overflow-y-auto no-scrollbar px-6 py-7.5 grow">
            {MSG_LIST.map((message, index) => {
              const isNewDay =
                index === 0 ||
                format(new Date(MSG_LIST[index - 1].date), "yyyy-MM-dd") !==
                format(new Date(message.date), "yyyy-MM-dd");

              return (
                <React.Fragment key={message.id}>
                  {isNewDay && <MsgSeparator date={message.date} />}
                  {(() => {
                    switch (message.type) {
                      case "Text":
                        return <TextMessage {...message} />;
                      case "Giphy":
                        return <GiphyMessage {...message} giphy={message.giphy} />;
                      case "Document":
                        return <DocumentMessage {...message} documentFile={message.document} />;
                      case "Audio":
                        return <VoiceMessage {...message} audioUrl={message.audioUrl} />;
                      case "Media":
                        return <MediaMessage {...message} media={message.media} caption={message.content} />;
                      default:
                        return null;
                    }
                  })()}
                </React.Fragment>
              );
            })}
            {typing?.conversationId && typing?.typing && <TypingIndicator />}
          </div>

          <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between space-x-4.5">
              <div className="relative w-full">
                <input
                  onKeyDown={(e) => e.key === "Enter" && handleSendMsg()}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Send Message..."
                  className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                />

                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center space-x-4">
                  <button onClick={handleMicClick} className="hover:text-primary"><Microphone size={20} /></button>
                  <button className="hover:text-primary"><Attachment /></button>
                  <button onClick={handleToggleGif}><Gif size={20} /></button>
                  <button onClick={(e) => e.preventDefault()} className="hover:text-primary">
                    <EmojiPicker onSelectEmoji={handleEmojiSelect} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleSendMsg}
                disabled={!inputValue}
                className={`flex items-center justify-center h-13 max-w-13 w-full rounded-md hover:bg-opacity-90 ${
                  !inputValue
                    ? "bg-gray text-body dark:bg-boxdark-2 dark:text-body"
                    : "bg-primary text-white"
                }`}
              >
                <PaperPlaneTilt size={24} weight="bold" />
              </button>
            </div>
            {gifOpen && <Giphy />}
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center w-full xl:w-3/4 border-l border-stroke dark:border-strokedark">
          <div className="flex flex-col space-y-4 items-center justify-center">
            <ChatTeardropSlash size={100} />
            <span className="text-lg font-semibold">No Conversation Selected</span>
          </div>
        </div>
      )}

      {currentConversation && userInfoOpen && (
        <div className="xl:w-1/4">
          <UserInfo user={this_user} handleToggleUserInfo={handleToggleUserInfo} />
        </div>
      )}
    </>
  );
}
