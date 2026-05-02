import type { Task, Blocker } from '../../store/useAppStore';

/**
 * Firebase Firestore Database Scaffold
 * Abstracts interactions with Google Cloud Firestore collections.
 */
export const firestoreService = {
  async fetchTasks(projectId: string): Promise<Task[]> {
    console.log(`Fetching tasks for project ${projectId} from Firestore...`);
    // Mock response handled by global store
    return Promise.resolve([]);
  },

  async updateTaskStatus(taskId: string, status: Task['status']): Promise<void> {
    console.log(`Updating task ${taskId} to status ${status} in Firestore...`);
    return Promise.resolve();
  },

  async addExtractedMeetingTasks(meetingId: string, tasks: Task[]): Promise<void> {
    console.log(`Batch writing ${tasks.length} tasks to Firestore from meeting ${meetingId}...`);
    return Promise.resolve();
  },

  async streamBlockers(projectId: string, _callback: (blockers: Blocker[]) => void): Promise<() => void> {
    console.log(`Setting up Firestore snapshot listener for blockers in project ${projectId}...`);
    // Mock unsubscribe function
    return () => console.log('Unsubscribed from blocker snapshot.');
  }
};
