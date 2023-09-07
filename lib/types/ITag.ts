type Variable = {
  type: string;
  code: string;
};
export default interface ITag {
  id: string;
  name: string;
  description: string;
  type: string;
  triggerRule: {
    type: string;
    identificatorClass: string;
  };
  variablesToCollect: Variable[];
  goal: string;
  icon: string;
}
