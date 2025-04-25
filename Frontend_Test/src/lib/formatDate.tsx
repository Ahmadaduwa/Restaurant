interface FormatDateOptions {
    year: 'numeric';
    month: 'long';
    day: 'numeric';
}

export function formatDate(date: string): string {
    const options: FormatDateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('th-TH', options);
}
  