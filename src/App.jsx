import { useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!isLogin && !name) {
      alert("Please enter your name.");
      return;
    }

    alert(
      isLogin
        ? "Login page is working!"
        : "Sign Up page is working!"
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">

      {!started ? (

        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Welcome to FocusMate!
          </h1>

          <p className="mt-4 text-gray-600">
            Your smart study and productivity companion.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>

      ) : (

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

          <h1 className="text-3xl font-bold text-blue-600 text-center">
            FocusMate
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Your journey to better productivity starts here.
          </p>

          <div className="flex mt-8 mb-6 border-b">

            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-3 font-semibold ${
                isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-3 font-semibold ${
                !isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Sign Up
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border rounded-lg p-3 outline-blue-500"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border rounded-lg p-3 outline-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border rounded-lg p-3 outline-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>

          </form>

          <p className="text-center text-gray-500 mt-6">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold ml-2"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>

          <button
            onClick={() => setStarted(false)}
            className="block mx-auto mt-5 text-gray-500 hover:text-blue-600"
          >
            ← Back to Home
          </button>

        </div>
      )}

    </div>
  );
}

export default App;