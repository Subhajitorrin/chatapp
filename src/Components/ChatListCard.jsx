import React from "react";
import "./ChatListCard.css";

function ChatListCard() {
  return (
    <div className="ChatListCardContainer">
      <div className="itemImgContainer">
        <img
          src="https://imgs.search.brave.com/7_EAqhx1XD9bh2yoP5E6bUMY_qGTy3qHa8QY9nzAt5c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlptTXpZMlkw/WlRNdE5HVXdNUzAw/WldRekxUa3hZekl0/T0dSaVpqWmpOakJt/TVRsa1hrRXlYa0Zx/Y0dkZVFYVnlOelUx/TnpFM05UZ0AuanBn"
          alt=""
        />
      </div>
      <div className="text">
        <span>Subhajit Ghosh</span>
        <p>This is last message</p>
      </div>
    </div>
  );
}

export default ChatListCard;
