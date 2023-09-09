"use client";
import React from "react";
import Link from "next/link";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="https://www.linkedin.com/in/palina-krauchuk/">
            Created by <span className="underline">Palina Krauchuk</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="mailto:polina8kravchuk@gmail.com" className="underline">
            polina8kravchuk@gmail.com
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
