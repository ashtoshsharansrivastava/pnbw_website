import React from 'react';
import { Star } from 'lucide-react'; // Using Lucide for star icons

export default function ReviewCarousel({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-md text-center text-gray-600 border border-gray-100">
        No reviews available yet. Be the first!
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Our Clients Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="p-6 bg-blue-50 rounded-lg shadow-sm space-y-3 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-center mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" className="text-yellow-500" />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <Star key={i + review.rating} size={20} className="text-gray-300" />
              ))}
            </div>
            <p className="text-gray-700 italic leading-relaxed">"{review.comment}"</p>
            <p className="text-right font-semibold text-gray-800">- {review.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
