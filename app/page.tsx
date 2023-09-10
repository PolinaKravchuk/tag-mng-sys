import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <section className="w-full flex flex-col justify-center items-center">
        <h1 className="text-xl" data-testid="welcomTitle" role="heading">
          Hello Move team!
        </h1>{" "}
        <p>Welcome to this simple Tag management system</p>
        <p>
          To see the list of tags, go to{" "}
          <Link href="/tags" className="underline text-zinc-100">
            Tags page
          </Link>
        </p>
      </section>
    </PageWrapper>
  );
}
