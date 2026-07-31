import React, { useState } from 'react';
import { Download, Upload, CheckCircle2, QrCode } from 'lucide-react';
import { formatCurrency, getPromptPayQRUrl } from '../../utils/formatters';

interface PromptPayQRProps {
  amount: number;
  bookingNo: string;
  onSlipSelected: (slipUrl: string) => void;
}

export const PromptPayQR: React.FC<PromptPayQRProps> = ({
  amount,
  bookingNo,
  onSlipSelected,
}) => {
  const [previewSlip, setPreviewSlip] = useState<string | null>(null);
  const qrUrl = getPromptPayQRUrl(amount);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewSlip(result);
        onSlipSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-6 md:p-8 space-y-6">
      
      <div className="text-center border-b border-nike-hairline-soft dark:border-nike-dark-card pb-4">
        <span className="text-[14px] font-medium text-nike-mute dark:text-nike-stone flex items-center justify-center gap-1.5">
          <QrCode className="w-4 h-4" /> Thai PromptPay Payment
        </span>
        <h3 className="text-[24px] font-medium text-nike-ink dark:text-white mt-1">
          {formatCurrency(amount)}
        </h3>
        <p className="text-[13px] text-nike-mute dark:text-nike-stone mt-1">
          Ref Booking: {bookingNo}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* QR CODE BOX */}
        <div className="flex flex-col items-center p-6 bg-nike-soft-cloud dark:bg-nike-dark-card">
          <div className="bg-white p-4 border border-nike-hairline">
            <img src={qrUrl} alt="PromptPay QR Code" className="w-52 h-52 object-contain" />
          </div>
          <div className="text-center mt-4">
            <p className="text-[14px] font-medium text-nike-ink dark:text-white">Account: Victory Room Hotel</p>
            <p className="text-[13px] text-nike-mute dark:text-nike-stone">PromptPay ID: 081-234-5678</p>
          </div>
          <a
            href={qrUrl}
            download={`PromptPay_${bookingNo}.png`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 text-[13px] font-medium text-nike-ink dark:text-white underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Save QR Code
          </a>
        </div>

        {/* UPLOAD PAYMENT SLIP */}
        <div className="space-y-4">
          <label className="block text-[14px] font-medium text-nike-ink dark:text-white">
            Upload Payment Slip (Required)
          </label>

          {previewSlip ? (
            <div className="relative border-2 border-dashed border-nike-success bg-green-50/30 dark:bg-green-950/20 p-4 text-center">
              <img src={previewSlip} alt="Payment Slip Preview" className="max-h-48 mx-auto object-contain mb-2 border border-nike-hairline" />
              <div className="flex items-center justify-center gap-1.5 text-nike-success text-[13px] font-medium">
                <CheckCircle2 className="w-4 h-4" /> Payment Slip Loaded
              </div>
              <button
                onClick={() => { setPreviewSlip(null); onSlipSelected(''); }}
                className="text-[12px] text-nike-sale underline mt-2 font-medium"
              >
                Change Slip Image
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-nike-hairline dark:border-nike-dark-card hover:border-nike-ink bg-nike-soft-cloud dark:bg-nike-dark-card p-8 flex flex-col items-center justify-center cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-nike-mute mb-2" />
              <span className="text-[14px] font-medium text-nike-ink dark:text-white">Click or Drag Slip Image</span>
              <span className="text-[12px] text-nike-mute dark:text-nike-stone mt-1">Supports JPG, PNG, WEBP</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          <p className="text-[12px] text-nike-mute dark:text-nike-stone leading-relaxed">
            After uploading your slip, click "Submit Payment". Our team will verify your transfer and update your booking to <strong className="text-nike-success">Paid</strong>.
          </p>
        </div>

      </div>

    </div>
  );
};
