import LogIn from "./login/page";
import SignUp from "./signup/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] " >
      <Link href='/signup' >
        <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          Sign Up
        </button>
      </Link>
      <br />

      <Link href='/login' >
        <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          Log In
        </button>
      </Link>
    </main>
  );
}
