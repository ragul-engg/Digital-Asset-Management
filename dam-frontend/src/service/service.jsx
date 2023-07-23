import axios from "axios";

export async function fetchMetadata(searchItem) {
  let data = [];
  await axios
    .get(`http://localhost:8080/images?tags=${searchItem}`)
    .then((res) => {
      data = res.data;
    });
  return data;
}
