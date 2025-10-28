import React, { useState } from "react";

const emojis = ["👍", "❤️", "🔥", "💡", "😂"];

export default function ReactionButtons({ reactions = {}, onReact }) {
  const [userReaction, setUserReaction] = useState(null);
  const [localReactions, setLocalReactions] = useState(reactions);

  const handleClick = async (emoji) => {
    let updatedReactions = { ...localReactions };

    if (userReaction === emoji) {
      //  Undo same reaction
      updatedReactions[emoji] = Math.max((updatedReactions[emoji] || 1) - 1, 0);
      setUserReaction(null);
    } else {
      //  Remove previous reaction
      if (userReaction && updatedReactions[userReaction]) {
        updatedReactions[userReaction] = Math.max(
          updatedReactions[userReaction] - 1,
          0
        );
      }
      //  Add new reaction
      updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
      setUserReaction(emoji);
    }

    //  Update UI instantly
    setLocalReactions(updatedReactions);

    // Notify parent to persist changes
    await onReact(updatedReactions);
  };

  return (
    <div className="flex gap-3 mt-6 pt-4">
      {emojis.map((emoji) => {
        const active = userReaction === emoji;
        return (
          <button
            key={emoji}
            onClick={() => handleClick(emoji)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer
              ${
                active
                  ? "bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-white"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
            `}
          >
            <span>{emoji}</span>
            <span className="text-gray-700 dark:text-gray-300">
              {localReactions[emoji] || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
