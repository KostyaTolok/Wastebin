import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism-tomorrow.css";

function Code(props) {
  useEffect(() => {
    console.log(props.language);
    Prism.highlightAll();
  });

  return (
    <pre className="code-area">
      <code
        id="code-content"
        className={`language-${props.language} line-numbers`}
      >
        {props.code}
      </code>
    </pre>
  );
}

export default Code;
