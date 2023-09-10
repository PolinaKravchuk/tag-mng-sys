"use client";
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <NewHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-white font-semibold text-lg">
            Tag mng sys
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {pathname !== "/tags" && (
            <Button variant="outline">
              <Link
                href="/tags"
                className="text-white hover:text-zinc-800 transition duration-300"
              >
                Tags
              </Link>
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-white hover:text-blue-200 transition duration-300"
              >
                <RxHamburgerMenu
                  color="white"
                  fontSize="1.5em"
                  className="w-4 h-4"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {pathname !== "/tags" && (
                  <DropdownMenuItem>
                    <Link href="/tags" className="w-full">
                      Tags
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </NewHeader>
  );
}

export default Header;

const NewHeader = styled.header`
  background-color: #014;
  padding: 16px;
`;
