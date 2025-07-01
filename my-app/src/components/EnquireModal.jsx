// src/components/EnquireModal.jsx
export default function EnquireModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white text-black p-6 rounded">Enquire form here <button onClick={onClose}>Close</button></div>
      </div>
    );
  }
  