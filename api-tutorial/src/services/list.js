
export function getList() {
  return fetch('http://localhost:3333/list')
         .then(data => data.json());
}

export function setItem(item) {
  return fetch('http://localhost:3333/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({item})
  })
    .then(data => {
      if(!data.ok) {
        throw new Error("Couldn't fetch resource");
      }
      return data.json();
  })
    .catch(error => console.error(error));
}