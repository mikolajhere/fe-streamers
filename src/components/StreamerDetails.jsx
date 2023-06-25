import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const StreamerDetails = () => {
  const { streamerId } = useParams();
  const [streamer, setStreamer] = useState(null);
  const [vote, setVote] = useState("");
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/streamers/${streamerId}`)
      .then((response) => response.json())
      .then((data) => setStreamer(data.streamer))
      .catch((error) => console.error("Failed to fetch streamer:", error));
  }, [streamerId]);

  const handleVoteChange = (event) => {
    setVote(event.target.value);
  };

  const handleVoteSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/streamers/${streamerId}/vote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ voteType: vote }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Vote submitted successfully:", data);
        setVoted(true);
      })
      .catch((error) => {
        console.error("Failed to submit vote:", error);
      });
  };

  if (!streamer) {
    return (
      <div className="loading">
        <p>Page not found 😢</p>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  return (
    <section className="wrapper streamer">
      <h1>{streamer.name}</h1>
      <img
        src={`https://i.pravatar.cc/300?u=${streamer.id}`}
        alt={`${streamer.name} avatar`}
      />
      <p>Platform: {streamer.platform}</p>
      <p>{streamer.description}</p>
      <h2>Vote</h2>
      {voted ? (
        <>
          <p>Thank you for voting! 🎉</p>
          <p>
            <Link to={"/"}>Go back home</Link>
          </p>
        </>
      ) : (
        <form onSubmit={handleVoteSubmit}>
          <div className="input-container">
            <input
              type="radio"
              id="upvote"
              value="upvote"
              checked={vote === "upvote"}
              onChange={handleVoteChange}
            />
            <label htmlFor="upvote">Upvote</label>
          </div>
          <div className="input-container">
            <input
              type="radio"
              id="downvote"
              value="downvote"
              checked={vote === "downvote"}
              onChange={handleVoteChange}
            />
            <label htmlFor="downvote">Downvote</label>
          </div>
          <button type="submit">Submit Vote</button>
        </form>
      )}
    </section>
  );
};
