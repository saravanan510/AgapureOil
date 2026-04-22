import React from 'react';
import { Phone, Users, MessageCircle } from 'lucide-react';

export const MobileBottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-[60] bg-primary/80 backdrop-blur-md border-t border-white/20 px-6 py-3 flex justify-between items-center text-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <a href="tel:+918136840790" className="flex flex-col items-center space-y-1 group">
        <div className="p-2 rounded-full group-active:bg-white/20 transition-colors">
          <Phone size={24} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">Call US</span>
      </a>
      <a href="#contact" className="flex flex-col items-center space-y-1 group">
        <div className="p-2 rounded-full group-active:bg-white/20 transition-colors">
          <Users size={24} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">Call Back</span>
      </a>
      <a href="https://wa.me/918136840790" target="_blank" rel="noreferrer" className="flex flex-col items-center space-y-1 group">
        <div className="p-2 rounded-full group-active:bg-white/20 transition-colors">
          <MessageCircle size={24} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">Whatsapp</span>
      </a>
    </div>
  );
};
