export const formatDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return formattedDate;
}