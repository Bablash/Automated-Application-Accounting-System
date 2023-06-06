package App.Service;

import App.Custom.CustomRecord;
import App.Custom.RecordStatistic;
import App.Model.Procedure;
import App.Model.Record;
import App.Model.Schedule;
import App.Model.Users;
import App.Repository.ProcedureRepository;
import App.Repository.RecordRepository;
import App.Repository.ScheduleRepository;
import App.Repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static App.Model.Record.SORT_BY_CREATED_AT_DESC;

@Service
public class RecordService {
    private final RecordRepository recordR;
    private final UsersRepository userR;
    private final ProcedureRepository procedureR;
    private final ScheduleRepository scheduleR;

    public RecordService(RecordRepository recordR, UsersRepository userR, ProcedureRepository procedureR, ScheduleRepository scheduleR) {
        this.recordR = recordR;
        this.userR = userR;
        this.procedureR = procedureR;
        this.scheduleR = scheduleR;
    }

    public Record findRecord(Integer id){
        return recordR.findById(id).orElse(null);
    }

    public Record saveRecord(Record record) {
        recordR.save(record);
        return record;
    }

    public Record deleteRecord(Integer id)  {
        Record record = recordR.findById(id).orElse(null);
        recordR.deleteById(id);
        return record;
    }

    public Record updateRecord(Record record) {
        recordR.save(record);
        return record;
    }

    public List<Record> findAllRecords() {
        return recordR.findAll(SORT_BY_CREATED_AT_DESC);
    }

    public List<Record> findRecordsByDate(Date date1, Date date2) {
        return recordR.findByDateBetween(date1, date2);
    }

    public List<CustomRecord> getRecordsByUserId(Integer id){
        List<CustomRecord> tmp = new ArrayList<>();
        List<Record> records = recordR.findByUsersId(id);
        for(int i = 0; i < records.size(); i++){
            Users employee = userR.findById(records.get(i).getEmployeeId()).orElse(null);
            Users user = userR.findById(records.get(i).getUsersId()).orElse(null);
            Procedure procedure = procedureR.findById(records.get(i).getProcedureId()).orElse(null);
            if (procedure != null && employee != null && user != null) {
                tmp.add(new CustomRecord(records.get(i).getId(), records.get(i).getDate(), records.get(i).getTime(),
                        records.get(i).getStatus(),procedure.getName(),employee.getFcs(), user.getFcs()));
            }
        }
        return tmp;
    }

    public List<CustomRecord> getRecordsByEmployeeId(Integer id){
        List<CustomRecord> tmp = new ArrayList<>();
        List<Record> records = recordR.findByEmployeeId(id);
        for (Record record : records) {
            Users employee = userR.findById(record.getEmployeeId()).orElse(null);
            Users user = userR.findById(record.getUsersId()).orElse(null);
            Procedure procedure = procedureR.findById(record.getProcedureId()).orElse(null);
            if (procedure != null && employee != null && user != null) {
                tmp.add(new CustomRecord(record.getId(), record.getDate(), record.getTime(),
                        record.getStatus(), procedure.getName(), employee.getFcs(), user.getFcs()));
            }
        }
        return tmp;
    }

    public Record setRecord(Record record){
        List<Schedule> schedule = scheduleR.findByEmployeeIdAndStatusAndDateAndTimeGreaterThanEqualOrderByTime(record.getEmployeeId(),
                true, record.getDate(), record.getTime());
        Procedure procedure = procedureR.findById(record.getProcedureId()).orElse(null);
        DateFormat timeFormat = new SimpleDateFormat("hh:mm:ss");
        String strTime = "";
        if (procedure != null)
            strTime = timeFormat.format(procedure.getDuration());

        for(int i = 0; i < Integer.valueOf(strTime.substring(0, 2)); i++){
            schedule.get(i).setStatus(false);
            scheduleR.save(schedule.get(i));
        }
        recordR.save(record);
        return record;
    }

    public Record cancelRecord(Integer id){
        Record record = recordR.findById(id).orElse(null);
        if (record != null) {
            record.setStatus("cancelled");
        }
        List<Schedule> schedule = scheduleR.findByEmployeeIdAndStatusAndDateAndTimeGreaterThanEqualOrderByTime(record.getEmployeeId(), false, record.getDate(), record.getTime());
        Procedure procedure = procedureR.findById(record.getProcedureId()).orElse(null);
        DateFormat dateFormat = new SimpleDateFormat("hh:mm:ss");
        String strDate = "";
        if (procedure != null)
            strDate = dateFormat.format(procedure.getDuration());

        for(int i = 0; i < Integer.valueOf(strDate.substring(0, 2)); i++){
            schedule.get(i).setStatus(true);
            scheduleR.save(schedule.get(i));
        }

        recordR.save(record);
        return record;
    }

    public List<String> getCountUser(){
        return recordR.findDistinctByUsersId();
    }

    public List<RecordStatistic> getCountProcedure(){
        return recordR.findProcedureCount();
    }

}

