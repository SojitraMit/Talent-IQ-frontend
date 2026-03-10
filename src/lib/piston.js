const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.0.0" },
  python: { language: "python", version: "3.12.0" },
  java: { language: "java", version: "17.0.2" },
};
// This function executes code in a specified programming language using the Piston API. It sends a POST request to the API with the language and code, and returns the output or error message based on the response.
/**
 * @param {string} language - The programming language to execute the code in.
 * @param {string} code - The code to be executed.
 * @returns {Promise<{success: boolean, output?:string, error?:string}>} - An object containing the success status and either the output or error message.
 *
 */

export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            code: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `API request failed with status ${response.status}`,
      };
    }
    const data = await response.json();
    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "An error occurred while executing the code",
    };
  }
}

const getFileExtension = (language) => {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
};
