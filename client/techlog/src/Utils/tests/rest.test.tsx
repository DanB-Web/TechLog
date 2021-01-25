import { render } from '@testing-library/react';
import { IReport } from '../interfaces';
import rest from '../rest';

const mockAPI = jest.fn(() => Promise.reject());
global.fetch = mockAPI;

const baseURL = 'http://localhost:3002/'

const mockReport : IReport = {
  title: 'mock report',
  tags: ['bar'],
  description: 'foo',
  steps: ['steps'],
  images: []
}
const mockInputImages : HTMLInputElement[] = []

describe('Rest API Tests', () => {

  it('Should call the allreports endpoint', async () => {
    await rest.getReports()
    expect(mockAPI).toHaveBeenCalledTimes(1);
    expect(mockAPI).toHaveBeenCalledWith(baseURL + 'allreports')
  });

  it('Should call the getreport endpoint with an id', async () => {
    await rest.getReport('1234')
    expect(mockAPI).toHaveBeenCalledTimes(1);
    expect(mockAPI).toHaveBeenCalledWith(baseURL + 'getreport/1234');
  });

  it('Should call the postreport endpoint with some data', async () => {
    await rest.postReport(mockReport.title, mockReport.tags, mockReport.description, mockReport.steps, mockInputImages)
    expect(mockAPI).toHaveBeenCalledTimes(1);
    expect(mockAPI).toHaveBeenCalledWith(baseURL + 'postreport',{
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(mockReport)
    });
  });

  it('Should upload pictures to cloudinary account', async () => {
    const {getByTitle} = render(<input type='file' title='mockFileInput'/>);
    const mockFileInput = getByTitle('mockFileInput')
    const mockFile = new File(['(⌐□_□)'], 'mockFile.png', {
      type: 'image/png',
    });
    Object.defineProperty(mockFileInput, 'files', {
      value: [
        mockFile
      ]
    })
    const mockFormData = new FormData();
    mockFormData.append('file', mockFile);
    mockFormData.append('upload_preset', 'ppgbubn6');

    await rest.uploadPics([mockFileInput as HTMLInputElement]);
    expect(mockAPI).toHaveBeenCalledTimes(1);
    expect(mockAPI).toHaveBeenCalledWith(
      'https://api.cloudinary.com/v1_1/techlog-cloud-key/upload', {
        method:'POST',
        body: mockFormData
      }
    );
  });

  it('Should call the editreport endpoint with data', async () => {
    const input = { _id: '1234', ...mockReport };
    delete input.images;
    await rest.editReport(input)
    expect(mockAPI).toHaveBeenCalledTimes(1);
    expect(mockAPI).toHaveBeenCalledWith(baseURL + 'editreport', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });
  });

  it('Should call the deleteReport endpoint with an id', async () => {
    await rest.deleteReport('1234')
    expect(mockAPI).toHaveBeenCalledTimes(1);
    expect(mockAPI).toHaveBeenCalledWith(baseURL + 'deletereport/1234', {
      method: 'DELETE'
    });
  });

});
