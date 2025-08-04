import React, { useState, useRef, useEffect } from "react";
import {
  LinkSimpleHorizontal,
  Plus,
  CameraPlus,
  CopySimple,
  X,
  Check,
} from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/meeting/business-meeting.webp";

const MeetingPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [copiedLink, setCopiedLink] = useState("");
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStartInstantMeeting = () => {
    const roomId = uuidv4();
    navigate(`/meeting/${roomId}`);
  };

  const handleCreateMeetingLater = () => {
    const roomId = uuidv4();
    const link = `${window.location.origin}/meeting/${roomId}`;
    setCopiedLink(link);
    setShowCopiedPopup(true);
    setShowDropdown(false);
  };

  const handleCopy = () => {
    if (copiedLink) {
      navigator.clipboard
        .writeText(copiedLink)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1000);
        })
        .catch(() => alert("❌ Failed to copy link."));
    }
  };

  const handleJoin = () => {
    const code = joinCode.trim();
    const lastSlash = code.lastIndexOf("/");
    const finalCode = lastSlash !== -1 ? code.substring(lastSlash + 1) : code;
    if (finalCode) {
      navigate(`/meeting/${finalCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-boxdark flex items-center justify-center px-4 py-10 w-full ">
      <div className="bg-white dark:bg-boxdark-2 rounded-3xl shadow-4 w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden h-full ">
        {/* LEFT PANEL */}
        <div className="flex flex-col justify-center p-10 space-y-6 border-b md:border-b-0 md:border-r border-stroke dark:border-strokedark max-w-2xl">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold leading-tight text-black dark:text-white">
              Video calls and meetings<br className="hidden sm:block" /> for everyone
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-md">
              Connect, collaborate and celebrate from anywhere with your video app.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap sm:gap-2 w-full">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow"
              >
                <CameraPlus size={20} weight="bold" />
                New meeting
              </button>

              {showDropdown && (
                <div className="absolute top-full mt-2 bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark shadow-xl rounded-xl w-72 z-10 overflow-hidden transition-all duration-200">
                  <button
                    onClick={handleCreateMeetingLater}
                    className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
                  >
                    <LinkSimpleHorizontal size={20} weight="bold" />
                    <span className="font-medium">Create a meeting for later</span>
                  </button>
                  <button
                    onClick={handleStartInstantMeeting}
                    className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
                  >
                    <Plus size={20} weight="bold" />
                    <span className="font-medium">Start an instant meeting</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-grow items-center border border-gray-300 dark:border-strokedark rounded-full overflow-hidden px-4 py-2 w-full sm:w-auto min-w-[250px]">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter a code or link"
                className="flex-grow bg-transparent text-sm focus:outline-none dark:text-white"
              />
            </div>

            <button
              onClick={handleJoin}
              disabled={!joinCode.trim()}
              className={`text-sm font-medium ${
                joinCode.trim() ? "text-blue-600 hover:underline" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Join
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden md:flex flex-col items-center justify-center dark:bg-boxdark p-10 text-center">
          <img
            src={illustration}
            alt="Meeting"
            className="w-full max-w-xs h-auto object-contain rounded-2xl"
          />
          <h2 className="text-xl font-semibold mt-6 text-black dark:text-white">Get a link you can share</h2>
          <p className="text-body dark:text-bodydark mt-2 max-w-sm">
            Click <span className="font-semibold text-black dark:text-white">New meeting</span> to get a link you can send to others.
          </p>
        </div>
      </div>

      {/* Copied Link Popup */}
      {showCopiedPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-boxdark p-6 rounded-xl shadow-xl w-96 text-center relative">
            <button
              onClick={() => setShowCopiedPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Meeting Link</h2>
            <div className="bg-gray-100 dark:bg-boxdark-2 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm break-all text-black dark:text-white">{copiedLink}</span>
              <button onClick={handleCopy} className="text-blue-600 hover:text-blue-800 ml-2">
                {isCopied ? <Check size={20} /> : <CopySimple size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2 dark:text-gray-400">Share this link with your participants</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;
