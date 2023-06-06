package App.Service;

import App.Model.Record;
import App.Model.Schedule;
import App.Model.Users;
import App.Model.enums.Role;
import App.Repository.RecordRepository;
import App.Repository.ScheduleRepository;
import App.Repository.UsersRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Configuration
@EnableScheduling
@ConditionalOnProperty(name = "scheduler.enabled", matchIfMissing = true)
public class ScheduledTasks {
    private final RecordRepository recordR;
    private final ScheduleRepository scheduleR;
    private final UsersRepository userR;

    public ScheduledTasks(RecordRepository recordR, ScheduleRepository scheduleR, UsersRepository userR) {
        this.recordR = recordR;
        this.scheduleR = scheduleR;
        this.userR = userR;
    }

    @Scheduled(fixedRateString = "PT01H")
    public void refreshStatusRecord() throws ParseException {
        SimpleDateFormat dformat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat tformat = new SimpleDateFormat("HH:mm:ss");
        String date = dformat.format(new Date());
        String time = tformat.format(new Date());
        List<Record> records = recordR.findByStatusAndDateAndTimeLessThan("future",dformat.parse(date), tformat.parse(time));
        for (Record record : records){
            record.setStatus("past");
            recordR.save(record);
        }

    }

    @Scheduled(cron = "${interval-in-cron}")
    public void refreshSchedule() throws ParseException {
        SimpleDateFormat dformat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat tformat = new SimpleDateFormat("HH:mm:ss");
        String date = dformat.format(new Date());
        long date_10 = new Date().getTime()+864000000;
        String date10 = dformat.format(date_10);


        List<Schedule> schedules = scheduleR.findByDateLessThan(dformat.parse(date));
        for (Schedule schedule: schedules){
            scheduleR.delete(schedule);
        }

        List<Users> employees = userR.findByRoles(Role.ROLE_EMPLOYEE);
        for (Users employee: employees){
            for(int i = 0; i < 9; i++){
                long time_1 = new Date().getTime() + i*3600000;
                Schedule schedule = new Schedule();
                schedule.setDate(java.sql.Date.valueOf(date10));
                schedule.setTime(Time.valueOf(tformat.format(time_1)));
                schedule.setEmployeeId(employee.getId());
                schedule.setStatus(true);
                scheduleR.save(schedule);
            }
        }
    }
}
