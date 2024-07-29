// VersionInfo.js

import React from "react";

const VersionInfo = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RedThread Version 1.0</h1>
      <h2 className="text-xl font-semibold mt-4 mb-2">Current Features</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>
          Create a post with a title, description, tags, and a single image.
        </li>
        <li>Get post recommendations based on tags.</li>
        <li>Comment on posts.</li>
        <li>Like posts.</li>
        <li>Edit or delete uploaded posts (only by the author).</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Upcoming Features</h2>
      <ul className="list-disc pl-5">
        <li>Communities for better interaction and content organization.</li>
        <li>User profiles to personalize the experience.</li>
        <li>Comment threading (comments inside comments).</li>
      </ul>
    </div>
  );
};

export default VersionInfo;
