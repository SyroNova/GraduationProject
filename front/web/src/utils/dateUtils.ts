export function getDaysSince(date: string): string {
    const createdAt = new Date(date)

    const now = new Date()

    const diffTime = now.getTime() - createdAt.getTime()

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    let days = ""

    if(diffDays === 0) days = "Publicado hoy"

    if(diffDays === 1) days = "Publicado hace 1 día"

    if(diffDays > 1) days = `Publicado hace ${diffDays} días`
    
    return days
}