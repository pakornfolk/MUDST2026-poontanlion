-- =======================================================
-- VICTORY ROOM - LUXURY HOTEL SEED DATA
-- =======================================================

-- Hotel Information
INSERT INTO public.hotel_information (
  id, hotel_name, address, phone, email, google_map_embed, google_map_link, check_in_time, check_out_time, parking, policies
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Victory Room',
  '422 Phaya Thai Rd, Ratchathewi, Bangkok 10400, Thailand',
  '+66 2 123 4567',
  'booking@victoryroom.com',
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.19999351021974!2d100.53845303753965!3d13.766815673124919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fc9a50a3117%3A0xa9ce6fd4e2755f19!2sVictory%20Room!5e0!3m2!1sth!2sth!4v1785481678759!5m2!1sth!2sth" width="100%" height="450" style="border:0;border-radius:16px;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
  'https://maps.google.com/?q=Victory+Room+Bangkok',
  '14:00',
  '12:00',
  'Free VIP Underground Parking with EV Charging',
  'Check-in requires valid government ID. No smoking in guest rooms. Pets allowed in designated Villa suites only.'
) ON CONFLICT (id) DO NOTHING;

-- Mock Rooms
INSERT INTO public.rooms (id, room_number, room_name, room_type, description, capacity, price, status, amenities, size_sqm, bed_type)
VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  '101',
  'Victory Deluxe City View',
  'Deluxe',
  'Sophisticated deluxe room with floor-to-ceiling panoramic views of Bangkok skyline, plush king bedding, and Italian marble bathroom with rain shower.',
  2,
  3500.00,
  'Available',
  ARRAY['Wi-Fi', 'TV', 'Air Conditioner', 'Refrigerator', 'Water Heater', 'Balcony', 'Parking', 'Breakfast'],
  42,
  'King Bed'
),
(
  '22222222-2222-2222-2222-222222222222',
  '202',
  'Executive Horizon Suite',
  'Executive Suite',
  'Expansive suite featuring a separate living room, dedicated workspace, high-speed fiber internet, and exclusive access to the Sky Lounge with complimentary evening cocktails.',
  3,
  6800.00,
  'Available',
  ARRAY['Wi-Fi', 'TV', 'Air Conditioner', 'Refrigerator', 'Water Heater', 'Balcony', 'Parking', 'Breakfast'],
  68,
  'Super King Bed'
),
(
  '33333333-3333-3333-3333-333333333333',
  '303',
  'Presidential Sky Penthouse',
  'Presidential Suite',
  'The crown jewel of Victory Room. Features 180-degree skyline views, private jacuzzi on the terrace, personal 24-hour butler service, and custom Bose audio system.',
  4,
  15000.00,
  'Reserved',
  ARRAY['Wi-Fi', 'TV', 'Air Conditioner', 'Refrigerator', 'Water Heater', 'Balcony', 'Parking', 'Breakfast'],
  120,
  '2 King Beds'
),
(
  '44444444-4444-4444-4444-444444444444',
  '404',
  'Grand Family Sanctuary',
  'Family Suite',
  'Designed for families seeking refined luxury. Offers two spacious bedrooms, children play nook, dining table, and gourmet kitchenette.',
  5,
  8500.00,
  'Available',
  ARRAY['Wi-Fi', 'TV', 'Air Conditioner', 'Refrigerator', 'Water Heater', 'Balcony', 'Parking', 'Breakfast'],
  90,
  '1 King + 2 Single Beds'
),
(
  '55555555-5555-5555-5555-555555555555',
  '505',
  'Victory Royal Pool Villa',
  'Villa',
  'Private urban oasis featuring a secluded heated plunge pool, lush tropical garden, marble bath, and private dining pavilion.',
  4,
  22000.00,
  'Occupied',
  ARRAY['Wi-Fi', 'TV', 'Air Conditioner', 'Refrigerator', 'Water Heater', 'Balcony', 'Parking', 'Breakfast'],
  180,
  'King Bed + Daybed'
) ON CONFLICT (room_number) DO NOTHING;

-- Room Cover Images
INSERT INTO public.room_images (room_id, image_url, is_cover, display_order) VALUES
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', true, 0),
('11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', false, 1),
('22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80', true, 0),
('22222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80', false, 1),
('33333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80', true, 0),
('44444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', true, 0),
('55555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', true, 0);
