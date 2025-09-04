import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-between mx-20 mt-6 ">
        <Link className="text-3xl font-semibold" href="form">Form </Link>
        <div>
          <Link className="text-2xl font-extralight" href="download">Download</Link>
        </div>
      </nav>
    </div>
  );
}
