import { render, cleanup, screen, act } from '@testing-library/react';

import rest from '../../Utils/rest';
import Modal from '../Modal'

jest.mock('../../Utils/rest');

const reportId = jest.fn((id: string) => {});
const toggleModal = jest.fn();
const callReports = jest.fn();
const deleteReport = jest.fn(async (id: string) => await Promise.resolve());

rest.deleteReport = deleteReport;

const ModalProps = {
  admin : true,
  id: '1234',
  title: 'Mock Report Title',
  tags: ['mock_tag'],
  description: 'mock description',
  steps: ['mock_step'],
  images: ['mock.jpg'],
  reportId,
  toggleModal,
  callReports
}

describe('Modal component tests', () => {

  afterEach(cleanup);

  it('should render Modal component with props', () => {
    const { getByRole, getByText} =  render(<Modal {...ModalProps}/>);
    expect(getByText('1234')).not.toBeNull();
    expect(getByText('Mock Report Title')).not.toBeNull();
    expect(getByText('#mock_tag')).not.toBeNull();
    expect(getByText('mock description')).not.toBeNull();
    expect(getByText(/mock_step/)).not.toBeNull();
    expect((getByRole('img') as HTMLImageElement).src).toBe(`http://localhost/mock.jpg`);
  });

  it('should render images only if present', () => {
    render(<Modal {...ModalProps}/>);
    expect(screen.queryByText(/Images/)).not.toBeNull();

    cleanup();

    render(<Modal {...ModalProps} images={[]} />);
    expect(screen.queryByText(/Images/)).toBeNull();
  });



  it('should display COPY ID and DELETE buttons only if user is admin', () => {
    render(<Modal {...ModalProps} admin={false}/>);
    expect(screen.queryByText(/COPY ID/)).toBeNull();
    expect(screen.queryByText(/DELETE/)).toBeNull();

    cleanup();

    render(<Modal {...ModalProps}/>);
    expect(screen.queryByText(/COPY ID/)).not.toBeNull();
    expect(screen.queryByText(/DELETE/)).not.toBeNull();
  });

  it('should close the modal', () => {
    const { getByText} =  render(<Modal {...ModalProps}/>);
    getByText(/CLOSE/).click();
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });

  it('should trigger report delete', async () => {
    const { getByText} =  render(<Modal {...ModalProps}/>);
    await getByText(/DELETE/).click();

    expect(deleteReport).toHaveBeenCalledTimes(1);
    expect(deleteReport).toHaveBeenCalledWith('1234');
    expect(callReports).toHaveBeenCalledTimes(1);
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });

  it('should should copy the report ID', () => {
    const { getByText} =  render(<Modal {...ModalProps}/>);
    getByText(/COPY ID/).click();

    expect(reportId).toHaveBeenCalledTimes(1);
    expect(reportId).toHaveBeenCalledWith('1234');
  });

});