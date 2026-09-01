export function sanitizePerformanceIndicator(text?: string): string {
  if (!text) return 'Learner can: Demonstrate understanding of key curriculum concepts.';

  let formatted = text
    .replace(/Learners?\s+will\s+be\s+able\s+to\s*:?/gi, 'Learner can:')
    .replace(/Learners\s+can\s*:?/gi, 'Learner can:')
    .replace(/Learner\s+can\s*:\s*Learner\s+can\s*:/gi, 'Learner can:');

  if (!/^(Day\s+\d+|Learner\s+can:)/i.test(formatted.trim())) {
    formatted = `Learner can: ${formatted.trim()}`;
  }

  return formatted;
}
