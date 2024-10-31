'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

interface LinkButtonProps {
  href: string;
  className?: string;
  label: string;
}

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => (
  <Link href={props.href}>
  <Button className={props.className}>
    {props.label}
    </Button>
    </Link>
);

export default LinkButton;