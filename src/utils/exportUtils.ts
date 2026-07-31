import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Booking } from '../types';
import { formatCurrency, formatDate } from './formatters';

export const exportBookingsToPDF = (bookings: Booking[], title = 'Victory Room - Booking Report') => {
  const doc = new jsPDF();

  // Hotel Header
  doc.setFontSize(18);
  doc.setTextColor(28, 105, 212); // BMW Blue #1c69d4
  doc.text('VICTORY ROOM', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text('Luxury Hotel & Room Booking Management System', 14, 26);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 31);

  doc.setFontSize(14);
  doc.setTextColor(26, 33, 41);
  doc.text(title, 14, 42);

  const tableRows = bookings.map(b => [
    b.booking_no,
    b.guest_name,
    b.room?.room_name || 'Suite',
    formatDate(b.check_in),
    formatDate(b.check_out),
    formatCurrency(b.total_price),
    b.status
  ]);

  autoTable(doc, {
    startY: 48,
    head: [['Booking No', 'Guest Name', 'Room', 'Check In', 'Check Out', 'Total', 'Status']],
    body: tableRows,
    headStyles: {
      fillColor: [28, 105, 212],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [247, 247, 247],
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    }
  });

  doc.save(`Victory_Room_Bookings_${Date.now()}.pdf`);
};

export const exportBookingsToExcel = (bookings: Booking[], fileName = 'Victory_Room_Bookings') => {
  const data = bookings.map(b => ({
    'Booking No': b.booking_no,
    'Guest Name': b.guest_name,
    'Guest Phone': b.guest_phone,
    'Guest Email': b.guest_email,
    'Room Name': b.room?.room_name || '',
    'Room Number': b.room?.room_number || '',
    'Check In': b.check_in,
    'Check Out': b.check_out,
    'Guests': b.guest_count,
    'Total Price (THB)': b.total_price,
    'Promo Code': b.promo_code || 'None',
    'Discount (THB)': b.discount_amount || 0,
    'Status': b.status,
    'Created Date': formatDate(b.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');

  XLSX.writeFile(workbook, `${fileName}_${Date.now()}.xlsx`);
};
