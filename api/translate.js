export const pathTranslateText =
  "https://fastapi-server-7qblj4clha-uc.a.run.app/translateText";
export const pathTranslateAudio =
  "https://fastapi-server-7qblj4clha-uc.a.run.app/translateAudio";

export const fetchTranslate = (path, data) =>
  fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    redirect: "follow",
    Connection: "keep-alive",
    body: JSON.stringify(data),
  });

//mode: 'cors',
export const postAudioFile = (path, data) => {
  return fetch(path, {
    method: "POST",
    body: data,
  });
};
