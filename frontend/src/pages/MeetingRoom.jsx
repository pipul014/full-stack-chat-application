import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len = 5) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function MeetingRoom() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const zpRef = React.useRef(null); // <-- to store the Zego instance

  const myMeeting = async (element) => {
    const appID = 1344242391;
    const serverSecret = 'f5c9cdb7b96278f36fb0883601ca8b08';

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5), // userID
      randomID(5)  // username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp; // Save instance for cleanup

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  //  Cleanup when component unmounts
  React.useEffect(() => {
    return () => {
      if (zpRef.current) {
        zpRef.current.destroy(); // Properly releases camera and microphone
      }
    };
  }, []);

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
