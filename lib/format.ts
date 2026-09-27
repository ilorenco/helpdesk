const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
});

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

// Built from the parts because pt-BR joins the date and the time with ", ", and the design
// uses a single space
export function formatDateTime(date: Date) {
    const parts = Object.fromEntries(
        dateTimeFormatter.formatToParts(date).map((part) => [part.type, part.value]),
    );

    return `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute}`;
}

export function formatCurrency(amountInCents: number) {
    return currencyFormatter.format(amountInCents / 100);
}
