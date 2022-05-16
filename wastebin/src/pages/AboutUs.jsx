import React from "react";
import "./about-us.css";

function AboutUs() {
  return (
    <section className="about-us">
      <h3 className="title title_bold about-us__title">About us</h3>
      <article>
        <h4 className="title title_bold about-us__article-title">
          General information
        </h4>
        <p className="about-us__text">
          Wastebin is an analog of Pastebin which allows users to store and
          share text online. Mainly designed for programmers to store pieces of
          source code or configuration information since it supports syntax
          highlighting.
        </p>
      </article>
      <article>
        <h4 className="title title_bold about-us__article-title">
          Wastebin provides these functions:{" "}
        </h4>
        <ol className="about-us__text">
          <li>Creation of code bins</li>
          <li>Live syntax highlighting</li>
          <li>Configuration of bin expiration, publicity and password</li>
          <li>View most recent public bins</li>
          <li>Search through your own bins</li>
          <li>View any public bin, edit your bins</li>
          <li>Configuration of user profile</li>
        </ol>
      </article>
    </section>
  );
}

export default AboutUs;
