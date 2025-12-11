import { Project, User, Activity } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  avatar: 'https://picsum.photos/id/1005/100/100',
  role: 'Product Owner'
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://picsum.photos/id/1011/100/100', role: 'Lead Dev' },
  { id: 'u3', name: 'Mike Johnson', avatar: 'https://picsum.photos/id/1012/100/100', role: 'Designer' },
  { id: 'u4', name: 'Emily Davis', avatar: 'https://picsum.photos/id/1027/100/100', role: 'Marketing' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Overhaul the main corporate website with new branding guidelines.',
    status: 'active',
    progress: 75,
    members: [MOCK_USERS[0], MOCK_USERS[2]],
    dueDate: '2023-12-15'
  },
  {
    id: 'p2',
    name: 'Mobile App Launch',
    description: 'Prepare the iOS and Android apps for the Q1 global launch.',
    status: 'on-hold',
    progress: 40,
    members: [MOCK_USERS[1], MOCK_USERS[0], MOCK_USERS[3]],
    dueDate: '2024-02-28'
  },
  {
    id: 'p3',
    name: 'Internal Tools Migration',
    description: 'Migrating legacy CRM data to the new unified platform.',
    status: 'completed',
    progress: 100,
    members: [MOCK_USERS[1]],
    dueDate: '2023-10-01'
  },
  {
    id: 'p4',
    name: 'AI Feature Integration',
    description: 'Implementing Gemini API for smart summaries in the dashboard.',
    status: 'active',
    progress: 15,
    members: [MOCK_USERS[0], MOCK_USERS[1]],
    dueDate: '2024-01-20'
  }
];

export const RECENT_ACTIVITY: Activity[] = [
  { id: 'a1', user: MOCK_USERS[1], action: 'commented on', target: 'Mobile App Launch', timestamp: '2h ago' },
  { id: 'a2', user: MOCK_USERS[2], action: 'uploaded designs for', target: 'Website Redesign', timestamp: '4h ago' },
  { id: 'a3', user: MOCK_USERS[0], action: 'created project', target: 'AI Feature Integration', timestamp: '1d ago' },
];

export const CHART_DATA = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 7 },
  { name: 'Wed', tasks: 5 },
  { name: 'Thu', tasks: 12 },
  { name: 'Fri', tasks: 9 },
  { name: 'Sat', tasks: 3 },
  { name: 'Sun', tasks: 2 },
];