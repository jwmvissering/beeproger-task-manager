export class TodoItemModel {
  constructor(data?: any) {
    Object.assign(this, data);
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
    if (data.completedAt) {
      this.completedAt = new Date(data.completedAt);
    }
  }

  id: string;
  title: string;
  description: string;
  createdAt: Date;
  image: string;
  priority: 'low' | 'medium' | 'high';
  order: string;
  completed: boolean;
  completedAt: Date;

  get priorityLabel(): string {
    switch (this.priority) {
      case 'low':
        return 'Laag';
      case 'high':
        return 'Hoog';
      case 'medium':
      default:
        return 'Normaal';
    }
  }

  get priorityIconClass(): string {
    switch (this.priority) {
      case 'low':
        return 'fa-arrow-down';
      case 'high':
        return 'fa-arrow-up';
      case 'medium':
      default:
        return 'fa-arrow-up';
    }
  }

  get priorityColor(): string {
    switch (this.priority) {
      case 'low':
        return 'text-success';
      case 'high':
        return 'text-danger';
      case 'medium':
      default:
        return 'text-warning';
    }
  }
}
