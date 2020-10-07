const callWaiter = (table: string) => {
  return new Promise((resolve, reject) => {
    fetch("http://172.18.33.18:8081/call/" + table, {
      method: "post"
    })
      .then(response => response.json())
      .then(call => resolve(call))
      .catch(error => console.log(error));
  });
};

export default callWaiter;
