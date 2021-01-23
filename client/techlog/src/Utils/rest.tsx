import {IReport} from './interfaces'

const BASE_URL = 'http://localhost:3002/';

const cloudName = 'techlog-cloud-key';
const PIC_URL = `https://api.cloudinary.com/v1_1/${cloudName}/`


export const getReports = async () : Promise<IReport[] | undefined>  => {

  try {
    const dbCall = await fetch(BASE_URL + 'allreports')
      .then(response => response.json());
    return dbCall

  } catch (error) {
    console.log('Fetch error', error)
  }
  return;
}

export const getReport = async (id: string ): Promise<IReport | undefined> => {

  try {
    let report = await fetch(BASE_URL + `getreport/${id}`)
      .then(response => response.json());
    return report;

  } catch (error) {
    console.log('Fetch error', error);
  }
  return;
}

export const postReport = async (title: string, searchTags: string[], description: string, steps: string[], filterPics: HTMLInputElement[]): Promise<void> => {

    //Format + upload pics if required
    let picsUrls : string[] = await uploadPics(filterPics);

    await fetch(BASE_URL + 'postreport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      tags: searchTags,
      description: description,
      steps: steps,
      images: picsUrls
    })
  }).catch(err => console.log('Fetch error (SERVER)', err));
}

export const uploadPics = async (filterPics : HTMLInputElement[]) : Promise<string[]> => {

  let picsUrls : string[] = [];

  if (filterPics.length > 0) {

    //Config pics before fetch - async doesn't work inside forEach...
    for (const pic of filterPics) {

      const formData = new FormData();
      formData.append('file', pic.files![0]);
      formData.append('upload_preset', 'ppgbubn6');

      await fetch(PIC_URL + 'upload', {
        method: 'POST',
        body: formData,
      }).then(response => response.json())
        .then(data => picsUrls.push(data.url))
        .catch(err => console.log('Fetch error (CLOUDINARY)', err))
      }
      return picsUrls;
  }
    return [];
}

export const editReport = async (formCopy: IReport) : Promise<void> => {
  const { _id, title, tags, description, steps } = formCopy;

  await fetch(BASE_URL + 'editreport', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: _id,
      title: title,
      tags: tags,
      description: description,
      steps: steps
    })
  }).catch(err => console.log('Fetch error', err));
}

export const deleteReport = async (id: string) : Promise<void>  => {
  await fetch(BASE_URL + `deletereport/${id}`, {
    method: 'DELETE'
  }).catch(err => console.log('Fetch error', err))
}

export default {
  getReports,
  getReport,
  postReport,
  uploadPics,
  deleteReport,
  editReport
}