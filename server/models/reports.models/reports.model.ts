import Report, {IReportDoc, IReport} from './reports.schema';

export const allReports = async () : Promise<[IReportDoc]> => await Report.find({});

export const getReport = (id : string) : IReportDoc => Report.findById(id);

export const newReport = (data : IReport) : Promise<IReportDoc> => Report.create(data);

export const editReport = (id : string, update : IReport) : IReportDoc =>
  Report.findByIdAndUpdate(id, update, {useFindAndModify:false, new:true});

export const deleteReport = (id: string) : IReportDoc =>  Report.findByIdAndDelete({_id:id});
