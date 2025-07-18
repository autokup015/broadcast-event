import { useEffect, useRef } from "react";

import "./Home.css";
import { useNavigate } from "react-router-dom";

/**
 * 🚀 TODO: IMPLEMENT LOGOUT FLOW
 *
 * INSTRUCTIONS:
 * 1. Read LOGOUT_IMPLEMENTATION_GUIDE.md for detailed steps
 * 2. Use Login.tsx as reference (has ✅ REFERENCE comments)

 *
 * PATTERN: Copy from Login.tsx but reverse the logic
 * - LOGIN sends "LOGIN" → LOGOUT sends "LOGOUT"
 * - LOGIN navigates to /home → LOGOUT navigates to /login
 * - LOGIN checks for existing auth → HOME checks for missing auth
 */

const bcMsg = new BroadcastChannel("internal_notification");
function Home() {
  const bcMsgRef = useRef<BroadcastChannel | null>(null);

  const navigate = useNavigate();

  // --------------------------- Function ---------------------------

  const triggerEvent = () => {
    bcMsg.postMessage("LOGOUT");
  };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  useEffect(() => {
    // TODO: Add Authentication Logic Here

    bcMsgRef.current = bcMsg;
    bcMsg.addEventListener("message", (event) => {
      alert(event.data);

      if (event.data === "LOGOUT") {
        handleLogout();
      }
    });

    // return () => {
    //   bcMsg.close();
    //   // TODO: Add authChannel cleanup here
    // };
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to the App</h1>

        {/* Part 1 :  Broadcast Message  */}
        <div className="broadcast-section">
          <p>
            Click the button below to broadcast a message to all tabs/windows:
          </p>
          <div className="broadcast-buttons">
            <button
              className="broadcast-button"
              onClick={() => {
                bcMsgRef.current?.postMessage("BROADCASTING!!! ❤️");
              }}
            >
              Broadcast Message
            </button>
            <br />
            <button
              className="broadcast-button"
              onClick={() => {
                handleLogout();
                triggerEvent();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
