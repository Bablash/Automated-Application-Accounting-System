package App.Service;

import App.Custom.RecordStatistic;
import App.Model.Record;
import App.Repository.RecordRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

import static App.Model.Record.SORT_BY_CREATED_AT_DESC;

@Service
public class RecordService {
    private final RecordRepository recordR;

    public RecordService(RecordRepository recordR) {
        this.recordR = recordR;
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

    public List<Record> getRecordsByUserId(Integer id){
        return recordR.findByUsersId(id);
    }

    public List<Record> getRecordsByEmployeeId(Integer id){
        return recordR.findByEmployeeId(id);
    }
    public List<String> getCountUser(){
        return recordR.findDistinctByUsersId();
    }

    public List<RecordStatistic> getCountProcedure(){
        return recordR.findProcedureCount();
    }

}

