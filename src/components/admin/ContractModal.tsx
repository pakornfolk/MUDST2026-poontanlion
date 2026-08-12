import React, { useEffect } from 'react';
import { Lease } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Printer, X, FileCheck, Download } from 'lucide-react';

interface ContractModalProps {
  lease: Lease;
  onClose: () => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({ lease, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl max-w-3xl w-full p-8 shadow-2xl space-y-6 my-8 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:w-full print:rounded-none">

        {/* TOP ACTION HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Apartment Lease Agreement Contract
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors border border-gray-200"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CONTRACT CONTENT */}
        <div className="space-y-6 text-sm leading-relaxed font-sans text-gray-800 print:text-xs">

          {/* HEADER BRANDING */}
          <div className="text-center space-y-1 border-b border-gray-300 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
              VICTORY APARTMENT BANGKOK
            </h1>
            <p className="text-xs text-gray-600">422 Phaya Thai Rd, Ratchathewi, Bangkok 10400</p>
            <p className="text-xs text-gray-600">Phone: +66 2 123 4567 | Email: admin@victoryapartment.com</p>
            <div className="pt-2">
              <span className="inline-block px-4 py-1 bg-gray-100 text-gray-900 font-bold text-base rounded-md tracking-wide">
                APARTMENT LEASE CONTRACT AGREEMENT
              </span>
            </div>
          </div>

          {/* CONTRACT DATES & NO */}
          <div className="flex justify-between items-center text-xs font-medium border-b border-gray-200 pb-2">
            <span>Contract No: <strong>{lease.id.toUpperCase()}</strong></span>
            <span>Date Created: <strong>{formatDate(lease.createdAt)}</strong></span>
          </div>

          {/* PARTIES INFORMATION */}
          <div className="space-y-3">
            <p>
              This Agreement is made between <strong>Victory Apartment Bangkok</strong> (hereinafter referred to as the <strong>"Lessor"</strong>) of the one part, and:
            </p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 block">Tenant Name:</span>
                  <span className="font-bold text-gray-900 text-sm">{lease.tenantName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Contact Phone:</span>
                  <span className="font-bold text-gray-900">{lease.tenantPhone}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Assigned Unit:</span>
                  <span className="font-bold text-blue-600 text-sm">Unit Number {lease.roomNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Billing Cycle:</span>
                  <span className="font-bold text-gray-900 uppercase">
                    {lease.billingCycle}
                  </span>
                </div>
              </div>
            </div>

            <p>
              (hereinafter referred to as the <strong>"Lessee"</strong>) of the other part. Both parties agree to the following terms and conditions:
            </p>
          </div>

          {/* TERMS & CONDITIONS */}
          <div className="space-y-3 text-xs border-t border-gray-200 pt-3">
            <div>
              <h4 className="font-bold text-gray-900">Article 1: Lease Duration & Dates</h4>
              <p className="mt-0.5 text-gray-700">
                The Lessor agrees to lease Unit <strong>{lease.roomNumber}</strong> to the Lessee starting from <strong>{formatDate(lease.checkInDate)}</strong> to <strong>{formatDate(lease.checkOutDate)}</strong>.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">Article 2: Rent & Security Deposit</h4>
              <ul className="list-disc list-inside space-y-1 mt-0.5 text-gray-700">
                <li>The Lessee agrees to pay rent of <strong>{formatCurrency(lease.rentAmount)} THB</strong> per billing cycle due by the 5th of each month.</li>
                <li>The Lessee has deposited a security deposit of <strong>{formatCurrency(lease.depositAmount)} THB</strong> upon signing this agreement.</li>
                <li>Utilities are metered separately: Water at <strong>18 THB/unit</strong>, Electricity at <strong>7 THB/unit</strong>.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">Article 3: Apartment Regulations</h4>
              <p className="mt-0.5 text-gray-700">
                The Lessee shall keep the unit clean, observe quiet hours after 10:00 PM, and not make structural alterations or keep pets without prior written consent.
              </p>
            </div>
          </div>

          {/* SIGNATURE SECTION */}
          <div className="pt-8 border-t border-gray-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-10">
              <p className="text-gray-600">Signed..........................................................Lessee</p>
              <p className="font-bold text-gray-900">( {lease.tenantName} )</p>
            </div>
            <div className="space-y-10">
              <p className="text-gray-600">Signed..........................................................Lessor</p>
              <p className="font-bold text-gray-900">( Victory Apartment Representative )</p>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1.5"
          >
            <X className="w-4 h-4" /> Close Contract
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-4 h-4" /> Download / Print Contract PDF
          </button>
        </div>

      </div>
    </div>
  );
};
