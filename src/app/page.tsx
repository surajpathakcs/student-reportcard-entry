import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-start mx-20 mt-6 text-3xl font-semibold">
        <Link href="form">Form </Link>
      </nav>
    </div>
  );
}
