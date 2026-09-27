import Image from "next/image";

const logoVariants = {
    dark: {
        iconSrc: "/images/logo-icon-dark.svg",
        iconSize: 40,
        nameClassName: "text-xl text-blue-dark",
    },
    light: {
        iconSrc: "/images/logo-icon-light.svg",
        iconSize: 44,
        nameClassName: "text-lg text-gray-600",
    },
};

type LogoProps = {
    variant?: keyof typeof logoVariants;
    subtitle?: string;
};

export function Logo({ variant = "dark", subtitle }: LogoProps) {
    const { iconSrc, iconSize, nameClassName } = logoVariants[variant];

    return (
        <div className="flex items-center gap-3">
            <Image src={iconSrc} alt="" width={iconSize} height={iconSize} />
            <div className="flex flex-col">
                <span className={nameClassName}>HelpDesk</span>
                {subtitle && <span className="text-xxs text-blue-light uppercase">{subtitle}</span>}
            </div>
        </div>
    );
}
