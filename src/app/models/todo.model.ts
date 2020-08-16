export class Todo {
  constructor(
    public id: number,
    public todo: string,
    public date: Date,
    public priority: number,
    public status: boolean,
    public category: number,
  ){}
}
