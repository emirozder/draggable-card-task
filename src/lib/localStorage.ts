export const loadData = () => {
  try {
    const data = localStorage.getItem("tasks");
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("load eror", err);
    return undefined;
  }
};

export const saveData = (state: any) => {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem("tasks", data);
  } catch (err) {
    console.error("save error", err);
  }
};
