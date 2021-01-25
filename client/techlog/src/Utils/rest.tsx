import {IReport} from './interfaces'

const BASE_URL = 'http://localhost:3002/';

const cloudName = 'techlog-cloud-key';
const PIC_URL = `https://api.cloudinary.com/v1_1/${cloudName}/`


export const getReports = async () : Promise<IReport[] | undefined>  => {

  try {
    const response = await fetch(BASE_URL + 'allreports')
    return await response.json();
  } catch (error) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', error)
  }
  return;
}

export const getReport = async (id: string ): Promise<IReport | undefined> => {
  try {
    const response = await fetch(BASE_URL + `getreport/${id}`);
    return await response.json();

  } catch (error) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', error);
  }
  return;
}

export const postReport = async (title: string, searchTags: string[], description: string, steps: string[], filterPics: HTMLInputElement[]): Promise<void> => {
  //Format + upload pics if required
  let picsUrls : string[] = await uploadPics(filterPics);
  try {
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
    })});
  } catch (error) {
    if(process.env.NODE_ENV !== 'test')  console.log('Fetch error (SERVER)', error)
  }
}

export const uploadPics = async (filterPics : HTMLInputElement[]) : Promise<string[]> => {

  let picsUrls : string[] = [];

  if (filterPics.length > 0) {
    //Config pics before fetch - async doesn't work inside forEach...
    for (const pic of filterPics) {
      const formData = new FormData();
      formData.append('file', pic.files![0]);
      formData.append('upload_preset', 'ppgbubn6');

      try {
        const res = await fetch(PIC_URL + 'upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json();
        picsUrls.push(data.url)
        return picsUrls;
      } catch (error) {
        if(process.env.NODE_ENV !== 'test') console.log('Fetch error (CLOUDINARY)', error)
      }
    }
  }
  return [];
}

export const editReport = async (formCopy: IReport) : Promise<void> => {
  const { _id, title, tags, description, steps } = formCopy;

  try  {
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
    })
  } catch (err) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', err)
  }
}

export const deleteReport = async (id: string) : Promise<void>  => {
  try {
    await fetch(BASE_URL + `deletereport/${id}`, {
      method: 'DELETE'
    })
  } catch (err) {
    if(process.env.NODE_ENV !== 'test') console.log('Fetch error', err)
  }
}

const rest = {
  getReports,
  getReport,
  postReport,
  uploadPics,
  deleteReport,
  editReport
}
export default rest;
