import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const speakText = (text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    synth.speak(utter);
  };

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex].replace(/^\d+\.\s*/, "");
      speakText(q);
    }
  }, [currentIndex, questions]);

  const handleGenerate = async () => {
    if (!jobRole || !jobDescription) return alert("Enter both role and description");
    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_role: jobRole, job_description: jobDescription }),
      });
      const data = await res.json();
      setQuestions(data.questions || []);
      setAnswers({});
      setResults({});
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions. Check backend.");
    }
  };

  const handleScore = async () => {
    const answer = answers[currentIndex];
    if (!answer) return alert("Please type an answer");

    try {
      const question = questions[currentIndex].replace(/^\d+\.\s*/, "");
      const res = await fetch("http://localhost:5000/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const data = await res.json();

      // Save the result for this question
      setResults((prev) => ({ ...prev, [currentIndex]: data }));

      // Speak feedback and improvements
      speakText(`Score: ${data.score}`);
      if (data.feedback) data.feedback.forEach(f => speakText(`Feedback: ${f}`));
      if (data.improvements) data.improvements.forEach(imp => speakText(`Suggestion: ${imp}`));

      // Move to next question
      if (currentIndex + 1 < questions.length) setCurrentIndex(currentIndex + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to score answer. Check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Interview Simulator</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="border-2 border-green-500 rounded px-3 py-2 w-full md:w-64 bg-black text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="border-2 border-green-500 rounded px-3 py-2 w-full md:w-96 h-24 bg-black text-white placeholder-gray-400"
        />
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Questions
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <div
            key={i}
            className={`bg-gray-900 p-4 rounded shadow border border-green-500 ${
              i === currentIndex ? "" : "opacity-70"
            }`}
          >
            <p className="font-semibold mb-2 text-green-400">
              Q{i + 1}: {q.replace(/^\d+\.\s*/, "")}
            </p>

            {i === currentIndex && (
              <>
                <textarea
                  placeholder="Type your answer here"
                  value={answers[i] || ""}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
                  className="border-2 border-green-500 rounded w-full h-20 p-2 mb-2 bg-black text-white placeholder-gray-400"
                />
                <button
                  onClick={handleScore}
                  className="bg-green-600 text-black px-3 py-1 rounded hover:bg-green-700 mb-2"
                >
                  Submit Answer
                </button>
              </>
            )}

            {results[i] && (
              <div className="bg-gray-800 p-3 rounded border border-green-500 mt-2">
                <p className="font-semibold text-green-400">Score: {results[i].score}</p>
                <div className="mt-1">
                  <p className="font-semibold text-green-400">Feedback:</p>
                  <ul className="list-disc list-inside text-white">
                    {results[i].feedback.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-1">
                  <p className="font-semibold text-green-400">Improvements:</p>
                  <ul className="list-disc list-inside text-white">
                    {results[i].improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
