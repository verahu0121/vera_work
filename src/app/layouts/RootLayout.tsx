import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { ContactPopup } from "../components/ContactPopup";

export function RootLayout() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about me");
  const location = useLocation();
  const isResumePage = location.pathname === "/resume";

  // Sidebar interaction
  const handleContactClick = () => setIsContactPopupOpen(!isContactPopupOpen);
  const handleHomeClick = () => setIsContactPopupOpen(false);

  return (
    <div className={`w-full h-screen flex overflow-hidden relative transition-colors duration-500 ${isResumePage ? "bg-[#F9F9F9]" : "bg-[#151419]"}`}>
      {!isResumePage && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1770795263316-f302a878ee64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjBtaW5pbWFsaXN0JTIwdGV4dHVyZSUyMGJhY2tncm91bmQlMjBibGFja3xlbnwxfHx8fDE3NzU3MTg2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")',
            backgroundSize: 'cover'
          }}
        />
      )}
      
      {/* Shared Sidebar */}
      <Sidebar 
        isContactActive={isContactPopupOpen} 
        onContactClick={handleContactClick} 
        onHomeClick={handleHomeClick}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content Area */}
      <div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        onClick={() => {
          if (isContactPopupOpen) setIsContactPopupOpen(false);
        }}
      >
        <ContactPopup isOpen={isContactPopupOpen} />
        
        <div className="flex-1 h-full flex items-center justify-center relative">
          <Outlet context={{ isContactPopupOpen, setIsContactPopupOpen, activeSection, setActiveSection }} />
        </div>
      </div>
    </div>
  );
}
