import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const Home = () => {
  const [streamers, setStreamers] = useState([]);
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/streamers")
      .then((response) => response.json())
      .then((data) => setStreamers(data.streamers))
      .catch((error) => console.error("Failed to fetch streamers:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/streamers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, platform, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Streamer submitted successfully:", data);
        setStreamers([...streamers, data.streamer]);
        setName("");
        setPlatform("");
        setDescription("");
        window.location.href = `http://localhost:3001/streamers/${data.id}`;
      })
      .catch((error) => console.error("Failed to submit streamer:", error));
  };

  return (
    <>
      <section className="wrapper">
        <h1>Streamer Spotlight Application</h1>
        <p>
          Add your favourite streamers along with some relevant details. Other
          users can then upvote or downvote these streamers!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="col">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              required
              maxLength={100}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="platform">Platform:</label>
            <select
              value={platform}
              id="platform"
              required
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">Select a platform</option>
              <option value="Twitch">Twitch</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Kick">Kick</option>
              <option value="Rumble">Rumble</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="description">Description:</label>
            <textarea
              value={description}
              id="description"
              rows={3}
              maxLength={255}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
      <section className="wrapper" id="streamers">
        <h2>Streamer List</h2>
        <p>
          This is a dynamic group of individuals who are passionate about what
          they do.
        </p>
        {streamers.length === 0 ? (
          <p>No streamers found.</p>
        ) : (
          <ul>
            {streamers.map((streamer) => {
              if (!streamer || !streamer.name) {
                return null;
              }
              return (
                <li key={streamer.id}>
                  <Link to={`/streamers/${streamer.id}`}>
                    <img
                      src={`https://i.pravatar.cc/300?u=${streamer.id}`}
                      alt={`${streamer.name} avatar`}
                    />
                    <h3>
                      {streamer.name} ({streamer.platform})
                    </h3>
                    <p className="streamer-description">
                      {streamer.description}
                    </p>
                    <div className="upvotes-row">
                      <p className="streamer-upvotes">
                        Upvotes: <span>{streamer.upvotes}</span>,
                      </p>
                      <p className="streamer-downvotes">
                        Downvotes: <span>{streamer.downvotes}</span>
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
};
