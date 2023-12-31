import React, { ReactElement } from "react";
import Header from "./Header";

function PageWrapper({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between px-4 py-6 md:p-24">
        {children}
      </main>
    </>
  );
}

export default PageWrapper;
