import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const UserInfoBox = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "[First_Last]",
    email: "[Email]",
    ufid: "[UFID]",
    bio: "[Bio]",
    discord: "[Discord_Username]",
    roles: "[ex: Webdev member, Interns]",
    password: "xxxxxxxxxx",
  });

  useEffect(() => {
    // Fetch user data from backend? not too sure how to fully implement tbh and idk if its right
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then(() => setEditMode(false));
  };

  return (
    <div style={{
      width: "75%",
      borderRadius: "16px",
      border: "1px solid black",
      background: "white",
      padding: "24px 40px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>User Info</p>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          onClick={() => setEditMode(true)}>
          <Icon icon="material-symbols:edit" width="24" height="24" color="#0668B3" />
          <p style={{ fontWeight: "600", color: "#0668B3" }}>Edit</p>
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          {["name", "ufid", "bio", "discord", "roles"].map((field) => (
            <div key={field} style={{ marginBottom: "16px" }}>
              <p>{field.charAt(0).toUpperCase() + field.slice(1)}:</p>
              <input
                type="text"
                name={field}
                value={userData[field]}
                onChange={handleChange}
                disabled={!editMode}
                style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid black", background: editMode ? "white" : "#e0e0e0" }}
              />
            </div>
          ))}
        </div>
        <div style={{ width: "45%" }}>
          <div style={{ marginBottom: "16px" }}>
            <p>Email:</p>
            <input type="text" name="email" value={userData.email} disabled style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid black", background: "#e0e0e0" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <p>Password:</p>
            <p>{userData.password}</p>
            <p style={{ color: saseblue, cursor: "pointer" }}>2FA to reset password</p>
            {/* does not work*/}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
        <button onClick={handleSave} disabled={!editMode} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid black", background: editMode ? "#0668B3" : "#e0e0e0", color: "white", fontWeight: "600", cursor: editMode ? "pointer" : "not-allowed" }}>Save</button>
      </div>
    </div>
  );
};

export default UserInfoBox;