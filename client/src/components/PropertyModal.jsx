import React from 'react';

export default function PropertyModal({ property, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal property-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{property.title}</h2>
        <div className="images">
          {property.images.map((img, i) => (
            <img key={i} src={`/images/${img}`} alt={property.title} />
          ))}
        </div>
        <p><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
        <p><strong>Status:</strong> {property.status}</p>
        <p><strong>Rating:</strong> {property.rating} ⭐</p>
        <p>{property.description}</p>
      </div>
    </div>
  );
}
