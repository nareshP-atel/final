export const exportToJSON = (entries) => {
  const jsonString = JSON.stringify(entries, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `journal-entries-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (entries) => {
  const headers = ['Date', 'Mood', 'Content', 'AI Mood'];
  const csvContent = entries.map(entry => [
    entry.date,
    entry.mood,
    `"${entry.content.replace(/"/g, '""')}"`,
    entry.aiMood
  ]);
  
  const csvString = [
    headers.join(','),
    ...csvContent.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `journal-entries-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};