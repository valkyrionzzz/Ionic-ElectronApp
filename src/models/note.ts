export class Note{
  title: string;
  note: string;
  created: number;
  color: string;
  constructor( title, note, created, color){
    this.title = title;
    this.note = note;
    this.created = created;
    this.color = color;
    return this;
  }
}
