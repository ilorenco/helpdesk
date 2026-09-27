type PageHeaderProps = {
    title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
    return <h1 className="text-lg text-blue-dark lg:text-xl">{title}</h1>;
}
