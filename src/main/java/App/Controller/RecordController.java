package App.Controller;

import App.Custom.CustomRecord;
import App.Custom.RecordStatistic;
import App.Model.Record;
import App.Service.RecordService;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/records")
public class RecordController {
    private final RecordService recordService;
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping
    public List<Record> getRecords() {
        return recordService.findAllRecords();
    }
    @GetMapping("/{id}")
    public Record getRecord(@PathVariable Integer id) {
        return recordService.findRecord(id);
    }

    @GetMapping("/user/{id}")
    public List<CustomRecord> getRecordByUserId(@PathVariable Integer id) {
        return recordService.getRecordsByUserId(id);
    }

    @GetMapping("/employee/{id}")
    public List<CustomRecord> getRecordByEmployeeId(@PathVariable Integer id) {
        return recordService.getRecordsByEmployeeId(id);
    }

    @GetMapping("/date/{date1}/{date2}")
    public List<Record> getRecordsByDate(@PathVariable Date date1, @PathVariable Date date2) {
        return recordService.findRecordsByDate(date1, date2);
    }

    @GetMapping("/count")
    public List<String> getCountUser() {
        return recordService.getCountUser();
    }

    @GetMapping("/top")
    public List<RecordStatistic> getCountProcedure() {
        return recordService.getCountProcedure();
    }

    @PostMapping("/user/record")
    public Record setUserRecord(@RequestBody Record record) {
        return recordService.setRecord(record);
    }

    @PostMapping
    public Record setRecord(@RequestBody Record record) {
        return recordService.setRecord(record);
    }

    @PutMapping
    public Record updateRecord(@RequestBody Record record){
        if(record.getStatus().equals("cancelled"))
            return recordService.cancelRecord(record.getId());
        else return recordService.updateRecord(record);
    }

    @PutMapping("/user/{id}")
    public Record updateRecord(@PathVariable Integer id){
        return recordService.cancelRecord(id);
    }

    @DeleteMapping("/{id}")
    public Record deleteRecord(@PathVariable Integer id){
        return recordService.deleteRecord(id);
    }

}

