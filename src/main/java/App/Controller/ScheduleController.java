package App.Controller;

import App.Model.Schedule;
import App.Service.ScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<Schedule> getSchedules() {
        return scheduleService.findAllSchedules();
    }
    @GetMapping("/{id}")
    public Schedule getSchedule(@PathVariable Integer id) {
        return scheduleService.findSchedule(id);
    }

    @GetMapping("/user/byId/{id}")
    public Schedule getScheduleById(@PathVariable Integer id) {
        return scheduleService.findSchedule(id);
    }

    @GetMapping("/employee/{id}")
    public List<Schedule> getScheduleByEmployeeId(@PathVariable Integer id) {
        return scheduleService.getScheduleByEmployeeId(id);
    }

    @GetMapping("/user/byEmployee/{id}/{status}")
    public List<Schedule> getScheduleByEmployeeIdForUser(@PathVariable Integer id, @PathVariable Boolean status) {
        return scheduleService.getScheduleByEmployeeIdAndStatus(id, status);
    }

    @GetMapping("/admin/byEmployee/{id}/{status}")
    public List<Schedule> getScheduleByEmployeeIdForAdmin(@PathVariable Integer id, @PathVariable Boolean status) {
        return scheduleService.getScheduleByEmployeeIdAndStatus(id, status);
    }

    @PostMapping
    public Schedule setSchedule(@RequestBody Schedule schedule) {
        return scheduleService.saveSchedule(schedule);
    }

    @PutMapping
    public Schedule updateSchedule(@RequestBody Schedule schedule){
        return scheduleService.updateSchedule(schedule);
    }

    @DeleteMapping("/{id}")
    public Schedule deleteSchedule(@PathVariable Integer id){
        return scheduleService.deleteSchedule(id);
    }

}


