// import React from 'react';
// import illustration from '../assets/meeting/business-meeting.webp';

// const MeetingPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-3 dark:bg-boxdark flex items-center justify-center px-4 py-10 w-full">
//       <div className="bg-white dark:bg-boxdark-2 rounded-3xl shadow-4 w-full  grid grid-cols-1 md:grid-cols-2 overflow-hidden h-full">

//         {/* LEFT PANEL */}
//         <div className="flex flex-col justify-center p-10 space-y-6 border-b md:border-b-0 md:border-r border-stroke dark:border-strokedark max-w-2xl">
//           <h1 className="text-3xl font-bold text-black dark:text-white">
//             Start or Join a Meeting
//           </h1>

//           <button className="bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-lg font-medium shadow transition duration-200">
//             + New Meeting
//           </button>

//           <div className="flex items-center gap-4">
//             <hr className="flex-grow border-t border-stroke dark:border-strokedark" />
//             <span className="text-body dark:text-bodydark text-sm">or</span>
//             <hr className="flex-grow border-t border-stroke dark:border-strokedark" />
//           </div>

//           <input
//             type="text"
//             placeholder="Enter a code or link"
//             className="w-full px-4 py-3 rounded-xl border border-stroke dark:border-strokedark bg-white dark:bg-form-input text-black dark:text-white placeholder:text-bodydark focus:outline-none focus:ring-2 focus:ring-primary"
//           />

//           <button className="border border-primary text-primary dark:text-white py-3 rounded-xl text-lg font-medium hover:bg-primary hover:text-white transition duration-200">
//             Join
//           </button>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="hidden   md:flex flex-col items-center justify-center  dark:bg-boxdark p-10 text-center ">
//           <img
//             src={illustration}
//             alt="Meeting"
//             className="w-full max-w-xs h-auto object-contain rounded-2xl"
//           />
//           <h2 className="text-xl font-semibold mt-6 text-black dark:text-white">
//             Get a link you can share
//           </h2>
//           <p className="text-body dark:text-bodydark mt-2 max-w-sm">
//             Click <span className="font-semibold text-black dark:text-white">New meeting</span> to get a link you can send to others.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingPage;

// import React, { useState, useRef, useEffect } from "react";
// import { LinkSimpleHorizontal, Plus, CameraPlus } from "@phosphor-icons/react";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import illustration from "../assets/meeting/business-meeting.webp";

// const MeetingPage = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [joinCode, setJoinCode] = useState("");
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Actions
//   const handleStartInstantMeeting = () => {
//     const roomId = uuidv4();
//     navigate(`/meeting/${roomId}`);
//   };

//   const handleCreateMeetingLater = () => {
//     const roomId = uuidv4();
//     const link = `${window.location.origin}/meeting/${roomId}`;
//     navigator.clipboard.writeText(link);
//     alert("📋 Meeting link copied:\n" + link);
//     setShowDropdown(false);
//   };

//   const handleJoin = () => {
//     if (joinCode.trim()) {
//       navigate(`/meeting/${joinCode.trim()}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-3 dark:bg-boxdark flex items-center justify-center px-4 py-10 w-full">
//       <div className="bg-white dark:bg-boxdark-2 rounded-3xl shadow-4 w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden h-full">
//         {/* LEFT PANEL */}
//         <div className="flex flex-col justify-center p-10 space-y-6 border-b md:border-b-0 md:border-r border-stroke dark:border-strokedark max-w-2xl">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-semibold leading-tight text-black dark:text-white">
//               Video calls and meetings
//               <br className="hidden sm:block" /> for everyone
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-md">
//               Connect, collaborate and celebrate from anywhere with your video
//               app.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap sm:gap-2 w-full">
//             {/* New Meeting Button + Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow"
//               >
//                 <CameraPlus size={20} weight="bold" />
//                 New meeting
//               </button>

//               {showDropdown && (
//                 <div className="absolute top-full mt-2 bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark shadow-xl rounded-xl w-72 z-10 overflow-hidden transition-all duration-200">
//                   <button
//                     onClick={handleCreateMeetingLater}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <LinkSimpleHorizontal size={20} weight="bold" />
//                     <span className="font-medium">
//                       Create a meeting for later
//                     </span>
//                   </button>
//                   <button
//                     onClick={handleStartInstantMeeting}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <Plus size={20} weight="bold" />
//                     <span className="font-medium">
//                       Start an instant meeting
//                     </span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Input Field */}
//             <div className="flex flex-grow items-center border border-gray-300 dark:border-strokedark rounded-full overflow-hidden px-4 py-2 w-full sm:w-auto min-w-[250px]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-600 dark:text-white mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5h6M9 9h6m-6 4h6m-6 4h6M4 6h16M4 10h16M4 14h16M4 18h16"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 value={joinCode}
//                 onChange={(e) => setJoinCode(e.target.value)}
//                 placeholder="Enter a code or link"
//                 className="flex-grow bg-transparent text-sm focus:outline-none dark:text-white"
//               />
//             </div>

//             {/* Join Button */}
//             <button
//               onClick={handleJoin}
//               disabled={!joinCode.trim()}
//               className={`text-sm font-medium ${
//                 joinCode.trim()
//                   ? "text-blue-600 hover:underline"
//                   : "text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Join
//             </button>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="hidden md:flex flex-col items-center justify-center dark:bg-boxdark p-10 text-center">
//           <img
//             src={illustration}
//             alt="Meeting"
//             className="w-full max-w-xs h-auto object-contain rounded-2xl"
//           />
//           <h2 className="text-xl font-semibold mt-6 text-black dark:text-white">
//             Get a link you can share
//           </h2>
//           <p className="text-body dark:text-bodydark mt-2 max-w-sm">
//             Click{" "}
//             <span className="font-semibold text-black dark:text-white">
//               New meeting
//             </span>{" "}
//             to get a link you can send to others.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingPage;

// import React, { useState, useRef, useEffect } from "react";
// import { LinkSimpleHorizontal, Plus, CameraPlus } from "@phosphor-icons/react";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import illustration from "../assets/meeting/business-meeting.webp";

// // Optional: Toast notification
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// const MeetingPage = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [joinCode, setJoinCode] = useState("");
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Start instant meeting
//   const handleStartInstantMeeting = () => {
//     const roomId = uuidv4();
//     navigate(`/meeting/${roomId}`);
//   };

//   // Create meeting for later
//   const handleCreateMeetingLater = () => {
//     const roomId = uuidv4();
//     const link = `${window.location.origin}/meeting/${roomId}`;

//     navigator.clipboard.writeText(link)
//       .then(() => {
//         alert("📋 Meeting link copied:\n" + link);
//         // toast.success("📋 Meeting link copied to clipboard!");
//         setShowDropdown(false);
//       })
//       .catch((err) => {
//         console.error("Clipboard copy failed:", err);
//         alert("❌ Could not copy link. Please copy manually:\n" + link);
//       });
//   };

//   // Join meeting
//   const handleJoin = () => {
//     const input = joinCode.trim();
//     if (!input) return;

//     let roomId = input;

//     try {
//       const url = new URL(input);
//       const parts = url.pathname.split("/");
//       roomId = parts[parts.length - 1];
//     } catch {
//       // Input is not a URL, assume direct roomId
//     }

//     navigate(`/meeting/${roomId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-3 dark:bg-boxdark flex items-center justify-center px-4 py-10 w-full">
//       <div className="bg-white dark:bg-boxdark-2 rounded-3xl shadow-4 w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden h-full">
        
//         {/* LEFT PANEL */}
//         <div className="flex flex-col justify-center p-10 space-y-6 border-b md:border-b-0 md:border-r border-stroke dark:border-strokedark max-w-2xl">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-semibold leading-tight text-black dark:text-white">
//               Video calls and meetings
//               <br className="hidden sm:block" /> for everyone
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-md">
//               Connect, collaborate and celebrate from anywhere with your video app.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap sm:gap-2 w-full">
            
//             {/* New Meeting Button + Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow"
//               >
//                 <CameraPlus size={20} weight="bold" />
//                 New meeting
//               </button>

//               {showDropdown && (
//                 <div className="absolute top-full mt-2 bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark shadow-xl rounded-xl w-72 z-10 overflow-hidden transition-all duration-200">
//                   <button
//                     onClick={handleCreateMeetingLater}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <LinkSimpleHorizontal size={20} weight="bold" />
//                     <span className="font-medium">Create a meeting for later</span>
//                   </button>
//                   <button
//                     onClick={handleStartInstantMeeting}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <Plus size={20} weight="bold" />
//                     <span className="font-medium">Start an instant meeting</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Input Field */}
//             <div className="flex flex-grow items-center border border-gray-300 dark:border-strokedark rounded-full overflow-hidden px-4 py-2 w-full sm:w-auto min-w-[250px]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-600 dark:text-white mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5h6M9 9h6m-6 4h6m-6 4h6M4 6h16M4 10h16M4 14h16M4 18h16"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 value={joinCode}
//                 onChange={(e) => setJoinCode(e.target.value)}
//                 placeholder="Enter a code or link"
//                 className="flex-grow bg-transparent text-sm focus:outline-none dark:text-white"
//               />
//             </div>

//             {/* Join Button */}
//             <button
//               onClick={handleJoin}
//               disabled={!joinCode.trim()}
//               className={`text-sm font-medium ${
//                 joinCode.trim()
//                   ? "text-blue-600 hover:underline"
//                   : "text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Join
//             </button>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="hidden md:flex flex-col items-center justify-center dark:bg-boxdark p-10 text-center">
//           <img
//             src={illustration}
//             alt="Meeting"
//             className="w-full max-w-xs h-auto object-contain rounded-2xl"
//           />
//           <h2 className="text-xl font-semibold mt-6 text-black dark:text-white">
//             Get a link you can share
//           </h2>
//           <p className="text-body dark:text-bodydark mt-2 max-w-sm">
//             Click <span className="font-semibold text-black dark:text-white">New meeting</span> to get a link you can send to others.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingPage;




// import React, { useState, useRef, useEffect } from "react";
// import { LinkSimpleHorizontal, Plus, CameraPlus, CopySimple, X } from "@phosphor-icons/react";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import illustration from "../assets/meeting/business-meeting.webp";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MeetingPage = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [joinCode, setJoinCode] = useState("");
//   const [copiedLink, setCopiedLink] = useState("");
//   const [showCopiedPopup, setShowCopiedPopup] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleStartInstantMeeting = () => {
//     const roomId = uuidv4();
//     navigate(`/meeting/${roomId}`);
//   };

//   const handleCreateMeetingLater = () => {
//     const roomId = uuidv4();
//     const link = `${window.location.origin}/meeting/${roomId}`;
//     setCopiedLink(link);
//     setShowCopiedPopup(true);
//     setShowDropdown(false);
//   };

//   const handleCopy = () => {
//     if (copiedLink) {
//       navigator.clipboard
//         .writeText(copiedLink)
//         .then(() => toast.success("📋 Link copied to clipboard!"))
//         .catch(() => toast.error("❌ Failed to copy link."));
//     }
//   };

//   const handleJoin = () => {
//     if (joinCode.trim()) {
//       navigate(`/meeting/${joinCode.trim()}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-3 dark:bg-boxdark flex items-center justify-center px-4 py-10 w-full relative">
//       <div className="bg-white dark:bg-boxdark-2 rounded-3xl shadow-4 w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden h-full max-w-6xl">
//         {/* LEFT PANEL */}
//         <div className="flex flex-col justify-center p-10 space-y-6 border-b md:border-b-0 md:border-r border-stroke dark:border-strokedark max-w-2xl">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-semibold leading-tight text-black dark:text-white">
//               Video calls and meetings
//               <br className="hidden sm:block" /> for everyone
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-md">
//               Connect, collaborate and celebrate from anywhere with your video app.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap sm:gap-2 w-full">
//             {/* New Meeting Button + Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow"
//               >
//                 <CameraPlus size={20} weight="bold" />
//                 New meeting
//               </button>

//               {showDropdown && (
//                 <div className="absolute top-full mt-2 bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark shadow-xl rounded-xl w-72 z-10 overflow-hidden transition-all duration-200">
//                   <button
//                     onClick={handleCreateMeetingLater}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <LinkSimpleHorizontal size={20} weight="bold" />
//                     <span className="font-medium">Create a meeting for later</span>
//                   </button>
//                   <button
//                     onClick={handleStartInstantMeeting}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <Plus size={20} weight="bold" />
//                     <span className="font-medium">Start an instant meeting</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Input Field */}
//             <div className="flex flex-grow items-center border border-gray-300 dark:border-strokedark rounded-full overflow-hidden px-4 py-2 w-full sm:w-auto min-w-[250px]">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-600 dark:text-white mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5h6M9 9h6m-6 4h6m-6 4h6M4 6h16M4 10h16M4 14h16M4 18h16"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 value={joinCode}
//                 onChange={(e) => setJoinCode(e.target.value)}
//                 placeholder="Enter a code or link"
//                 className="flex-grow bg-transparent text-sm focus:outline-none dark:text-white"
//               />
//             </div>

//             {/* Join Button */}
//             <button
//               onClick={handleJoin}
//               disabled={!joinCode.trim()}
//               className={`text-sm font-medium ${
//                 joinCode.trim()
//                   ? "text-blue-600 hover:underline"
//                   : "text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Join
//             </button>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="hidden md:flex flex-col items-center justify-center dark:bg-boxdark p-10 text-center">
//           <img
//             src={illustration}
//             alt="Meeting"
//             className="w-full max-w-xs h-auto object-contain rounded-2xl"
//           />
//           <h2 className="text-xl font-semibold mt-6 text-black dark:text-white">
//             Get a link you can share
//           </h2>
//           <p className="text-body dark:text-bodydark mt-2 max-w-sm">
//             Click{" "}
//             <span className="font-semibold text-black dark:text-white">New meeting</span> to get a link you can send to others.
//           </p>
//         </div>
//       </div>

//       {/* Copied Link Popup */}
//       {showCopiedPopup && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-boxdark p-6 rounded-xl shadow-xl w-96 text-center relative">
//             <button
//               onClick={() => setShowCopiedPopup(false)}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
//             >
//               <X size={18} />
//             </button>
//             <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Meeting Link</h2>
//             <div className="bg-gray-100 dark:bg-boxdark-2 rounded-lg p-3 flex items-center justify-between">
//               <span className="text-sm break-all text-black dark:text-white">{copiedLink}</span>
//               <button onClick={handleCopy} className="text-blue-600 hover:text-blue-800 ml-2">
//                 <CopySimple size={20} />
//               </button>
//             </div>
//             <p className="text-xs text-gray-600 mt-2 dark:text-gray-400">Share this link with your participants</p>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} theme="colored" />
//     </div>
//   );
// };

// export default MeetingPage;



// import React, { useState, useRef, useEffect } from "react";
// import {
//   LinkSimpleHorizontal,
//   Plus,
//   CameraPlus,
//   CopySimple,
//   X,
//   Check,
// } from "@phosphor-icons/react";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import illustration from "../assets/meeting/business-meeting.webp";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MeetingPage = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [joinCode, setJoinCode] = useState("");
//   const [copiedLink, setCopiedLink] = useState("");
//   const [showCopiedPopup, setShowCopiedPopup] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleStartInstantMeeting = () => {
//     const roomId = uuidv4();
//     navigate(`/meeting/${roomId}`);
//   };

//   const handleCreateMeetingLater = () => {
//     const roomId = uuidv4();
//     const link = `${window.location.origin}/meeting/${roomId}`;
//     setCopiedLink(link);
//     setShowCopiedPopup(true);
//     setShowDropdown(false);
//   };

//   const handleCopy = () => {
//     if (copiedLink) {
//       navigator.clipboard
//         .writeText(copiedLink)
//         .then(() => {
//           setIsCopied(true);
//           toast.success("📋 Link copied to clipboard!");
//           setTimeout(() => setIsCopied(false), 1000);
//         })
//         .catch(() => toast.error("❌ Failed to copy link."));
//     }
//   };

//   const handleJoin = () => {
//     if (joinCode.trim()) {
//       navigate(`/meeting/${joinCode.trim()}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-3 dark:bg-boxdark flex items-center justify-center px-4 py-10 w-full relative">
//       <div className="bg-white dark:bg-boxdark-2 rounded-3xl shadow-4 w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden h-full ">
//         {/* LEFT PANEL */}
//         <div className="flex flex-col justify-center p-10 space-y-6 border-b md:border-b-0 md:border-r border-stroke dark:border-strokedark max-w-2xl">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-semibold leading-tight text-black dark:text-white">
//               Video calls and meetings<br className="hidden sm:block" /> for everyone
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-md">
//               Connect, collaborate and celebrate from anywhere with your video app.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap sm:gap-2 w-full">
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow"
//               >
//                 <CameraPlus size={20} weight="bold" />
//                 New meeting
//               </button>

//               {showDropdown && (
//                 <div className="absolute top-full mt-2 bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark shadow-xl rounded-xl w-72 z-10 overflow-hidden transition-all duration-200">
//                   <button
//                     onClick={handleCreateMeetingLater}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <LinkSimpleHorizontal size={20} weight="bold" />
//                     <span className="font-medium">Create a meeting for later</span>
//                   </button>
//                   <button
//                     onClick={handleStartInstantMeeting}
//                     className="flex items-center gap-3 w-full text-left px-5 py-3 text-sm text-black dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition"
//                   >
//                     <Plus size={20} weight="bold" />
//                     <span className="font-medium">Start an instant meeting</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-grow items-center border border-gray-300 dark:border-strokedark rounded-full overflow-hidden px-4 py-2 w-full sm:w-auto min-w-[250px]">
//               <input
//                 type="text"
//                 value={joinCode}
//                 onChange={(e) => setJoinCode(e.target.value)}
//                 placeholder="Enter a code or link"
//                 className="flex-grow bg-transparent text-sm focus:outline-none dark:text-white"
//               />
//             </div>

//             <button
//               onClick={handleJoin}
//               disabled={!joinCode.trim()}
//               className={`text-sm font-medium ${
//                 joinCode.trim() ? "text-blue-600 hover:underline" : "text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Join
//             </button>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="hidden md:flex flex-col items-center justify-center dark:bg-boxdark p-10 text-center">
//           <img
//             src={illustration}
//             alt="Meeting"
//             className="w-full max-w-xs h-auto object-contain rounded-2xl"
//           />
//           <h2 className="text-xl font-semibold mt-6 text-black dark:text-white">Get a link you can share</h2>
//           <p className="text-body dark:text-bodydark mt-2 max-w-sm">
//             Click <span className="font-semibold text-black dark:text-white">New meeting</span> to get a link you can send to others.
//           </p>
//         </div>
//       </div>

//       {/* Copied Link Popup */}
//       {showCopiedPopup && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-boxdark p-6 rounded-xl shadow-xl w-96 text-center relative">
//             <button
//               onClick={() => setShowCopiedPopup(false)}
//               className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
//             >
//               <X size={18} />
//             </button>
//             <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Meeting Link</h2>
//             <div className="bg-gray-100 dark:bg-boxdark-2 rounded-lg p-3 flex items-center justify-between">
//               <span className="text-sm break-all text-black dark:text-white">{copiedLink}</span>
//               <button onClick={handleCopy} className="text-blue-600 hover:text-blue-800 ml-2">
//                 {isCopied ? <Check size={20} /> : <CopySimple size={20} />}
//               </button>
//             </div>
//             <p className="text-xs text-gray-600 mt-2 dark:text-gray-400">Share this link with your participants</p>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={1000} theme="colored" />
//     </div>
//   );
// };

// export default MeetingPage;



// === File: src/pages/MeetingPage.jsx ===

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
    <div className="min-h-screen bg-gray-100 dark:bg-boxdark flex items-center justify-center px-4 py-10 w-full relative">
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
