import React from 'react';
import { Wifi, Sparkles, MapPin, Star, ShieldCheck, Heart } from 'lucide-react';

export const About: React.FC = () => {
  const nearbyLandmarks = [
    { name: 'สยามดิสคัฟเวอรี่ (Siam Discovery)', distance: '2.7 กม.' },
    { name: 'ศูนย์การค้ามาบุญครอง (MBK Center)', distance: '3.0 กม.' },
    { name: 'สยามพารากอน (Siam Paragon)', distance: '3.1 กม.' },
    { name: 'พิพิธภัณฑ์บ้านไทย จิม ทอมป์สัน', distance: '3.3 กม.' },
    { name: 'เกษรพลาซ่า (Gaysorn Plaza)', distance: '3.3 กม.' },
    { name: 'เซ็นทรัลเวิลด์พลาซ่า (CentralWorld)', distance: '3.5 กม.' },
    { name: 'ซีไลฟ์ แบงคอก โอเชียน เวิลด์', distance: '3.8 กม.' },
    { name: 'สนามบินนานาชาติดอนเมือง (DMK Airport)', distance: '22 กม.' },
  ];

  return (
    <div className="pb-section">
      
      {/* CAMPAIGN HERO */}
      <section className="relative bg-nike-ink overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80" alt="Victory Room exterior" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-24 md:py-36 space-y-4">
          <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-[13px] font-medium inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> คะแนนทำเลที่ตั้ง 8.4 (คู่รักชอบเป็นพิเศษ)
          </span>
          <h1 className="text-campaign-sm md:text-campaign-md lg:text-campaign text-white font-display leading-none">
            VICTORY ROOM<br/>BANGKOK
          </h1>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-section space-y-12">
        
        {/* MAIN DESCRIPTION & IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[13px] text-nike-mute font-medium uppercase tracking-wider block">เกี่ยวกับ Victory Room</span>
              <h2 className="text-[28px] font-medium text-nike-ink dark:text-white leading-tight">
                ห้องพักพร้อมเครื่องปรับอากาศและห้องน้ำส่วนตัว ใจกลางกรุงเทพฯ
              </h2>
            </div>
            
            <p className="text-[16px] text-nike-charcoal dark:text-nike-stone leading-relaxed">
              <strong>Victory Room</strong> ให้บริการห้องพักพร้อมเครื่องปรับอากาศและห้องน้ำแบบส่วนตัว โดยตั้งอยู่ในกรุงเทพมหานคร ห่างจากสยามดิสคัฟเวอรี่ ไม่เกิน 2.7 กม. และห่างจากศูนย์การค้ามาบุญครอง ไม่เกิน 3 กม. โฮสเทลพร้อมอินเทอร์เน็ตไร้สาย (WiFi) ฟรีนี้ตั้งอยู่ห่างจากพิพิธภัณฑ์บ้านไทย จิม ทอมป์สัน ประมาณ 3.3 กม.
            </p>
            
            <p className="text-[16px] text-nike-charcoal dark:text-nike-stone leading-relaxed">
              นอกจากนี้ยังอยู่ห่างจากเกษรพลาซ่า 3.3 กม. ที่พักนี้ปลอดบุหรี่และมีทำเลที่ตั้งอยู่ห่างจากสยามพารากอน 3.1 กม. ที่ Victory Room ห้องพักทั้งหมดประกอบด้วยโต๊ะ โทรทัศน์จอแบน และห้องน้ำแบบส่วนตัว
            </p>

            {/* POPULAR AMENITIES */}
            <div className="pt-4 border-t border-nike-hairline dark:border-nike-dark-card space-y-3">
              <h3 className="text-[16px] font-medium text-nike-ink dark:text-white">สิ่งอำนวยความสะดวกยอดนิยม</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[14px]">
                <div className="flex items-center gap-2.5 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card">
                  <Wifi className="w-4 h-4 text-nike-ink dark:text-white" />
                  <span>รวมบริการ Wi-Fi ฟรี</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card">
                  <ShieldCheck className="w-4 h-4 text-nike-ink dark:text-white" />
                  <span>ห้องปลอดบุหรี่</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-nike-soft-cloud dark:bg-nike-dark-card">
                  <Sparkles className="w-4 h-4 text-nike-ink dark:text-white" />
                  <span>ทำความสะอาดรายวัน</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" alt="Victory Room" className="w-full h-80 object-cover bg-nike-soft-cloud" />
            <div className="p-5 bg-nike-soft-cloud dark:bg-nike-dark-elevated space-y-2">
              <div className="flex items-center gap-2 text-nike-sale font-medium text-[14px]">
                <Heart className="w-4 h-4 fill-nike-sale" />
                <span>คะแนนการเข้าพักสำหรับ 2 คน: 8.4</span>
              </div>
              <p className="text-[13px] text-nike-mute leading-relaxed">
                คู่รักชอบทำเลที่ตั้งนี้เป็นพิเศษ เดินทางสะดวกใกล้แหล่งช้อปปิ้งชั้นนำและสถานบันเทิง
              </p>
            </div>
          </div>
        </div>

        {/* NEARBY LANDMARKS */}
        <div className="bg-nike-canvas dark:bg-nike-dark-elevated border border-nike-hairline dark:border-nike-dark-card p-8 space-y-6">
          <h3 className="text-[20px] font-medium text-nike-ink dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5" /> สถานที่สำคัญใกล้เคียง (Nearby Landmarks)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[14px]">
            {nearbyLandmarks.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-nike-soft-cloud dark:bg-nike-dark-card flex justify-between items-center">
                <span className="font-medium text-nike-ink dark:text-white truncate">{item.name}</span>
                <span className="text-nike-mute font-mono text-[13px] shrink-0 ml-2">{item.distance}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
