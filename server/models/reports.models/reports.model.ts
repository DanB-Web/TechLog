import Report, {IReport} from './reports.schema';

export const allReports = () : [IReport] => Report.find({});

export const getReport = (id : string) : IReport => Report.findById(id);

export const newReport = (data : IReport) : Promise<IReport> => Report.create(data);

export const editReport = (id : string, update : IReport) : IReport => Report.findByIdAndUpdate(id, update);

export const deleteReport = (id: string) : IReport =>  Report.findByIdAndDelete({_id:id});
