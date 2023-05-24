package App.Service;

import App.Model.Record;
import App.Model.Schedule;
import App.Repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

import static App.Model.Record.SORT_BY_CREATED_AT_DESC;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleR;

    public ScheduleService(ScheduleRepository scheduleR) {
        this.scheduleR = scheduleR;
    }

    public Schedule findSchedule(Integer id){
        return scheduleR.findById(id).orElse(null);
    }

    public Schedule saveSchedule(Schedule schedule) {
        scheduleR.save(schedule);
        return schedule;
    }

    public Schedule deleteSchedule(Integer id)  {
        Schedule schedule = scheduleR.findById(id).orElse(null);
        scheduleR.deleteById(id);
        return schedule;
    }

    public Schedule updateSchedule(Schedule schedule) {
        scheduleR.save(schedule);
        return schedule;
    }

    public List<Schedule> findAllSchedules() {
        return scheduleR.findAll(SORT_BY_CREATED_AT_DESC);
    }

    public List<Schedule> getScheduleByEmployeeId(Integer id){
        return scheduleR.findByEmployeeId(id);
    }

    public List<Schedule> getScheduleByEmployeeIdAndStatus(Integer id, Boolean status){
        return scheduleR.findByEmployeeIdAndStatus(id, status);
    }

    public List<Schedule> getScheduleByEmployeeIdAndStatusAndDate(Integer employeeId, Boolean status, Date date){
        return scheduleR.findByEmployeeIdAndStatusAndDateOrderByTime(employeeId, status, date);
    }

}

