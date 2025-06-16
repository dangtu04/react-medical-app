import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.scss";
import Header from "./Header";
import axios from "../../axios";
import { FormattedMessage } from "react-intl";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Xin chào! Tôi là trợ lý AI Medical Booking.Tôi có thể giúp bạn tư vấn về sức khỏe và gợi ý chuyên khoa phù hợp. Bạn có câu hỏi gì không?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Cuộn xuống cuối chat khi có tin nhắn mới
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chatbot", { message: text });
      if (response.errCode === 0) {
        const botMessage = { text: response.data.reply, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = { text: response.errMessage, sender: "bot" };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        text: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <Header />
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div>
              <h3>
                <FormattedMessage id="chatbot.title" />
              </h3>
              {/* <span>Tư vấn sức khỏe và hỗ trợ đặt lịch khám</span> */}
            </div>
          </div>
        </div>

        <div className="chatbot-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.sender}`}>
              <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message bot">
              <p>
                <FormattedMessage id="chatbot.processing" />
              </p>
            </div>
          )}
        </div>

        <div className="chatbot-footer">
          <div className="suggestions">
            <button
              onClick={() => sendMessage("Tôi bị đau đầu thường xuyên")}
              disabled={isLoading}
            >
              Tôi bị đau đầu thường xuyên
            </button>
            <button
              onClick={() => sendMessage("Làm sao để đặt lịch khám?")}
              disabled={isLoading}
            >
              Làm sao để đặt lịch khám?
            </button>
            <button
              onClick={() =>
                sendMessage("Có chuyên khoa nào khám về tim mạch?")
              }
              disabled={isLoading}
            >
              Có chuyên khoa nào khám về tim mạch?
            </button>
          </div>
          <div className="input-area">
            <FormattedMessage id="chatbot.input">
              {(placeholder) => (
                <input
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
              )}
            </FormattedMessage>

            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
            >
              <FormattedMessage id="chatbot.send" />
            </button>
          </div>
          <p className="note">
            <FormattedMessage id="chatbot.note" />
          </p>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
