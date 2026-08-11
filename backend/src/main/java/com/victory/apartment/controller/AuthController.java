package com.victory.apartment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.getOrDefault("email", "").trim().toLowerCase();
        String password = credentials.getOrDefault("password", "").trim();

        Map<String, Object> response = new HashMap<>();

        // Simple admin authentication (no external auth providers per project rules)
        boolean isAdmin = (email.equals("admin") || email.equals("admin@victoryapartment.com"))
                && password.equals("admin");

        if (isAdmin) {
            Map<String, Object> user = new HashMap<>();
            user.put("id", "usr-admin-01");
            user.put("fullname", "Victory Admin");
            user.put("email", "admin@victoryapartment.com");
            user.put("role", "admin");
            response.put("success", true);
            response.put("user", user);
            return ResponseEntity.ok(response);
        }

        response.put("success", false);
        response.put("error", "Invalid credentials. Use admin/admin to login.");
        return ResponseEntity.status(401).body(response);
    }
}
