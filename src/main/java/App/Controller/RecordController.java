package App.Controller;

import App.Custom.CustomRecord;
import App.Custom.RecordStatistic;
import App.Model.Procedure;
import App.Model.Record;
import App.Model.Schedule;
import App.Model.Users;
import App.Service.ProcedureService;
import App.Service.RecordService;
import App.Service.ScheduleService;
import App.Service.UsersService;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/records")
public class RecordController {
    private final RecordService recordService;
    private final UsersService userService;
    private final ProcedureService procedureService;

    private final ScheduleService scheduleService;

    public RecordController(RecordService recordService, UsersService userService, ProcedureService procedureService, ScheduleService scheduleService) {
        this.recordService = recordService;
        this.userService = userService;
        this.procedureService = procedureService;
        this.scheduleService = scheduleService;
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
        List<CustomRecord> tmp = new ArrayList<>();
        List<Record> records = recordService.getRecordsByUserId(id);

        for(int i = 0; i < records.size(); i++){
            Users employee = userService.findUser(records.get(i).getEmployeeId());
            Users user = userService.findUser(records.get(i).getUsersId());
            Procedure procedure = procedureService.findProcedure(records.get(i).getProcedureId());
            tmp.add(new CustomRecord(records.get(i).getId(), records.get(i).getDate(), records.get(i).getTime(),
                    records.get(i).getStatus(),procedure.getName(),employee.getFcs(), user.getFcs()));
        }
        return tmp;
    }

    @GetMapping("/employee/{id}")
    public List<CustomRecord> getRecordByEmployeeId(@PathVariable Integer id) {
        List<CustomRecord> tmp = new ArrayList<>();
        List<Record> records = recordService.getRecordsByEmployeeId(id);

        for(int i = 0; i < records.size(); i++){
            Users employee = userService.findUser(records.get(i).getEmployeeId());
            Users user = userService.findUser(records.get(i).getUsersId());
            Procedure procedure = procedureService.findProcedure(records.get(i).getProcedureId());
            tmp.add(new CustomRecord(records.get(i).getId(), records.get(i).getDate(), records.get(i).getTime(),records.get(i).getStatus(),procedure.getName(),employee.getFcs(), user.getFcs()));
        }
        return tmp;
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
        System.out.println("post");
        List<Schedule> schedule = scheduleService.getScheduleByEmployeeIdAndStatusAndDate(record.getEmployeeId(), true, record.getDate());
        Procedure procedure = procedureService.findProcedure(record.getProcedureId());
        DateFormat dateFormat = new SimpleDateFormat("hh:mm:ss");
        String strDate = dateFormat.format(procedure.getDuration());
        System.out.println("for");
        for(int i = 0; i < Integer.valueOf(strDate.substring(0, 2)); i++){
            schedule.get(i).setStatus(false);
            scheduleService.updateSchedule(schedule.get(i));
        }
        System.out.println("return");
        return recordService.saveRecord(record);
    }


    @PostMapping
    public Record setRecord(@RequestBody Record record) {
        List<Schedule> schedule = scheduleService.getScheduleByEmployeeIdAndStatusAndDate(record.getEmployeeId(), true, record.getDate());
        Procedure procedure = procedureService.findProcedure(record.getProcedureId());
        DateFormat dateFormat = new SimpleDateFormat("hh:mm:ss");
        String strDate = dateFormat.format(procedure.getDuration());
        System.out.println("for");
        for(int i = 0; i < Integer.valueOf(strDate.substring(0, 2)); i++){
            schedule.get(i).setStatus(false);
            scheduleService.updateSchedule(schedule.get(i));
        }
        System.out.println("return");
        return recordService.saveRecord(record);
    }

    @PutMapping
    public Record updateRecord(@RequestBody Record record){
        return recordService.updateRecord(record);
    }

    @PutMapping("/user/{id}")
    public Record updateRecord(@PathVariable Integer id){
        Record record = recordService.findRecord(id);
        record.setStatus("cancelled");
        return recordService.updateRecord(record);
    }

    @DeleteMapping("/{id}")
    public Record deleteRecord(@PathVariable Integer id){
        return recordService.deleteRecord(id);
    }

}

