// src/app/components/QuestCompletionPopup.tsx
import React, { useEffect } from "react";

interface QuestCompletionPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const QuestCompletionPopup: React.FC<QuestCompletionPopupProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      // Fermer le popup après 3 secondes
      const timeout = setTimeout(onClose, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  return (
    isVisible && (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-md shadow-lg">
        <p>La quête a été complétée ! 🎉</p>
      </div>
    )
  );
};

export default QuestCompletionPopup;
