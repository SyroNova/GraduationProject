export function getDaysSince(date: string): string {
    const createdAt = new Date(date);
    const now = new Date();

    const colombiaDate = (date: Date) =>
        new Intl.DateTimeFormat("en-CA", {
            timeZone: "America/Bogota",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);

    const created = new Date(`${colombiaDate(createdAt)}T00:00:00`);
    const today = new Date(`${colombiaDate(now)}T00:00:00`);

    const diffDays = Math.floor(
        (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Publicado hoy";
    if (diffDays === 1) return "Publicado hace 1 día";
    if (diffDays > 1) return `Publicado hace ${diffDays} días`;

    return "";
}

export function getDateClean(date: string): string{
    console.log(date)
    return date.split("T")[0]
}