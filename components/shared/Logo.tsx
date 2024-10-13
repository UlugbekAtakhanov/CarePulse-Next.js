import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link href="/">
            <Image width={1000} height={1000} src="/assets/icons/logo-full.svg" alt="Logo" className="h-10 w-max " />
        </Link>
    );
};

export default Logo;
