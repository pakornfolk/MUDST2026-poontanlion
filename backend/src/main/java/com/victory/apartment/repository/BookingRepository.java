package com.victory.apartment.repository;

import com.victory.apartment.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findAllByOrderByCreatedAtDesc();
}
