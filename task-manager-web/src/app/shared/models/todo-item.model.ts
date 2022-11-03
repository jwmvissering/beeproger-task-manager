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
  completed: boolean;
  completedAt: Date;
  image: string;
  priority: string;
  order: string;

}
