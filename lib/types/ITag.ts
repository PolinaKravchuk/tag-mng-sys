export default interface ITag {
  id: string;
  name: string;
  description: string;
  type: string;
  triggerRule: {
    type: string;
    identificatorClass: string;
  };
  goal: string;
}
