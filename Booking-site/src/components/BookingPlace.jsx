import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import ReviewsSection from "./ReviewsSection";
import ReviewForm from "./ReviewForm";

export default function BookingPlace() {
  const { id } = useParams(); 
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  const handleAddReview = (updatedReviews) => {
    setBooking((prev) => ({
      ...prev,
      place: {
        ...prev.place,
        reviews: updatedReviews,
      },
    }));
  };

  if (!booking) return '';

  return (
    <div className="my-8">
      <div className="text-center max-w-lg mx-auto my-6 rounded-2xl shadow-md shadow-blue-800 p-5 bg-blue-800 text-white">
        <h1 className="text-xl">Your Booking has been confirmed for :<br />
          Name: {booking.name} <br />
          Phone: {booking.phone}</h1>
      </div>
      <div className="max-w-[1140px] mx-auto ">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <a
          className="flex gap-1 my-3 font-semibold underline"
          target="_blank"
          href={'https://maps.google.com/?q=' + booking.place.address}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
             <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
           </svg>
          <h2>{booking.place.address}</h2>
        </a>
        <div className="bg-gray-200 p-5 my-6 rounded-2xl">
          <h2 className="text-xl underline">Your Booking Information:</h2>
          <div className="flex flex-row justify-between text-md items-center">
            <div className="flex flex-row gap-2">
              {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights :
              {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr;
              {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
            <div className="bg-primary p-3 text-white rounded-2xl">
              <div className=""> Total price</div>
              <div className="text-3xl">Rs {booking.price}</div>
            </div>
          </div>
        </div>
        <PlaceGallery place={booking.place} />
        <ReviewsSection reviews={booking.place?.reviews || []} />
        <ReviewForm placeId={booking.place._id} onAddReview={handleAddReview} />
      </div>
    </div>
  );
}
