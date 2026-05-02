export type ParsedTask = {
  id: string;
  text: string;
  owner?: string;
  dueDate?: string;
  blockers?: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
};

export const parseMeetingNotes = (notes: string): ParsedTask[] => {
  const lines = notes.split('\n').filter(line => line.trim().length > 0);
  const tasks: ParsedTask[] = [];

  // Common keywords for extraction
  const urgencyKeywords = {
    critical: /\b(critical|emergency|blocker|p0|asap)\b/i,
    high: /\b(urgent|high|priority|important|p1)\b/i,
    medium: /\b(medium|p2|soon)\b/i,
    low: /\b(low|whenever|p3|backlog)\b/i,
  };

  lines.forEach((line, index) => {
    // Check if line is a task (starts with bullet or task-related keyword)
    const taskMatch = line.match(/^[\s\t]*([-*+]|\[\s\]|\d+\.)\s+(.+)$|^[\s\t]*(TODO|TASK|ACTION):\s*(.+)$/i);
    
    if (taskMatch) {
      const fullText = taskMatch[2] || taskMatch[4];
      
      // Extract Owner: @Name or (Name) or "Assignee: Name"
      const ownerMatch = fullText.match(/@(\w+)|Assignee:\s*(\w+)/i);
      const owner = ownerMatch ? (ownerMatch[1] || ownerMatch[2]) : undefined;

      // Extract Due Date: "by Date", "due Date", "on Date"
      const dateMatch = fullText.match(/\b(by|due|on)\s+([\w\s/-]+)\b/i);
      const dueDate = dateMatch ? dateMatch[2].trim() : undefined;

      // Extract Blockers: "Blocker: info", "Blocked by: info"
      const blockerMatch = fullText.match(/\b(blocker|blocked by|waiting on):\s*(.+)$/i);
      const blockers = blockerMatch ? [blockerMatch[2].trim()] : undefined;

      // Determine Urgency
      let urgency: ParsedTask['urgency'] = 'medium';
      if (urgencyKeywords.critical.test(line)) urgency = 'critical';
      else if (urgencyKeywords.high.test(line)) urgency = 'high';
      else if (urgencyKeywords.low.test(line)) urgency = 'low';
      else if (dueDate && (dueDate.toLowerCase().includes('today') || dueDate.toLowerCase().includes('asap'))) urgency = 'critical';

      // Clean up text (remove owner/date/blocker patterns from the display text)
      let cleanedText = fullText
        .replace(/@(\w+)|Assignee:\s*(\w+)/gi, '')
        .replace(/\b(by|due|on)\s+([\w\s/-]+)\b/gi, '')
        .replace(/\b(blocker|blocked by|waiting on):\s*(.+)$/gi, '')
        .trim();

      tasks.push({
        id: `task-${Date.now()}-${index}`,
        text: cleanedText,
        owner,
        dueDate,
        blockers,
        urgency,
      });
    }
  });

  return tasks;
};
