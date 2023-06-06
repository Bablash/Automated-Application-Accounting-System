package App.Service;

import App.Model.Procedure;
import App.Model.Schedule;
import App.Repository.ProcedureRepository;
import App.Repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import static App.Model.Record.SORT_BY_CREATED_AT_DESC;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleR;
    private final ProcedureRepository procedureR;

    public ScheduleService(ScheduleRepository scheduleR, ProcedureRepository procedureR) {
        this.scheduleR = scheduleR;
        this.procedureR = procedureR;
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

    public List<Schedule> getScheduleByEmployeeIdAndStatus(Integer id, Boolean status, Integer procedure_id) {
        List<Schedule> schedules = scheduleR.findByEmployeeIdAndStatus(id, status);
        Procedure procedure = procedureR.findById(procedure_id).orElse(null);
        SimpleDateFormat tformat = new SimpleDateFormat("HH");
        Integer time = Integer.parseInt(tformat.format(procedure.getDuration()));

            for (int j = 0; j < schedules.size(); j++) {
                for(int i = 0; i < time; i ++){

                    if(Integer.parseInt(tformat.format(schedules.get(j).getTime())) + i >= 18) {
                        for(int k = 0; k < time; k++){
                            if (Integer.parseInt(tformat.format(schedules.get(j).getTime())) == 17){
                                schedules.remove(j);
                                break;
                            }
                            else if(j + k >= schedules.size())
                                break;
                            schedules.remove(j);
                        }
                        j--;
                    }
                    else if(Integer.parseInt(tformat.format(schedules.get(j).getTime())) + i !=
                            Integer.parseInt(tformat.format(schedules.get(j + i).getTime()))){
                        schedules.remove(j);
                        j--;
                    }
                }
            }
        return schedules;
    }

    public List<Schedule> getScheduleByEmployeeIdAndStatusAndDate(Integer employeeId, Boolean status, Date date, Time time){
        return scheduleR.findByEmployeeIdAndStatusAndDateAndTimeGreaterThanEqualOrderByTime(employeeId, status, date, time);
    }

}

