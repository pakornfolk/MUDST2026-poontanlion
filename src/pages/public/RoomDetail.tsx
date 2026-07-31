import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Users, Maximize2, Bed, Wifi, Tv, Wind, Refrigerator as FridgeIcon, 
  Flame, Sun, Car, Coffee, Star, Heart, Check, ArrowLeft, Maximize, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Room, Review } from '../../types';
import { getRoomById, getReviews, addReview, getWishlist, toggleWishlist } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { ImageLightbox } from '../../components/common/ImageLightbox';
import { GoogleMapEmbed } from '../../components/common/GoogleMapEmbed';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const AMENITY_ICONS: Record<string, any> = {
  'Wi-Fi': Wifi,
  'TV': Tv,
  'Air Conditioner': Wind,
  'Refrigerator': FridgeIcon,
  'Water Heater': Flame,
  'Balcony': Sun,
  'Parking': Car,
  'Breakfast': Coffee,
};

export const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState<Room | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // PDP disclosure rows
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [amenitiesOpen, setAmenitiesOpen] = useState(true);
  const [reviewsOpen, setReviewsOpen] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchRoom = async () => {
      const data = await getRoomById(id);
      setRoom(data);
      if (data) {
        setIsWishlisted(getWishlist().includes(data.id));
        const revData = await getReviews(data.id);
        setReviews(revData);
      }
      setLoading(false);
    };
    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 text-center text-nike-mute animate-pulse text-[16px]">
        Loading...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="text-[24px] font-medium text-nike-ink dark:text-white">Room Not Found</h2>
        <Link to="/rooms" className="bg-nike-ink text-white px-6 py-3 rounded-full font-medium text-[14px] inline-block hover:opacity-80">
          Back to Rooms
        </Link>
      </div>
    );
  }

  const galleryImages = room.gallery && room.gallery.length > 0 ? room.gallery : [room.cover_image || ''];

  const handleWishlistToggle = () => {
    const updated = toggleWishlist(room.id);
    const inList = updated.includes(room.id);
    setIsWishlisted(inList);
    toast.success(inList ? 'Saved to Wishlist' : 'Removed from Wishlist');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const rev = await addReview({
      room_id: room.id,
      user_id: user?.id || 'guest-user',
      user_name: user?.fullname || 'Anonymous Guest',
      rating: newRating,
      comment: newComment.trim(),
    });
    setReviews([rev, ...reviews]);
    setNewComment('');
    toast.success('Thank you for your review!');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 space-y-10">
      
      {/* BREADCRUMB */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-[14px] font-medium text-nike-mute hover:text-nike-ink flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-[13px] text-nike-mute">
          Room {room.room_number}
        </span>
      </div>

      {/* GALLERY — PDP style with hero + thumbnail rail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div
          onClick={() => { setActiveImageIdx(0); setLightboxOpen(true); }}
          className="md:col-span-2 relative aspect-[16/10] bg-nike-soft-cloud dark:bg-nike-dark-elevated cursor-pointer overflow-hidden group"
        >
          <img
            src={galleryImages[0]}
            alt={room.room_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 text-[14px] font-medium">
            <Maximize className="w-5 h-5" /> View Gallery
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {galleryImages.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => { setActiveImageIdx(idx + 1); setLightboxOpen(true); }}
              className="relative aspect-[16/10] bg-nike-soft-cloud dark:bg-nike-dark-elevated cursor-pointer overflow-hidden group"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setLightboxOpen(true)}
        className="text-[14px] font-medium text-nike-ink dark:text-white underline flex items-center gap-1"
      >
        <Maximize className="w-3.5 h-3.5" /> View All Photos ({galleryImages.length})
      </button>

      {/* MAIN: SPECS + BOOKING WIDGET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT — Room specs with PDP disclosure rows */}
        <div className="lg:col-span-8 space-y-0">
          
          {/* TITLE BLOCK */}
          <div className="pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[12px] font-medium px-3 py-1 rounded-full">
                {room.room_type}
              </span>
              {room.status === 'Available' ? (
                <span className="text-[12px] font-medium text-nike-success">Available</span>
              ) : (
                <span className="text-[12px] font-medium text-nike-sale">{room.status}</span>
              )}
            </div>

            <h1 className="text-[28px] md:text-[36px] font-medium text-nike-ink dark:text-white leading-tight">
              {room.room_name}
            </h1>

            {/* KEY SPECS ROW */}
            <div className="flex items-center gap-6 mt-4 text-[14px] text-nike-mute dark:text-nike-stone">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {room.capacity} Guests</span>
              <span className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4" /> {room.size_sqm} m²</span>
              <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {room.bed_type}</span>
            </div>
          </div>

          {/* PDP DISCLOSURE ROW: DESCRIPTION */}
          <div className="border-t border-nike-hairline dark:border-nike-dark-card">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-6 text-[16px] font-medium text-nike-ink dark:text-white"
            >
              Suite Description
              {detailsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {detailsOpen && (
              <div className="pb-6">
                <p className="text-[16px] text-nike-charcoal dark:text-nike-stone leading-relaxed">
                  {room.description}
                </p>
              </div>
            )}
          </div>

          {/* PDP DISCLOSURE ROW: AMENITIES */}
          <div className="border-t border-nike-hairline dark:border-nike-dark-card">
            <button
              onClick={() => setAmenitiesOpen(!amenitiesOpen)}
              className="w-full flex items-center justify-between py-6 text-[16px] font-medium text-nike-ink dark:text-white"
            >
              Amenities & Inclusions
              {amenitiesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {amenitiesOpen && (
              <div className="pb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {room.amenities.map(item => {
                  const IconComponent = AMENITY_ICONS[item] || Check;
                  return (
                    <div key={item} className="flex items-center gap-2.5 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card text-[14px] text-nike-ink dark:text-white">
                      <IconComponent className="w-4 h-4 text-nike-mute shrink-0" />
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* PDP DISCLOSURE ROW: REVIEWS */}
          <div className="border-t border-nike-hairline dark:border-nike-dark-card">
            <button
              onClick={() => setReviewsOpen(!reviewsOpen)}
              className="w-full flex items-center justify-between py-6 text-[16px] font-medium text-nike-ink dark:text-white"
            >
              Reviews ({reviews.length})
              {reviewsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {reviewsOpen && (
              <div className="pb-6 space-y-6">
                {/* REVIEW FORM */}
                <form onSubmit={handleReviewSubmit} className="bg-nike-soft-cloud dark:bg-nike-dark-card p-6 space-y-4">
                  <span className="font-medium text-[14px] text-nike-ink dark:text-white block">Write a Review</span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-nike-mute">Rating:</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-0.5"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-nike-hairline'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    required
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full p-3 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card text-nike-ink dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-nike-ink rounded-none"
                  />

                  <button
                    type="submit"
                    className="bg-nike-ink dark:bg-white text-white dark:text-nike-ink font-medium text-[14px] px-6 py-2.5 rounded-full hover:opacity-80 transition-opacity"
                  >
                    Submit Review
                  </button>
                </form>

                {/* REVIEWS LIST */}
                <div className="space-y-3">
                  {reviews.map(rev => (
                    <div key={rev.id} className="p-4 bg-nike-canvas dark:bg-nike-dark-card border border-nike-hairline-soft dark:border-nike-dark-card space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[14px] text-nike-ink dark:text-white">{rev.user_name}</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[14px] text-nike-mute dark:text-nike-stone">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-nike-hairline dark:border-nike-dark-card" />

        </div>

        {/* RIGHT — Sticky Booking Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 md:p-8 space-y-6">
            
            <div className="border-b border-nike-hairline-soft dark:border-nike-dark-card pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[12px] text-nike-mute block">ราคาวันนี้ (Today's Price)</span>
                  <span className="text-[28px] font-medium text-nike-ink dark:text-white">
                    {formatCurrency(room.price)}
                  </span>
                  <span className="text-[12px] text-nike-stone block font-normal">
                    รวมภาษีและค่าธรรมเนียมแล้ว
                  </span>
                </div>
                
                <button
                  onClick={handleWishlistToggle}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-nike-soft-cloud dark:bg-nike-dark-card text-nike-ink dark:text-white hover:text-nike-sale transition-colors"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-nike-sale text-nike-sale' : ''}`} />
                </button>
              </div>

              {/* BOOKING OPTIONS HIGHLIGHT BOX */}
              <div className="mt-4 p-3.5 bg-nike-soft-cloud dark:bg-nike-dark-card space-y-2 text-[13px]">
                <div className="flex items-center gap-1.5 text-nike-success font-medium">
                  <Check className="w-4 h-4" />
                  <span>ยกเลิกฟรี (Free Cancellation)</span>
                </div>
                <p className="text-[12px] text-nike-mute leading-relaxed pl-5">
                  ยังไม่ต้องจ่ายอะไรเลยก่อนวันเข้าพัก · ท่านจะไม่ถูกเรียกชำระในขั้นตอนนี้
                </p>
              </div>
            </div>

            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between py-2 border-b border-nike-hairline-soft dark:border-nike-dark-card">
                <span className="text-nike-mute">Check-in</span>
                <span className="font-medium text-nike-ink dark:text-white">14:00 น.</span>
              </div>
              <div className="flex justify-between py-2 border-b border-nike-hairline-soft dark:border-nike-dark-card">
                <span className="text-nike-mute">Check-out</span>
                <span className="font-medium text-nike-ink dark:text-white">12:00 น.</span>
              </div>
              <div className="flex justify-between py-2 border-b border-nike-hairline-soft dark:border-nike-dark-card">
                <span className="text-nike-mute">อินเทอร์เน็ต</span>
                <span className="font-medium text-nike-success">ฟรี Wi-Fi</span>
              </div>
            </div>

            {room.status === 'Available' ? (
              <Link
                to={`/booking/${room.id}`}
                className="block w-full text-center bg-nike-ink dark:bg-white text-white dark:text-nike-ink text-[14px] font-medium py-4 rounded-full hover:opacity-80 transition-opacity"
              >
                Book Now
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-nike-hairline-soft dark:bg-nike-dark-card text-nike-mute text-[14px] font-medium py-4 rounded-full cursor-not-allowed"
              >
                Unavailable
              </button>
            )}

            <p className="text-[12px] text-center text-nike-stone">
              Best rate guaranteed with direct booking
            </p>

          </div>
        </div>

      </div>

      {/* GOOGLE MAP */}
      <GoogleMapEmbed />

      {/* LIGHTBOX */}
      <ImageLightbox
        images={galleryImages}
        initialIndex={activeImageIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

    </div>
  );
};
