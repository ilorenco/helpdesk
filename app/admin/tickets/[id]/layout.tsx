// Width and spacing shared by the ticket page, its loading state and its not-found state
export default function AdminTicketLayout({ children }: LayoutProps<"/admin/tickets/[id]">) {
    return <div className="mx-auto flex w-full max-w-200 flex-col gap-4 lg:gap-6">{children}</div>;
}
